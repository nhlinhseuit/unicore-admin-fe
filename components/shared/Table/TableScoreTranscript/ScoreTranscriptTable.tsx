import { itemsPerPageRegisterTable } from "@/constants";
import { GradeColumnPercentDataItem, ScoreTranscriptDataItem } from "@/types";
import { Table } from "flowbite-react";
import { useMemo, useState } from "react";
import NoResult from "../../Status/NoResult";
import { tableTheme } from "../components/DataTable";
import MyFooter from "../components/MyFooter";
import RowScoreTranscriptTable from "./RowScoreTranscriptTable";

interface DataTableParams {
  dataTable: ScoreTranscriptDataItem[];
  dataGradeColumnPercent: GradeColumnPercentDataItem;
  viewDetailGradeColumn: () => void;
}

const ScoreTranscriptTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = dataTable.length;

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageRegisterTable,
      currentPage * itemsPerPageRegisterTable
    );
  }, [dataTable, currentPage]);

  const [filteredDataTable, setFilteredDataTable] =
    useState<ScoreTranscriptDataItem[]>(currentItems);

  const applyFilter = () => {
    let filteredData;

    filteredData = currentItems;
    setFilteredDataTable(filteredData);
  };

  return (
    <div>
      {/* TABLE */}
      {currentItems.length > 0 && filteredDataTable.length === 0 ? (
        <NoResult
          title="Không có dữ liệu!"
          description="💡 Bạn hãy thử tìm kiếm 1 từ khóa khác nhé."
        />
      ) : (
        <div
          className="
          scroll-container 
          overflow-auto
          max-w-full
          h-fit
          rounded-lg
          border-[1px]
          border-secondary-200
          "
        >
          <Table hoverable theme={tableTheme}>
            {/* HEADER */}
            <Table.Head
              theme={tableTheme?.head}
              className="sticky top-0 z-10 uppercase border-b bg-gray"
            >
              <Table.HeadCell
                theme={tableTheme?.head?.cell}
                className={` w-10 border-r-[1px] uppercase`}
              >
                STT
              </Table.HeadCell>

              {Object.keys(filteredDataTable[0]?.data || {}).map(
                (key, index) => {
                  if (
                    key === "Quá trình" ||
                    key === "Giữa kỳ" ||
                    key === "Cuối kỳ"
                  ) {
                    return (
                      <Table.HeadCell
                        key={`${key}_${index}`}
                        theme={tableTheme?.head?.cell}
                        className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                      >
                        {`${key} (${params.dataGradeColumnPercent[`${key}`]}%)`}
                      </Table.HeadCell>
                    );
                  }
                  return (
                    <Table.HeadCell
                      key={`${key}_${index}`}
                      theme={tableTheme?.head?.cell}
                      className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                    >
                      {key}
                    </Table.HeadCell>
                  );
                }
              )}
            </Table.Head>

            {/* BODY */}
            <Table.Body className="text-left divide-y">
              {filteredDataTable.map((dataItem, index) =>
                dataItem.isDeleted ? null : (
                  <RowScoreTranscriptTable
                    key={dataItem.STT}
                    dataItem={dataItem}
                    viewDetailGradeColumn={params.viewDetailGradeColumn}
                  />
                )
              )}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* FOOTER */}
      <MyFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPageRegisterTable}
        totalItems={totalItems}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default ScoreTranscriptTable;
