"use client";

import { DataTableType } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { convertToAPIDataTableOfficers } from "@/lib/convertToDataTableOfficers";
import {
  handleCreateOfficerAction,
  handleEditOfficerAction,
} from "@/services/officerServices";
import { OfficerDataItem } from "@/types/entity/Officer";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import IconButton from "../../Button/IconButton";
import ErrorComponent from "../../Status/ErrorComponent";
import NoResult from "../../Status/NoResult";
import DataTable from "../components/DataTable";
import TableSkeleton from "../components/TableSkeleton";
import LoadingComponent from "../../LoadingComponent";

interface Props {
  isFetchTable?: boolean;
  fetchDataTable?: OfficerDataItem[];
}

export default function OfficersDataTable(params: Props) {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<OfficerDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  useEffect(() => {
    if (params.fetchDataTable) {
      setDataTable(params.fetchDataTable);
    }
  }, [params.fetchDataTable]);

  // XỬ LÝ UPLOAD FILE DS GIÁO VỤ
  const handleOfficerFileUpload = (e: any) => {
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
          "Mã giáo vụ": item["Mã giáo vụ"],
          "Họ và tên": item["Họ và tên"],
          "Vị trí": item["Vị trí"],
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
          type: "officer",
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

  const createOffciersAPI = async () => {
    const mockParamsAPIdataTable = convertToAPIDataTableOfficers({
      data: dataTable,
      organizationId: "1",
    });

    setIsLoadingAPI(true);
    const res = await handleCreateOfficerAction(mockParamsAPIdataTable);
    setIsLoadingAPI(false);
  };
  
  const editOffciersAPI = async (newDataTable: any) => {
    console.log("editOffciersAPI");
    const mockParamsAPIdataTable = convertToAPIDataTableOfficers({
      data: newDataTable,
      organizationId: "1",
    });

    
    const mockParams = {
      organization_id: "1",
      staff: mockParamsAPIdataTable.officers}
   
      console.log("mockParams", mockParams);

    setIsLoadingAPI(true);
    const res = await handleEditOfficerAction(mockParams);
    setIsLoadingAPI(false);
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
                  onChange={handleOfficerFileUpload}
                  style={{ display: "none" }}
                />

                <IconButton
                  text="Import danh sách giáo vụ mới"
                  onClick={handleButtonClick}
                  iconLeft={"/assets/icons/upload-white.svg"}
                  iconWidth={16}
                  iconHeight={16}
                />
              </div>
              {dataTable.length > 0 && (
                <IconButton
                  text="Lưu"
                  onClick={createOffciersAPI}
                  otherClasses="ml-2"
                />
              )}
            </div>

            <a
              href="/assets/template_import_danh_sach_giao_vu.xlsx"
              download
              className="text-blue-500 underline text-base italic"
            >
              Tải xuống template file import giáo vụ
            </a>
          </div>

          <div className="flex justify-end gap-4 mb-3 items-center">
            <p className="italic text-sm">
              * Để scroll ngang, nhấn nút Shift và cuộn chuột
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <TableSkeleton />
      ) : dataTable.length > 0 ? (
        <>
          <DataTable
            isFetchTable={params.isFetchTable}
            type={DataTableType.Officer}
            dataTable={dataTable}
            isEditTable={isEditTable}
            isMultipleDelete={isMultipleDelete}
            onClickEditTable={() => {
              setIsEditTable(true);
            }}
            onSaveEditTable={(localDataTable) => {
              setIsEditTable(false);
              // set lại data import hoặc patch API
              localDataTable = localDataTable as OfficerDataItem[];
              setDataTable(localDataTable);

              //? API
              editOffciersAPI(localDataTable);
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
                description: `Đã xóa tất cả giáo vụ`,
                variant: "success",
                duration: 3000,
              });
            }}
            onClickDelete={(itemsSelected: string[]) => {
              // ? DELETE THEO MSSV
              setDataTable((prevData) => {
                return prevData.map((item) => {
                  if (itemsSelected.includes(item.data["Mã giáo vụ"])) {
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
                description: `${`Các giáo vụ ${itemsSelected.join(
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
        />
      )}
    </div>
  );
}
