"use client";

import { mockTopicDataTable } from "@/mocks";
import { useState } from "react";

import NoResult from "@/components/shared/Status/NoResult";
import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import { RegisterTopicTableType } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { RegisterTopicDataItem } from "@/types";

const UploadTopicResult = () => {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] =
    useState<RegisterTopicDataItem[]>(mockTopicDataTable);

  return (
    <>
      {dataTable.filter((item) => !item.isDeleted).length > 0 ? (
        // <TopicDataTable
        //   isEditTable={isEditTable}
        //   isMultipleDelete={isMultipleDelete}
        //   // @ts-ignore
        //   dataTable={dataTable}
        //   onClickEditTable={() => {
        //     setIsEditTable(true);
        //   }}
        //   onSaveEditTable={(localDataTable) => {
        //     console.log("here");
        //     setIsEditTable(false);
        //     // set lại data import hoặc patch API
        //     localDataTable = localDataTable as RegisterTopicDataItem[];
        //     setDataTable(localDataTable);
        //   }}
        //   onClickMultipleDelete={() => {
        //     setIsMultipleDelete(true);
        //   }}
        //   onClickDeleteAll={() => {
        //     setDataTable((prevData) => {
        //       return prevData.map((item) => ({
        //         ...item,
        //         isDeleted: true,
        //       }));
        //     });

        //     toast({
        //       title: "Xóa thành công",
        //       description: `Đã xóa tất cả lớp học`,
        //       variant: "success",
        //       duration: 3000,
        //     });
        //   }}
        //   onClickDelete={(itemsSelected: string[]) => {
        //     // ? DELETE THEO MÃ LỚP
        //     setDataTable((prevData) => {
        //       return prevData.map((item) => {
        //         if (itemsSelected.includes(item.STT.toString())) {
        //           return {
        //             ...item,
        //             isDeleted: true,
        //           };
        //         }
        //         return item;
        //       });
        //     });

        //     toast({
        //       title: "Xóa thành công",
        //       description: `${`Các lớp ${itemsSelected.join(
        //         ", "
        //       )} đã được xóa.`}`,
        //       variant: "success",
        //       duration: 3000,
        //     });
        //   }}
        //   onClickGetOut={() => {
        //     setIsMultipleDelete(false);
        //   }}
        // />

        <RegisterTopicTable
          type={RegisterTopicTableType.registerTopic}
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
            localDataTable = localDataTable as RegisterTopicDataItem[];
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
      ) : (
        <NoResult
          title="Không có dữ liệu!"
          description="🚀 Import file danh sách để thấy được dữ liệu."
        />
      )}
    </>
  );
};

export default UploadTopicResult;
