"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import LoadingComponent from "@/components/shared/LoadingComponent";
import NoResult from "@/components/shared/Status/NoResult";
import SubjectsDataTable from "@/components/shared/Table/TableImport/SubjectsDataTable";
import { convertToDataTableSubjectsViKeys } from "@/lib/convertToDataTableSubjects";
import { fetchSubjects } from "@/services/subjectServices";
import { ISubjectResponseData } from "@/types/entity/Subject";
import React, { useEffect, useState } from "react";

const Subjects = () => {
  const [isImport, setIsImport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subjects, setSubjects] = useState<ISubjectResponseData[]>([]);

  useEffect(() => {
    fetchSubjects()
      .then((data: any) => {
        console.log("data", data);
        setSubjects(data);
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
          <div className="flex justify-end mb-3">
            <IconButton
              text="Import danh sách môn mới"
              onClick={() => {
                setIsImport(true);
              }}
              iconLeft={"/assets/icons/upload-white.svg"}
              iconWidth={16}
              iconHeight={16}
            />
          </div>
          <div className="flex justify-end gap-4 mb-3 items-center">
            <p className="italic text-sm">* Học kỳ hiện tại: HK1, năm 2024</p>
          </div>

          {isLoading ? (
            <LoadingComponent />
          ) : subjects ? (
            <SubjectsDataTable
              isFetchTable
              fetchDataTable={convertToDataTableSubjectsViKeys(subjects)}
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
            text={"Quay lại danh sách môn học"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />

          <SubjectsDataTable />
        </>
      )}
    </>
  );
};

export default Subjects;
