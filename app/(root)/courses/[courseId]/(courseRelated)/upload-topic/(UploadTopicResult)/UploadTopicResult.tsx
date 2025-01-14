"use client";

import { mockTopicDataTable } from "@/mocks";
import { useEffect, useState } from "react";

import NoResult from "@/components/shared/Status/NoResult";
import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import { RegisterTopicTableType } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { convertToDataTableTopicsViKeys } from "@/lib/convertToDataTableTopic";
import { fetchDetailProject } from "@/services/topic.ProjectServices";
import { ITProjectResponseData } from "@/types/entity/Project";
import { TopicDataItem } from "@/types/entity/Topic";
import LoadingComponent from "@/components/shared/LoadingComponent";

const UploadTopicResult = () => {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] =
    useState<TopicDataItem[]>(mockTopicDataTable);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mockParamsProjectId = "677cd4ae3bc6f71acb13d066";

  useEffect(() => {
    fetchDetailProject(mockParamsProjectId)
      .then((data: any) => {
        if (data) setDataTable(convertToDataTableTopicsViKeys(data?.topics));
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : dataTable.filter((item) => !item.isDeleted).length > 0 ? (
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
            localDataTable = localDataTable as TopicDataItem[];
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
