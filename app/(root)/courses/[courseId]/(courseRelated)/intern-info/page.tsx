"use client";

import IconButton from "@/components/shared/Button/IconButton";
import { mockDataStudentInternInfo } from "@/mocks";
import { useState } from "react";

import TitleDescription from "@/components/shared/TitleDescription";
import { toast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";

import { InternInfoItem } from "@/types/entity/Topic";
import InternInfoTable from "./InternInfoTable";

const ManageGroup = () => {
  const pathName = usePathname();

  const [dataTable, setDataTable] = useState<InternInfoItem[]>(
    mockDataStudentInternInfo
  );
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);

  return (
    <div>
      <TitleDescription
        title="Điền thông tin thực tập"
        description={["Thời hạn: 01/02/2025 - 28/02/2025"]}
      />

      <InternInfoTable
        isAlreadyRegisteredGroup={false}
        isEditTable={isEditTable}
        isMultipleDelete={isMultipleDelete}
        // @ts-ignore
        dataTable={dataTable}
        onClickEditTable={() => {
          setIsEditTable(true);
        }}
        onSaveEditTable={(localDataTable) => {
          console.log("here");
          setIsEditTable(false);
          // set lại data import hoặc patch API
          localDataTable = localDataTable as InternInfoItem[];
          setDataTable(localDataTable);

          toast({
            title: "Cập nhật thông tin thành công",
            variant: "success",
            duration: 3000,
          });
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
              if (itemsSelected.includes(item.STT.toString())) {
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
            description: `${`Các sinh viên ${dataTable
              .filter((item) => itemsSelected.includes(item.STT.toString()))
              .map((item) => item.data["MSSV"])} đã được xóa.`}`,
            variant: "success",
            duration: 3000,
          });
        }}
        onClickGetOut={() => {
          setIsMultipleDelete(false);
        }}
        onClickCancelEdit={() => {
          setIsEditTable(false);
        }}
      />
    </div>
  );
};

export default ManageGroup;
