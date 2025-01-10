"use client";

import { DataTableType } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { convertToAPIDataTableCourses } from "@/lib/convertToDataTableCourses";
import { handleCreateCourseAction } from "@/services/courseServices";
import { fetchSubjects } from "@/services/subjectServices";
import { CourseDataItem } from "@/types/entity/Course";
import { parseToArray } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import IconButton from "../../Button/IconButton";
import LoadingComponent from "../../LoadingComponent";
import ErrorComponent from "../../Status/ErrorComponent";
import NoResult from "../../Status/NoResult";
import DataTable from "../components/DataTable";
import TableSkeleton from "../components/TableSkeleton";
interface Props {
  isFetchTable?: boolean;
  fetchDataTable?: CourseDataItem[];
}

export default function CoursesDataTable(params: Props) {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<CourseDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  useEffect(() => {
    if (params.fetchDataTable) {
      setDataTable(params.fetchDataTable);
    }
  }, [params.fetchDataTable]);

  //TODO: check có ds môn chưa để hiện lỗi
  useEffect(() => {
    fetchSubjects()
      .then((data: any) => {
        if (!data || data.length === 0)
          setErrorMessages([
            "Bạn cần phải import danh sách môn học trước khi import danh sách lớp",
          ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });

    //? fetchCourses tại đây
  }, []);

  // XỬ LÝ UPLOAD FILE LỚP HỌC
  const handleCoursesFileUpload = (e: any) => {
    setIsLoading(true);
    setErrorMessages([]);
    setDataTable([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Bỏ 2 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 2, // Chỉ số 2 đại diện cho hàng 3 (vì index bắt đầu từ 0)
        defval: "",
      });

      let errorMessages: string[] = [];

      const transformedData = parsedData.map((item: any, index: number) => {
        // Kiểm tra các trường quan trọng (required fields)
        const requiredFields = {
          "Mã môn học": item["MÃ MH"],
          "Mã lớp": item["MÃ LỚP"],
          "Tên môn học": item["TÊN MÔN HỌC"],
          "Mã GV": parseToArray(item["MÃ GIẢNG VIÊN"]),
          "Tên GV": parseToArray(item["TÊN GIẢNG VIÊN"]),
          "Số TC": item["TỐ TC"],
          HTGD: item["HTGD"],
          "Ngày BĐ": item["NBD"],
          "Ngày KT": item["NKT"],
          "Học kỳ": item["HỌC KỲ"],
          "Năm học": item["NĂM HỌC"],
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
          data: requiredFields,
        };
      });

      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
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

  const { toast } = useToast();

  const createCoursesAPI = async () => {
    const APIdataTable = convertToAPIDataTableCourses({
      data: dataTable,
      organizationId: "1",
    });

    setIsLoadingAPI(true);
    const res = await handleCreateCourseAction(APIdataTable);

    if (res.statusCode === 400) {
      if (res.data.code === "CLASS01") {
        if (res.data.data.duplicated.length > 0)
          setErrorMessages((prev) => [
            ...prev,
            `Các lớp ${res.data.data.duplicated.join(
              ", "
            )} đã tồn tại trong hệ thống.`,
          ]);

        if (res.data.data.subject_not_found.length > 0)
          setErrorMessages((prev) => [
            ...prev,
            `Các môn học ${res.data.data.subject_not_found
              .map((item: any) => item.subject_code)
              .join(", ")} không tồn tại trong hệ thống.`,
          ]);
      }
    }

    console.log("res", res);

    setIsLoadingAPI(false);
  };

  return (
    <div>
      {isLoadingAPI ? <LoadingComponent /> : null}
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
      {params.isFetchTable ? null : (
        <div className="flex justify-between">
          <div>
            <div className="flex mb-2">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleCoursesFileUpload}
                  style={{ display: "none" }}
                />

                <IconButton
                  text="Import danh sách lớp"
                  onClick={handleButtonClick}
                  iconLeft={"/assets/icons/upload-white.svg"}
                  iconWidth={16}
                  iconHeight={16}
                />
              </div>
              {dataTable.length > 0 && (
                <IconButton
                  text="Lưu"
                  onClick={createCoursesAPI}
                  otherClasses="ml-2"
                />
              )}
            </div>

            <a
              href="/assets/template_import_danh_sach_lop.xlsx"
              download
              className="text-blue-500 underline text-base italic"
            >
              Tải xuống template file import lớp học
            </a>
          </div>

          <div>
            <p className="italic text-sm text-right ">
              * Học kỳ hiện tại: HK1, năm 2024
            </p>
            <p className="italic text-sm text-right">
              * Để scroll ngang, nhấn nút Shift và cuộn chuột
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <TableSkeleton />
      ) : dataTable.filter((item) => !item.isDeleted).length > 0 ? (
        <>
          <DataTable
            type={DataTableType.Course}
            dataTable={dataTable}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as CourseDataItem[];
              setDataTable(localDataTable);
            }}
            onClickMultipleDelete={() => {
              setIsMultipleDelete(true);
            }}
            onClickDeleteAll={() => {
              setDataTable((prevData) => {
                return prevData.map((item) => ({
                  ...item,
                  isDeleted: true,
                }));
              });

              toast({
                title: "Xóa thành công",
                description: `Đã xóa tất cả lớp học`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // ? DELETE THEO MÃ LỚP
              setDataTable((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.data["Mã lớp"])) {
                    return {
                      ...item,
                      isDeleted: true,
                    };
                  }
                  return item;
                });
              });

              toast({
                title: "Xóa thành công",
                description: `${`Các lớp ${itemsSelected.join(
                  ", "
                )} đã được xóa.`}`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickGetOut={() => {
              setIsMultipleDelete(false);
            }}
          />
        </>
      ) : (
        <NoResult
          title="Không có dữ liệu!"
          description="🚀 Import file danh sách để thấy được dữ liệu."
          // linkTitle="Import danh sách lớp"
          // handleFileUpload={handleCoursesFileUpload}
        />
      )}
    </div>
  );
}
