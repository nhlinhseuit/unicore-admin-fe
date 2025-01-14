import { mockOfficerList } from "@/mocks";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import IconButton from "../../Button/IconButton";
import ErrorComponent from "../../Status/ErrorComponent";

interface Group {
  STT: string;
  studentIds: string[];
  names: string[];
  "Tên đề tài Tiếng Việt": string;
  "Tên đề tài Tiếng Anh": string;
  "Cán bộ hướng dẫn": string;
  "Cán bộ phản biện": string;
}

export default function ImportReviewerListThesis() {
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>(
    mockOfficerList.length === 1 ? [mockOfficerList[0].value] : []
  );
  const [uploadedFileName, setUploadedFileName] = useState<{
    name: string;
    file: File | null;
  }>({ name: "", file: null });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCoursesFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName({
        name: file.name,
        file: file,
      });
    }

    setGroupsData([]);
    setIsLoading(true);
    setErrorMessages([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
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
      let groups: Group[] = [];
      let currentGroup: Group | null = null;

      parsedData.forEach((item: any) => {
        if (item["TÊN ĐỀ TÀI TIẾNG VIỆT"] || item["TÊN ĐỀ TÀI TIẾNG ANH"]) {
          // Sinh viên có đầy đủ thông tin, tạo nhóm mới
          if (currentGroup && currentGroup.studentIds.length > 0) {
            groups.push(currentGroup); // Thêm nhóm hiện tại vào danh sách
          }
          currentGroup = {
            STT: item.STT || "",
            studentIds: [item["MSSV"] || ""],
            names: [item["HỌ TÊN"] || ""],
            "Tên đề tài Tiếng Việt": item["TÊN ĐỀ TÀI TIẾNG VIỆT"] || "",
            "Tên đề tài Tiếng Anh": item["TÊN ĐỀ TÀI TIẾNG ANH"] || "",
            "Cán bộ hướng dẫn": `${item["CÁN BỘ HƯỚNG DẪN"]}`,
            "Cán bộ phản biện": `${item["CÁN BỘ PHẢN BIỆN"]}`,
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

      // Xử lý nhóm cuối cùng nếu còn tồn đọng
      //@ts-ignore
      if (currentGroup && currentGroup.studentIds.length > 0) {
        groups.push(currentGroup);
      }

      if (groups.length === 0) {
        errorMessages.push(
          "Import lỗi. Vui lòng chọn đúng file import danh sách giảng viên phản biện!"
        );
      }

      // Nếu có lỗi, hiển thị lỗi
      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        //! POST API LƯU DỮ LIỆU LÊN BACKEND

        console.log("groups", groups);

        setGroupsData(groups);
      }

      setIsLoading(false);
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
                text="Import danh sách giảng viên phản biện"
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
            href="/assets/template_nhom_sinh_vien.xlsx"
            download
            className="text-blue-500 underline text-base italic"
          >
            Tải xuống template file import nhóm sinh viên
          </a>
        </div>
      </div>
    </div>
  );
}
