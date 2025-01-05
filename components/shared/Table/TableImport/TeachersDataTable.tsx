"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "../components/DataTable";
import ErrorComponent from "../../Status/ErrorComponent";
import TableSkeleton from "../components/TableSkeleton";
import NoResult from "../../Status/NoResult";
import { useToast } from "@/hooks/use-toast";
import IconButton from "../../Button/IconButton";
import { DataTableType } from "@/constants";
import { generateUsername, normalizeSearchItem } from "@/lib/utils";
import { TeacherDataItem } from "@/types/entity/Teacher";
import { convertToAPIDataTableTeachers } from "@/lib/convertToDataTableTeachers";
import { handleCreateTeachersAction } from "@/services/teacherServices";

export default function TeachersDataTable() {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<TeacherDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // XỬ LÝ UPLOAD FILE DS GIẢNG VIÊN
  const handleTeacherFileUpload = (e: any) => {
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
      // Bỏ 1 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 1, // Chỉ số 1 đại diện cho hàng 2 (vì index bắt đầu từ 0)
        defval: "",
      });

      let errorMessages: string[] = [];

      const transformedData = parsedData.map((item: any, index: number) => {
        // Kiểm tra các trường quan trọng (required fields)
        const requiredFields = {
          "Mã cán bộ": item["Mã cán bộ"],
          "Họ và tên": item["Họ và tên"],
          "Học vị": item["Học vị"],
          "Hướng nghiên cứu": item["Hướng nghiên cứu"],
          "Quan tâm tìm hiểu": item["Quan tâm tìm hiểu"],
          Email: item["Email"],
          SDT: item["Điện thoại"],
          "Giới tính": item["Giới tính"],
          "Địa chỉ": item["Địa chỉ"],
          "Ngày sinh": item["Ngày sinh"],
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
          type: "teacher",
          STT: item.STT,
          isDeleted: false,
          data: {
            "Mã cán bộ": item["Mã cán bộ"],
            "Tài khoản": generateUsername(item["Họ và tên"] ?? ""),
            "Mật khẩu": "1",
            "Họ và tên": item["Họ và tên"],
            "Học vị": item["Học vị"],
            "Hướng nghiên cứu": item["Hướng nghiên cứu"],
            "Quan tâm tìm hiểu": item["Quan tâm tìm hiểu"],
            Email: item["Email"],
            SDT: item["Điện thoại"],
            "Giới tính": item["Giới tính"],
            "Địa chỉ": item["Địa chỉ"],
            "Ngày sinh": item["Ngày sinh"],
          },
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

  const createTeachersAPI = async () => {
    const APIdataTable = convertToAPIDataTableTeachers({
      data: dataTable,
      organizationId: "1",
    });

    const res = await handleCreateTeachersAction(APIdataTable);

    console.log(APIdataTable);

    console.log("res", res);
  };

  // Tạo một reference để liên kết với thẻ input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { toast } = useToast();

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
          <div className="flex mb-2">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleTeacherFileUpload}
                style={{ display: "none" }}
              />

              <IconButton
                text="Import danh sách giảng viên"
                onClick={handleButtonClick}
                iconLeft={"/assets/icons/upload-white.svg"}
                iconWidth={16}
                iconHeight={16}
              />
            </div>
            {dataTable.length > 0 && (
              <IconButton
                text="Lưu"
                onClick={createTeachersAPI}
                otherClasses="ml-2"
              />
            )}
          </div>

          <a
            href="/assets/KTLN - template import ds giảng viên.xlsx"
            download
            className="text-blue-500 underline text-base italic"
          >
            Tải xuống template file import giảng viên
          </a>
        </div>

        <div className="flex justify-end gap-4 mb-3 items-center">
          <p className="italic text-sm">
            * Để scroll ngang, nhấn nút Shift và cuộn chuột
          </p>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : dataTable.length > 0 ? (
        <>
          <DataTable
            type={DataTableType.Teacher}
            dataTable={dataTable}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as TeacherDataItem[];
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
                description: `Đã xóa tất cả giảng viên`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // ? DELETE THEO MSSV
              setDataTable((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.data["Mã cán bộ"])) {
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
                description: `${`Các giảng viên ${itemsSelected.join(
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
          linkTitle="Import danh sách giảng viên"
          handleFileUpload={handleTeacherFileUpload}
        />
      )}
    </div>
  );
}
