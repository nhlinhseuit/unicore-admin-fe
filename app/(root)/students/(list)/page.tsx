"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import LoadingComponent from "@/components/shared/LoadingComponent";
import NoResult from "@/components/shared/Status/NoResult";
import StudentsDataTable from "@/components/shared/Table/TableImport/StudentsDataTable";
import { convertToDataTableStudentViKeys } from "@/lib/convertToDataTableStudent";
import { fetchStudents } from "@/services/studentServices";
import { IStudentResponseData } from "@/types/entity/Student";
import { useEffect, useState } from "react";

const Students = () => {
  const [isImport, setIsImport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [students, setStudents] = useState<IStudentResponseData[]>([]);

  useEffect(() => {
    fetchStudents()
      .then((data: any) => {
        setStudents(data);
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
              text="Import danh sách sinh viên"
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
          ) : students ? (
            <StudentsDataTable
              isFetchTable
              fetchDataTable={convertToDataTableStudentViKeys(students)}
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
