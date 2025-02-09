"use client";

import { mockTopicDataTable } from "@/mocks";
import { useEffect, useState } from "react";

import NoResult from "@/components/shared/Status/NoResult";
import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import { RegisterTopicTableType } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { convertToDataTableTopicsViKeys } from "@/lib/convertToDataTableTopic";
import { fetchDetailProject } from "@/services/topic.ProjectServices";
import { TopicDataItem } from "@/types/entity/Topic";
import LoadingComponent from "@/components/shared/LoadingComponent";
import { fetchTopicsInProject } from "@/services/topicInProjectServices";

const UploadTopicResult = () => {
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<TopicDataItem[]>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //TODO: trong lớp
  // class_id: "678e0290551a4b14f9d22bed",
  // subclass_code: "SE113.O21.PMCL",

  //? fetch ds đề tài của project
  const mockParamsProjectId = "67a6e790dcf5f232aead4372";

  useEffect(() => {
    fetchTopicsInProject(mockParamsProjectId)
      .then((data: any) => {
        console.log("fetchTopicsInProject", data);
        if (data) setDataTable(convertToDataTableTopicsViKeys(data.data));
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  console.log("dataTable", dataTable);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : dataTable &&
        dataTable.filter((item) => !item.isDeleted).length > 0 ? (
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
              if (prevData)
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
              if (prevData)
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
          onClickCancelEdit={() => {
            setIsEditTable(false);
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
