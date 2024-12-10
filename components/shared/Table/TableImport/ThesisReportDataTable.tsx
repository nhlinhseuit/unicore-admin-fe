"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { CourseDataItem } from "@/types";
import DataTable from "../components/DataTable";
import ErrorComponent from "../../Status/ErrorComponent";
import TableSkeleton from "../components/TableSkeleton";
import NoResult from "../../Status/NoResult";
import { useToast } from "@/hooks/use-toast";
import IconButton from "../../Button/IconButton";
import { DataTableType } from "@/constants";

type Student = {
  name: string;
  studentId: string;
  topicVi: string;
  topicEn: string;
};

type Group = {
  students: Student[];
};

type Council = {
  councilName: string;
  groups: Group[];
};

export default function ThesisReportDataTable() {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<CourseDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([
    "Bạn cần phải import danh sách môn học trước khi import danh sách lớp",
  ]);
  const [isLoading, setIsLoading] = useState(false);

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

      // Bỏ qua 7 hàng đầu tiên của file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 7, // Chỉ số 7 đại diện cho hàng 8 (vì index bắt đầu từ 0)
        defval: "",
      });

      console.log("parsedData", parsedData);

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
            if (currentGroup && currentGroup.students.length > 0) {
              currentCouncil.groups.push(currentGroup);
              currentGroup = null; // Reset nhóm hiện tại
            }
            councils.push(currentCouncil); // Thêm hội đồng hiện tại vào danh sách
          }
          // Tạo hội đồng mới
          currentCouncil = {
            councilName: `Hội đồng ${item.STT}`,
            groups: [],
          };
        } else if (
          item["TÊN ĐỀ TÀI TIẾNG VIỆT"] ||
          item["TÊN ĐỀ TÀI TIẾNG ANH"]
        ) {
          // Sinh viên có đầy đủ thông tin, tạo nhóm mới
          if (currentGroup && currentGroup.students.length > 0) {
            currentCouncil?.groups.push(currentGroup); // Thêm nhóm hiện tại vào hội đồng
          }
          currentGroup = {
            students: [
              {
                name: item["HỌ TÊN"] || "",
                studentId: item["MSSV"] || "",
                topicVi: item["TÊN ĐỀ TÀI TIẾNG VIỆT"] || "",
                topicEn: item["TÊN ĐỀ TÀI TIẾNG ANH"] || "",
              },
            ],
          };
        } else if (currentGroup) {
          // Chỉ thêm sinh viên nếu có MSSV hoặc HỌ TÊN
          const studentName = item["HỌ TÊN"] || "";
          const studentId = item["MSSV"] || "";
          if (studentName || studentId) {
            currentGroup.students.push({
              name: studentName,
              studentId: studentId,
              topicVi: item["TÊN ĐỀ TÀI TIẾNG VIỆT"] || "",
              topicEn: item["TÊN ĐỀ TÀI TIẾNG ANH"] || "",
            });
          }
        }
      });

      // Xử lý nhóm và hội đồng cuối cùng nếu còn tồn đọng

      //@ts-ignore
      if (currentGroup && currentGroup!.students.length > 0) {
        currentCouncil!.groups.push(currentGroup);
      }
      if (currentCouncil) {
        councils.push(currentCouncil);
      }

      // Xử lý nhóm và hội đồng cuối cùng nếu còn tồn đọng
      if (currentGroup) {
        //@ts-ignore
        currentCouncil?.groups.push(currentGroup);
      }
      if (currentCouncil) {
        councils.push(currentCouncil);
      }

      console.log("Processed Councils", councils);

      // Nếu có lỗi, hiển thị lỗi
      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        // Cập nhật dữ liệu hội đồng
        setDataTable(councils as []);
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

  console.log("errorMessages", errorMessages);

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
                onChange={handleCoursesFileUpload}
                style={{ display: "none" }}
              />

              <IconButton
                text="Import danh sách hội đồng phản biện"
                onClick={handleButtonClick}
                iconLeft={"/assets/icons/upload-white.svg"}
                iconWidth={16}
                iconHeight={16}
              />
            </div>
            {dataTable.length > 0 && (
              <IconButton text="Lưu" onClick={() => {}} otherClasses="ml-2" />
            )}
          </div>

          <a
            href="/assets/KLTN - template Hội đồng KLTN.xlsx"
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

      {isLoading ? (
        <TableSkeleton />
      ) : dataTable.length > 0 ? (
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
          linkTitle="Import danh sách hội đồng phản biện"
          handleFileUpload={handleCoursesFileUpload}
        />
      )}
    </div>
  );
}
