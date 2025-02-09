import { mockOfficerList } from "@/mocks";
import { parseToArray } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import BorderContainer from "../../BorderContainer";
import IconButton from "../../Button/IconButton";
import MyDropdown from "../../MyDropdown";
import ErrorComponent from "../../Status/ErrorComponent";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import LoadingComponent from "../../LoadingComponent";

type Group = {
  STT: string;
  studentIds: string[];
  names: string[];
  "Tên đề tài Tiếng Việt": string;
  "Tên đề tài Tiếng Anh": string;
  "Cán bộ hướng dẫn": string[];
  "Cán bộ phản biện": string;
  "Hội đồng chấm khóa luận": string[];
};

type Council = {
  STT: string;
  "Tên hội đồng": string;
  "Ghi chú": string;
  "Giáo vụ": string; // Thêm trường giáo vụ vào Council
  data: Group[];
};


interface Props {
  onBack?: () => void;
}

export default function ImportThesisReport(params: Props) {
  let council = 0;

  const [selectedOfficers, setSelectedOfficers] = useState<string[]>(
    mockOfficerList.length === 1 ? [mockOfficerList[0].value] : []
  );
  const [uploadedFileName, setUploadedFileName] = useState<{
    name: string;
    file: File | null;
  }>({ name: "", file: null });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [councilsData, setCountcilsData] = useState<Council[]>([]);

  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();

  useEffect(() => {
    if (councilsData.length > 0) {
      // Khởi tạo selectedOfficers với số phần tử bằng councilsData.length
      const updatedOfficers = new Array(councilsData.length).fill(
        mockOfficerList.length === 1 ? mockOfficerList[0].value : ""
      );
      setSelectedOfficers(updatedOfficers);
    }
  }, [councilsData]);

  const [isLoading, setIsLoading] = useState(false);

  // XỬ LÝ UPLOAD FILE LỚP HỌC
  const handleCoursesFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName({
        name: file.name,
        file: file,
      });
    }

    setCountcilsData([]);
    setIsLoading(true);
    setErrorMessages([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Bỏ qua 7 hàng đầu tiên của file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 7, // Chỉ số 7 đại diện cho hàng 8 (vì index bắt đầu từ 0)
        defval: "",
      });

      let errorMessagesCheck: string[] = [];
      let councils: Council[] = []; // Danh sách các hội đồng
      let currentCouncil: Council | null = null; // Hội đồng hiện tại
      let currentGroup: Group | null = null; // Nhóm sinh viên hiện tại

      parsedData.forEach((item: any) => {
        const isCouncilRow =
          item.STT && Object.values(item).filter((val) => val).length === 1;

        if (isCouncilRow) {
          // Gặp một hội đồng mới
          if (currentCouncil) {
            // Thêm nhóm cuối cùng vào hội đồng nếu còn nhóm
            if (currentGroup && currentGroup.studentIds.length > 0) {
              currentCouncil.data.push(currentGroup);
              currentGroup = null; // Reset nhóm hiện tại
            }
            councils.push(currentCouncil); // Thêm hội đồng hiện tại vào danh sách
          }
          // Tạo hội đồng mới
          currentCouncil = {
            STT: (++council).toString(),
            "Tên hội đồng": `${item.STT}`,
            "Ghi chú": `${item["GHI CHÚ"]}`,
            "Giáo vụ": "", // Thư ký mặc định rỗng
            data: [],
          };
        } else if (
          item["TÊN ĐỀ TÀI TIẾNG VIỆT"] ||
          item["TÊN ĐỀ TÀI TIẾNG ANH"]
        ) {
          // Sinh viên có đầy đủ thông tin, tạo nhóm mới
          if (currentGroup && currentGroup.studentIds.length > 0) {
            currentCouncil?.data.push(currentGroup); // Thêm nhóm hiện tại vào hội đồng
          }
          currentGroup = {
            STT: item.STT || "",
            studentIds: [item["MSSV"] || ""],
            names: [item["HỌ TÊN"] || ""],
            "Tên đề tài Tiếng Việt": item["TÊN ĐỀ TÀI TIẾNG VIỆT"] || "",
            "Tên đề tài Tiếng Anh": item["TÊN ĐỀ TÀI TIẾNG ANH"] || "",
            "Cán bộ hướng dẫn": parseToArray(item["CÁN BỘ HƯỚNG DẪN"]),
            "Cán bộ phản biện": `${item["CÁN BỘ PHẢN BIỆN"]}`,
            "Hội đồng chấm khóa luận": parseToArray(
              item["HỘI ĐỒNG CHẤM KHOÁ LUẬN\r\n(Ghi rõ chức vụ trong HĐ)"]
            ),
          };
        } else if (currentGroup) {
          // Thêm sinh viên vào nhóm hiện tại (nếu topic rỗng)
          const studentName = item["HỌ TÊN"] || "";
          const studentId = item["MSSV"] || "";
          if (studentName || studentId) {
            currentGroup.studentIds.push(studentId);
            currentGroup.names.push(studentName);
          }
        }
      });

      // Xử lý nhóm và hội đồng cuối cùng nếu còn tồn đọng
      //@ts-ignore
      if (currentGroup && currentGroup.studentIds.length > 0) {
        //@ts-ignore
        currentCouncil?.data.push(currentGroup);
      }
      if (currentCouncil) {
        councils.push(currentCouncil);
      }

      if (councils.length === 0) {
        errorMessagesCheck.push(
          "Import lỗi. Vui lòng chọn đúng file import danh sách hội đồng chấm Khóa luận tốt nghiệp!"
        );
      }

      // Nếu có lỗi, hiển thị lỗi
      if (errorMessagesCheck.length > 0) {
        setErrorMessages(errorMessagesCheck);
      } else {
        //! POST API LƯU DỮ LIỆU LÊN BACKEND

        console.log("councils KLTN", councils);

        setCountcilsData(councils);
      }

      setIsLoading(false);
    };
  };

  // Tạo một reference để liên kết với thẻ input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Cập nhật thông tin thư ký khi chọn từ dropdown
  const handleOfficerChange = (value: number, councilIndex: number) => {
    const updatedSecretaries = [...selectedOfficers];
    updatedSecretaries[councilIndex] = mockOfficerList[value - 1]?.value || "";
    setSelectedOfficers(updatedSecretaries);

    const updatedCouncils = [...councilsData];
    updatedCouncils[councilIndex]["Giáo vụ"] = updatedSecretaries[councilIndex];
    setCountcilsData(updatedCouncils);
  };


  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      params.onBack && params.onBack()

    }, 2000); // 2 giây
  };

  return (
    <div>
      {isLoading ? <LoadingComponent /> : null}
      {errorMessages.length > 0 && (
        <div className="mb-6">
          {errorMessages.map((item, index) => (
            <ErrorComponent
              key={`${item}_${index}`}
              text={item}
              onClickClose={() => {
                setErrorMessages((prevErrors) =>
                  prevErrors.filter((_, i) => i !== index)
                );
              }}
            />
          ))}
        </div>
      )}

      {/* DESCRIPTION */}
      <div className="flex justify-between">
        <div>
          <div className="flex mb-2 gap-4 items-center">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleCoursesFileUpload}
                style={{ display: "none" }}
              />

              <IconButton
                text="Import danh sách hội đồng chấm Khóa luận tốt nghiệp"
                onClick={handleButtonClick}
                iconLeft="/assets/icons/upload-white.svg"
                iconWidth={16}
                iconHeight={16}
              />
            </div>

            {uploadedFileName.file && (
              <a
                href={URL.createObjectURL(uploadedFileName.file)}
                download={uploadedFileName.name}
                className="text-blue-500 underline text-base italic"
              >
                <p className="text-sm italic">{uploadedFileName.name}</p>
              </a>
            )}
          </div>

          <a
            href="/assets/template_hoi_dong_cham_KLTN.xlsx"
            download
            className="text-blue-500 underline text-base italic"
          >
            Tải xuống template file import hội đồng chấm Khoá luận tốt nghiệp
          </a>
        </div>
      </div>

      {councilsData.length > 0 ? (
        <div className="mt-12 flex flex-col gap-4">
          <p className="paragraph-semibold">Chọn thời gian nhập điểm</p>
          <div className="flex gap-4 items-center">
            <div className="w-1/4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full flex items-center text-center font-normal ${
                      !dateStart && "text-muted-foreground"
                    } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                  >
                    <span
                      className={`flex-grow text-center ${
                        !dateStart && "text-muted-foreground"
                      }`}
                    >
                      {dateStart
                        ? format(dateStart, "dd/MM/yyyy")
                        : "Ngày bắt đầu"}
                    </span>
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateStart}
                    onSelect={setDateStart}
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <span> - </span>
            <div className="w-1/4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full flex items-center text-center font-normal ${
                      !dateEnd && "text-muted-foreground"
                    } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                  >
                    <span
                      className={`flex-grow text-center ${
                        !dateEnd && "text-muted-foreground"
                      }`}
                    >
                      {dateEnd
                        ? format(dateEnd, "dd/MM/yyyy")
                        : "Ngày kết thúc"}
                    </span>
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateEnd}
                    onSelect={setDateEnd}
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <p className="mt-10 paragraph-semibold">Chọn giáo vụ nhập điểm</p>

          {councilsData.map((item, index) => (
            <div key={item.STT} className="flex gap-4 items-center">
              <BorderContainer key={item.STT} otherClasses="p-3">
                <p>{item["Tên hội đồng"]}</p>
              </BorderContainer>

              <MyDropdown
                text={`${selectedOfficers[index] || "Chọn giáo vụ"}`}
                dataOptions={mockOfficerList}
                onClick={(value: number) => handleOfficerChange(value, index)}
                selectedItem={selectedOfficers[index]}
              />
            </div>
          ))}

          <div>
            <IconButton
              text="Lưu"
              onClick={() => {
                handleLoading();
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
