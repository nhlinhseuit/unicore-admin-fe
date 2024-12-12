import { DataTableType } from "@/constants";
import { CentralizedExamDataItem, QAandProjectExamDataItem } from "@/types";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import IconButton from "../../Button/IconButton";
import ErrorComponent from "../../Status/ErrorComponent";
import DataTable from "../components/DataTable";
import TableSkeleton from "../components/TableSkeleton";

interface Props {
  typeExam: string;
}

export default function ImportCentralizedExam(params: Props) {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [dataTableCentralized, setDataTableCentralized] = useState<
    CentralizedExamDataItem[]
  >([]);
  const [dataTableQAandProject, setDataTableQAandProject] = useState<
    QAandProjectExamDataItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCentralizedExamRequiredField = (item: any) => {
    return {
      "Mã môn học": item["Mã MH"],
      "Mã lớp": item["Mã lớp"],
      "Khóa học": item["Khóa học"],
      "Tên môn học": item["Tên MH"],
      "Tên GV": item["Giảng Viên LT"],
      "Ngày thi": item["Ngày thi"],
      Thứ: item["Thứ"],
      "Ca Thi": item["Ca Thi"],
      "Phòng Thi": item["Phòng Thi"],
      "Đợt thi": item["Đợt thi"],
      "Lần thi": item["Lần thi"],
      "Học kỳ": item["Học kỳ"],
      "Năm học": item["Năm học"],
    };
  };

  const getQAandProjectRequiredField = (item: any) => {
    return {
      "Mã môn học": item["Mã MH"],
      "Mã lớp": item["Mã lớp"],
      "Khóa học": item["Khóa học"],
      "Tên môn học": item["Tên MH"],
      "Ngày thi": item["Ngày thi"],
      Thứ: item["Thứ"],
      Tiết: item["Tiết"],
      "Phòng Thi": item["Phòng Thi"],
      "Số SV": item["Số SV"],
      "Đợt thi": item["Đợt thi"],
      "Lần thi": item["Lần thi"],
      "Học kỳ": item["Học kỳ"],
      "Năm học": item["Năm học"],
      "Hình thức": item["Hình thức"],
    };
  };

  const processSheet = (
    sheet: XLSX.WorkSheet,
    range: number,
    type: string,
    getRequiredFields: (item: any) => Record<string, any>,
    errorMessagePrefix: string
  ) => {
    const parsedData = XLSX.utils.sheet_to_json(sheet, {
      range, // Bắt đầu từ hàng được chỉ định
      defval: "",
    });

    let errorMessages: string[] = [];
    let filteredData: any[] = [];

    for (const item of parsedData) {
      // Kiểm tra nếu STT chứa ghi chú

      //@ts-ignore
      if (typeof item.STT === "string" && item.STT.startsWith("Ghi chú")) {
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
      const requiredFields = getRequiredFields(item);

      // Lặp qua các trường để kiểm tra nếu có giá trị undefined
      if (index === 0) {
        Object.entries(requiredFields).forEach(([fieldName, value]) => {
          if (value === undefined) {
            errorMessages.push(
              `${errorMessagePrefix} "${fieldName}" bị thiếu hoặc lỗi.`
            );
          }
        });
      }

      return {
        type,
        STT: item.STT,
        isDeleted: false,
        data: requiredFields,
      };
    });

    return { transformedData, errorMessages };
  };

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

      //! SHEET 1
      const sheetNameCentralizedItem = workbook.SheetNames[0];
      const sheetCentralizedItem = workbook.Sheets[sheetNameCentralizedItem];

      const {
        transformedData: transformedDataCentralizedExam,
        errorMessages: errorMessagesCentralized,
      } = processSheet(
        sheetCentralizedItem,
        6, // Bắt đầu từ hàng thứ 7
        "exam",
        getCentralizedExamRequiredField,
        "Trường của lịch thi tập trung"
      );

      if (errorMessagesCentralized.length > 0) {
        setErrorMessages(errorMessagesCentralized);
      } else {
        //! CALL API centralized với type là midterm (true) hoặc final (false)
        setDataTableCentralized(transformedDataCentralizedExam as []);
      }

      //! SHEET 2
      const sheetNameQAandProject = workbook.SheetNames[1];
      const sheetQAandProject = workbook.Sheets[sheetNameQAandProject];

      const {
        transformedData: transformedDataQAandProject,
        errorMessages: errorMessagesQAandProject,
      } = processSheet(
        sheetQAandProject,
        6, // Bắt đầu từ hàng thứ 7
        "exam",
        getQAandProjectRequiredField,
        "Trường của lịch vấn đáp, đồ án"
      );

      if (errorMessagesQAandProject.length > 0) {
        setErrorMessages(errorMessagesQAandProject);
      } else {
        //! CALL API QA and project với type là midterm (true) hoặc final (false)
        setDataTableQAandProject(transformedDataQAandProject as []);
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
            href="/assets/template_import_lich_thi.xlsx"
            download
            className="text-blue-500 underline text-base italic"
          >
            Tải xuống template file import danh sách lịch thi
          </a>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : dataTableCentralized.length > 0 ? (
        <>
          <p className="mt-10 mb-10 paragraph-semibold">Lịch thi tập trung</p>
          <DataTable
            type={DataTableType.Exam}
            dataTable={dataTableCentralized}
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
      ) : null}

      {isLoading ? (
        <TableSkeleton />
      ) : dataTableQAandProject.length > 0 ? (
        <>
          <p className="mt-10 mb-10 paragraph-semibold">
            Lịch thi vấn đáp, đồ án
          </p>
          <DataTable
            type={DataTableType.Exam}
            dataTable={dataTableQAandProject}
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
      ) : null}
    </div>
  );
}
