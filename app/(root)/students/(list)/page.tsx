"use client";
import StudentsDataTable from "@/components/shared/Table/TableImport/StudentsDataTable";
import React, { useEffect, useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import BackToPrev from "@/components/shared/BackToPrev";
import { IStudent } from "@/types/entity/Student";
import { fetchStudents } from "@/services/studentServices";

const Students = () => {
   const [isImport, setIsImport] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
  const [subjects, setSubjects] = useState<IStudent[]>([]);
  
      useEffect(() => {
        fetchStudents()
        .then((data: any) => {
          console.log("data", data);
          setSubjects(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
      }, [])

  return (
    <>
      {!isImport ? (
        <div>
          <div className="flex justify-end mt-3 mb-3">
            <IconButton
              text="Import danh sách sinh viên"
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
            text={"Quay lại danh sách sinh viên"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />

          <StudentsDataTable />
        </>
      )}
    </>
  );
};

export default Students;
