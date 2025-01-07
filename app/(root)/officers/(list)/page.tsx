"use client";
import React, { useEffect, useState } from "react";
import IconButton from "@/components/shared/Button/IconButton";
import BackToPrev from "@/components/shared/BackToPrev";
import { fetchOfficer } from "@/services/officerServices";
import { IOfficerResponse } from "@/types/entity/Officer";
import OfficersDataTable from "@/components/shared/Table/TableImport/OfficersDataTable";
import { convertToDataTableOfficersViKeys } from "@/lib/convertToDataTableOfficers";
import LoadingComponent from "@/components/shared/LoadingComponent";
import NoResult from "@/components/shared/Status/NoResult";

const Officers = () => {
  const [isImport, setIsImport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [officers, setOfficers] = useState<IOfficerResponse[]>();

  useEffect(() => {
    fetchOfficer()
      .then((data: any) => {
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

          {isLoading ? (
            <LoadingComponent />
          ) : officers ? (
            <OfficersDataTable
              isFetchTable
              fetchDataTable={convertToDataTableOfficersViKeys(officers)}
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
