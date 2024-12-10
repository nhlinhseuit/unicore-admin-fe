import { mockTeacherList } from "@/mocks";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import BorderContainer from "../../BorderContainer";
import IconButton from "../../Button/IconButton";
import MyDropdown from "../../MyDropdown";
import ErrorComponent from "../../Status/ErrorComponent";

type Group = {
  STT: string;
  studentIds: string[];
  names: string[];
  "Tên đề tài Tiếng Việt": string;
  "Tên đề tài Tiếng Anh": string;
};

type Council = {
  STT: string;
  "Tên hội đồng": string;
  "Thư ký": string; // Thêm trường thư ký vào Council
  data: Group[];
};

export default function ImportThesisReport() {
  let council = 0;

  const [selectedSecretaries, setSelectedSecretaries] = useState<string[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([
    "Bạn cần phải import danh sách môn học trước khi import danh sách lớp",
  ]);
  const [councilsData, setCountcilsData] = useState<Council[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // XỬ LÝ UPLOAD FILE LỚP HỌC
  const handleCoursesFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
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

      let errorMessages: string[] = [];
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
            "Thư ký": "", // Thư ký mặc định rỗng
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

      // Nếu có lỗi, hiển thị lỗi
      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        //! POST API LƯU DỮ LIỆU LÊN BACKEND
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
  const handleSecretaryChange = (value: number, councilIndex: number) => {
    const updatedSecretaries = [...selectedSecretaries];
    updatedSecretaries[councilIndex] = mockTeacherList[value - 1]?.value || "";
    setSelectedSecretaries(updatedSecretaries);

    const updatedCouncils = [...councilsData];
    updatedCouncils[councilIndex]["Thư ký"] = updatedSecretaries[councilIndex];
    setCountcilsData(updatedCouncils);
  };

  return (
    <div>
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
                text="Import danh sách hội đồng phản biện"
                onClick={handleButtonClick}
                iconLeft="/assets/icons/upload-white.svg"
                iconWidth={16}
                iconHeight={16}
              />
            </div>

            <p className="text-sm italic">{uploadedFileName}</p>
          </div>

          <a
            href="/assets/KLTN - template Hội đồng KLTN.xlsx"
            download
            className="text-blue-500 underline text-base italic"
          >
            Tải xuống template file import hội đồng chấm Khoá luận tốt nghiệp
          </a>
        </div>
      </div>

      {councilsData.length > 0 ? (
        <div className="mt-12 flex flex-col gap-4">
          <p className="paragraph-semibold">Chọn thư ký cho hội đồng</p>

          {councilsData.map((item, index) => (
            <div key={item.STT} className="flex gap-4 items-center">
              <BorderContainer key={item.STT} otherClasses="p-3">
                <p>{item["Tên hội đồng"]}</p>
              </BorderContainer>

              <MyDropdown
                text={`${
                  selectedSecretaries[index] || "Chọn thư ký"
                }`}
                dataOptions={mockTeacherList}
                onClick={(value: number) => handleSecretaryChange(value, index)}
                selectedItem={selectedSecretaries[index]}
              />
            </div>
          ))}

          <div>
            <IconButton text="Lưu" onClick={() => {}} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
