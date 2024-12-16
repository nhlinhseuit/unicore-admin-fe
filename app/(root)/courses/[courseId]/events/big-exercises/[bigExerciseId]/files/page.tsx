"use client";

import IconButton from "@/components/shared/Button/IconButton";
import FileDataTable from "@/components/shared/Table/TableFile/FileDataTable";
import { mockFileDataTable } from "@/mocks";

const Files = () => {
  return (
    <>
      <>
        <div className="flex justify-end mb-3 gap-2">
          <IconButton
            text="Tải xuống"
            onClick={() => {}}
            iconLeft={"/assets/icons/download-white.svg"}
            iconWidth={16}
            iconHeight={16}
          />
        </div>

        <FileDataTable
          isOnlyView
          isEditTable={false}
          isMultipleDelete={false}
          // @ts-ignore
          dataTable={mockFileDataTable}
        />
      </>
    </>
  );
};

export default Files;
