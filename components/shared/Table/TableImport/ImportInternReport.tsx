import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import IconButton from "../../Button/IconButton";
import ErrorComponent from "../../Status/ErrorComponent";
import BorderContainer from "../../BorderContainer";
import MyDropdown from "../../MyDropdown";
import { mockOfficerList } from "@/mocks";

type Student = {
  STT: string;
  "Mã số SV": string;
  "Họ và tên sinh viên": string;
  "Giảng viên hướng dẫn": string;
  "Thông tin liên lạc": string;
  "Nơi thực tập (tên DN)": string;
  "Nội dung thực tập": string;
  "Vị trí thực tập": string;
  "Ngày bắt đầu": string;
  "Ngày kết thúc": string;
  "Điểm đánh giá của DN": string;
  "Ghi chú": string;
  "Báo cáo": string;
};

type Council = {
  STT: string;
  "Tên hội đồng": string;
  "Giáo vụ": string; // Thêm trường giáo vụ vào Council
  "Hội đồng chấm": string; // Danh sách thành viên hội đồng
  data: Student[];
};

export default function ImportInternReport() {
  const [selectedOfficers, setSelectedOfficers] = useState<string[]>(
    mockOfficerList.length === 1 ? [mockOfficerList[0].value] : []
  );

  // Cập nhật thông tin giáo vụ khi chọn từ dropdown
  const handleOfficerChange = (value: number, councilIndex: number) => {
    const updatedSecretaries = [...selectedOfficers];
    updatedSecretaries[councilIndex] = mockOfficerList[value - 1]?.value || "";
    setSelectedOfficers(updatedSecretaries);

    const updatedCouncils = [...councilsData];
    updatedCouncils[councilIndex]["Giáo vụ"] = updatedSecretaries[councilIndex];
    setCountcilsData(updatedCouncils);
  };

  const [uploadedFileName, setUploadedFileName] = useState<{
    name: string;
    file: File | null;
  }>({ name: "", file: null });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [councilsData, setCountcilsData] = useState<Council[]>([]);

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
    setErrorMessages([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Bỏ qua 8 hàng đầu tiên của file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 8, // Chỉ số 8 đại diện cho hàng 9 (vì index bắt đầu từ 0)
        defval: "",
      });

      let councils: Council[] = []; // Danh sách các hội đồng
      let currentCouncil: Council | null = null; // Hội đồng hiện tại

      parsedData.forEach((item: any) => {
        const isCouncilRow =
          item.STT && Object.values(item).filter((val) => val).length === 1;

        if (isCouncilRow) {
          // Nếu gặp một hội đồng mới
          if (currentCouncil) {
            councils.push(currentCouncil); // Thêm hội đồng hiện tại vào danh sách
          }
          // Tạo hội đồng mới
          currentCouncil = {
            STT: (councils.length + 1).toString(), // Tự động đánh số hội đồng
            "Tên hội đồng": item.STT,
            "Hội đồng chấm": "", // Sẽ được cập nhật từ sinh viên đầu tiên
            "Giáo vụ": "",
            data: [],
          };
        } else if (currentCouncil) {
          // Xử lý từng sinh viên
          const student: Student = {
            STT: item.STT || "",
            "Mã số SV": item["Mã số SV"] || "",
            "Họ và tên sinh viên": item["Họ và tên sinh viên"] || "",
            "Giảng viên hướng dẫn": item["Giảng viên hướng dẫn"] || "",
            "Thông tin liên lạc": item["Thông tin liên lạc"] || "",
            "Nơi thực tập (tên DN)": item["Nơi thực tập (tên DN)"] || "",
            "Nội dung thực tập": item["Nội dung thực tập"] || "",
            "Vị trí thực tập": item["Vị trí thực tập"] || "",
            "Ngày bắt đầu": item["Ngày bắt đầu"] || "",
            "Ngày kết thúc": item["Ngày kết thúc"] || "",
            "Điểm đánh giá của DN":
              item["Điểm đánh giá của DN"]?.toString() || "",
            "Ghi chú": item["Ghi chú"] || "",
            "Báo cáo": item["Báo cáo"] || "",
          };

          // Cập nhật thông tin "Hội đồng chấm" nếu có
          if (item["Hội đồng chấm"]) {
            currentCouncil["Hội đồng chấm"] = item["Hội đồng chấm"];
          }

          // Thêm sinh viên vào danh sách
          currentCouncil.data.push(student);
        }
      });

      // Thêm hội đồng cuối cùng nếu còn tồn đọng
      if (currentCouncil) {
        councils.push(currentCouncil);
      }

      if (councils.length === 0) {
        errorMessages.push(
          "Import lỗi. Vui lòng chọn đúng file import danh sách hội đồng chấm Khóa luận tốt nghiệp!"
        );
      }

      //! POST API LƯU DỮ LIỆU LÊN BACKEND
      setCountcilsData(councils);
    };
  };

  // Tạo một reference để liên kết với thẻ input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
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
                text="Import danh sách hội đồng chấm Thực tập doanh nghiệp"
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
            href="/assets/template_hoi_dong_cham_TTDN.xlsx"
            download
            className="text-blue-500 underline text-base italic"
          >
            Tải xuống template file import hội đồng chấm Thực tập doanh nghiệp
          </a>
        </div>
      </div>

      {councilsData.length > 0 ? (
        <div className="mt-12 flex flex-col gap-4">
          <p className="paragraph-semibold">Chọn giáo vụ nhập điểm</p>

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
            <IconButton text="Lưu" onClick={() => {}} otherClasses="mt-4" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
