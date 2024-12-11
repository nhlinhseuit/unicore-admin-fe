import { mockTeacherList } from "@/mocks";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import BorderContainer from "../../BorderContainer";
import IconButton from "../../Button/IconButton";
import MyDropdown from "../../MyDropdown";
import ErrorComponent from "../../Status/ErrorComponent";
import { CentralizedExamDataItem } from "@/types";
import NoResult from "../../Status/NoResult";
import { DataTableType } from "@/constants";
import { Fascinate } from "next/font/google";
import DataTable from "../components/DataTable";
import TableSkeleton from "../components/TableSkeleton";

export default function ImportCentralizedExam() {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [dataTable, setDataTable] = useState<CentralizedExamDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // XỬ LÝ UPLOAD FILE LỚP HỌC
  const handleCoursesFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }

    setIsLoading(true);
    setErrorMessages([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Bỏ 6 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 6, // Chỉ số 6 đại diện cho hàng 7 (vì index bắt đầu từ 0)
        defval: "",
      });

      console.log("parsedData", parsedData);

      let errorMessages: string[] = [];

      // Loại bỏ các object không hợp lệ
      const filteredData: any[] = [];
      for (const item of parsedData) {
        console.log("item", item);

        // Kiểm tra nếu STT chứa ghi chú

        //@ts-ignore
        if (typeof item.STT === "string" && item.STT.startsWith("Ghi chú")) {
          console.log("here");
          break; // Dừng việc xử lý ngay khi gặp ghi chú
        }

        // Kiểm tra nếu tất cả các trường khác ngoài STT đều rỗng

        //@ts-ignore
        const { STT, ...rest } = item;
        const hasMeaningfulFields = Object.values(rest).some(
          (value) => value !== ""
        );

        if (hasMeaningfulFields) {
          filteredData.push(item); // Thêm vào danh sách nếu hợp lệ
        }
      }

      const transformedData = filteredData.map((item: any, index: number) => {
        // Kiểm tra các trường quan trọng (required fields)
        const requiredFields = {
          "Mã môn học": item["Mã MH"],
          "Mã lớp": item["Mã lớp"],
          "Tên môn học": item["Tên MH"],
          "Tên GV": item["Giảng Viên LT"],
          "Ngày thi": item["Ngày thi"],
          Thứ: item["Thứ"],
          "Ca Thi": item["Ca Thi"],
          "Phòng Thi": item["Phòng Thi"],
          "Hệ ĐT": item["Hệ ĐT"],
          "Đợt thi": item["Đợt thi"],
          "Lần thi": item["Lần thi"],
          "Học kỳ": item["Học kỳ"],
          "Năm học": item["Năm học"],
        };

        // Lặp qua các trường để kiểm tra nếu có giá trị undefined
        if (index === 0) {
          Object.entries(requiredFields).forEach(([fieldName, value]) => {
            if (value === undefined) {
              errorMessages.push(`Trường "${fieldName}" bị thiếu hoặc lỗi.`);
            }
          });
        }

        return {
          type: "course",
          STT: item.STT,
          isDeleted: false,
          data: {
            "Mã môn học": item["Mã MH"],
            "Mã lớp": item["Mã lớp"],
            "Tên môn học": item["Tên MH"],
            "Tên GV": item["Giảng Viên LT"],
            "Ngày thi": item["Ngày thi"],
            Thứ: item["Thứ"],
            "Ca Thi": item["Ca Thi"],
            "Phòng Thi": item["Phòng Thi"],
            "Hệ ĐT": item["Hệ ĐT"],
            "Đợt thi": item["Đợt thi"],
            "Lần thi": item["Lần thi"],
            "Học kỳ": item["Học kỳ"],
            "Năm học": item["Năm học"],
          },
        };
      });

      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        console.log("transformedData", transformedData);

        setDataTable(transformedData as []);
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
                text="Import lịch thi"
                onClick={handleButtonClick}
                iconLeft="/assets/icons/upload-white.svg"
                iconWidth={16}
                iconHeight={16}
              />
            </div>

            <p className="text-sm italic">{uploadedFileName}</p>
          </div>

          <a
            href="/assets/KLTN - Template lịch thi vấn đáp, đồ án.xlsx"
            download
            className="text-blue-500 underline text-base italic"
          >
            Tải xuống template file import danh sách lịch thi
          </a>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : dataTable.length > 0 ? (
        <>
          <DataTable
            type={DataTableType.Exam}
            dataTable={dataTable}
            isEditTable={false}
            isMultipleDelete={false}
            onClickEditTable={() => {
              // setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              // setIsEditTable(false);
              // // set lại data import hoặc patch API
              // localDataTable = localDataTable as CourseDataItem[];
              // setDataTable(localDataTable);
            }}
            onClickMultipleDelete={() => {
              // setIsMultipleDelete(true);
            }}
            onClickDeleteAll={() => {
              // setDataTable((prevData) => {
              //   return prevData.map((item) => ({
              //     ...item,
              //     isDeleted: true,
              //   }));
              // });
              // toast({
              //   title: "Xóa thành công",
              //   description: `Đã xóa tất cả lớp học`,
              //   variant: "success",
              //   duration: 3000,
              // });
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // // ? DELETE THEO MÃ LỚP
              // setDataTable((prevData) => {
              //   return prevData.map((item) => {
              //     if (itemsSelected.includes(item.data["Mã lớp"])) {
              //       return {
              //         ...item,
              //         isDeleted: true,
              //       };
              //     }
              //     return item;
              //   });
              // });
              // toast({
              //   title: "Xóa thành công",
              //   description: `${`Các lớp ${itemsSelected.join(
              //     ", "
              //   )} đã được xóa.`}`,
              //   variant: "success",
              //   duration: 3000,
              // });
            }}
            onClickGetOut={() => {
              // setIsMultipleDelete(false);
            }}
          />
        </>
      ) : (
        <NoResult
          title="Không có dữ liệu!"
          description="🚀 Import file danh sách để thấy được dữ liệu."
          linkTitle="Import danh sách lớp"
          handleFileUpload={handleCoursesFileUpload}
        />
      )}
    </div>
  );
}
