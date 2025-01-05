"use client";
import React, { useEffect, useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import BackToPrev from "@/components/shared/BackToPrev";
import { fetchOfficer } from "@/services/officerServices";
import { IOfficer } from "@/types/entity/Officer";
import OfficersDataTable from "@/components/shared/Table/TableImport/OfficersDataTable";

const Officers = () => {
  const [isImport, setIsImport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [officers, setOfficers] = useState<IOfficer[]>([]);

  useEffect(() => {
    fetchOfficer()
      .then((data: any) => {
        console.log("data", data);
        setOfficers(data);
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
              text="Import danh sách giáo vụ"
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
            text={"Quay lại danh sách giáo vụ"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />

          <OfficersDataTable />
        </>
      )}
    </>
  );
};

export default Officers;
