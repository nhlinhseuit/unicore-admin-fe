"use client";

import TeachersDataTable from "@/components/shared/Table/TableImport/TeachersDataTable";
import React, { useEffect, useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import BackToPrev from "@/components/shared/BackToPrev";
import { ITeacher } from "@/types/entity/Teacher";
import { fetchTeachers } from "@/services/teacherServices";

const Teachers = () => {
  const [isImport, setIsImport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    fetchTeachers()
      .then((data: any) => {
        console.log("data", data);
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
