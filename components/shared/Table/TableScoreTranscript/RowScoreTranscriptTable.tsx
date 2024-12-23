import { ScoreTranscriptData, ScoreTranscriptDataItem } from "@/types";
import { Table } from "flowbite-react";
import React from "react";

interface RowParams {
  dataItem: ScoreTranscriptDataItem;
  viewDetailGradeColumn: () => void;
}

const RowGradingGroupTable = React.memo(
  (params: RowParams) => {
    const renderTableCellValue = (keyId: string, key: string, value: any) => {
      if (
        key === "Quá trình" ||
        key === "Giữa kỳ" ||
        key === "Cuối kỳ" ||
        key === "Thực hành"
      ) {
        return (
          <span
            className="cursor-pointer underline"
            onClick={params.viewDetailGradeColumn}
          >
            {value}
          </span>
        );
      } else {
        return value;
      }
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => {}}
        className={`bg-background-secondary text-left hover:bg-light-800 cursor-default duration-100`}
      >
        {/* STT */}
        <Table.Cell className="w-10 border-r-[1px]  text-left">
          <span>{params.dataItem.STT}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          let keyId = params.dataItem.data["MSSV"];

          return (
            <Table.Cell
              key={`${keyId}_${key}_${value}`}
              theme={{
                base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
              }}
              className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left 
                ${typeof value === "number" ? "text-center" : ""}
                
                }
            `}
            >
              {renderTableCellValue(keyId, key, value)}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    // Kiểm tra nếu `dataItem` của RowGradingGroupTable không thay đổi thì không cần re-render
    return prevProps.dataItem === nextProps.dataItem;
  }
);

export default RowGradingGroupTable;
