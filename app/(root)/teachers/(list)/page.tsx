"use client";

import TeachersDataTable from "@/components/shared/Table/TableImport/TeachersDataTable";
import React, { useEffect, useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import BackToPrev from "@/components/shared/BackToPrev";
import { ITeacherResponseData } from "@/types/entity/Teacher";
import { fetchTeachers } from "@/services/teacherServices";
import { convertToDataTableTeachersViKeys } from "@/lib/convertToDataTableTeachers";
import NoResult from "@/components/shared/Status/NoResult";
import LoadingComponent from "@/components/shared/LoadingComponent";

const Teachers = () => {
  const [isImport, setIsImport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [teachers, setTeachers] = useState<ITeacherResponseData[]>();

  useEffect(() => {
    fetchTeachers()
      .then((data: any) => {
        setTeachers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);


  return (
    <>
      {!isImport ? (
        <div>
          <div className="flex justify-end mt-3 mb-3">
            <IconButton
              text="Import danh sách giảng viên"
              onClick={() => {
                setIsImport(true);
              }}
              iconLeft={"/assets/icons/upload-white.svg"}
              iconWidth={16}
              iconHeight={16}
            />
          </div>

          {isLoading ? (
            <LoadingComponent />
          ) : teachers ? (
            <TeachersDataTable
              isFetchTable
              fetchDataTable={convertToDataTableTeachersViKeys(teachers)}
            />
          ) : (
            <NoResult
              title="Không có dữ liệu!"
              description="🚀 Import file danh sách để thấy được dữ liệu."
            />
          )}
        </div>
      ) : (
        <>
          <BackToPrev
            text={"Quay lại danh sách giảng viên"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />

          <TeachersDataTable />
        </>
      )}
    </>
  );
};

export default Teachers;
