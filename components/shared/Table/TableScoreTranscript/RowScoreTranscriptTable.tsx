import { ScoreTranscriptData, ScoreTranscriptDataItem } from "@/types";
import { Table } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "../../Button/IconButton";
import InputComponent from "../components/InputComponent";
import MoreButtonComponent from "../components/MoreButtonComponent";

interface RowParams {
  dataItem: ScoreTranscriptDataItem;
  isEditTable?: boolean;
  isMultipleDelete?: boolean;
  isHasSubCourses?: boolean;
  onClickCheckBoxSelect?: (item: string) => void;
  onChangeRow?: (item: any) => void;
  viewDetailGradeColumn: () => void;
}
interface handleInputChangeParams {
  key: ScoreTranscriptData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const RowGradingGroupTable = React.memo(
  (params: RowParams) => {
    const [editDataItem, setEditDataItem] = useState(params.dataItem);

    const refInput = useRef({});

    const handleInputChange = ({
      key,
      newValue,
      isMultipleInput,
      currentIndex,
      isCheckbox,
    }: handleInputChangeParams) => {
      //@ts-ignore
      const updatedDataItem: ScoreTranscriptDataItem = {
        ...editDataItem,
        data: {
          ...editDataItem.data,
          // @ts-ignore
          [key]: isMultipleInput
            ? //@ts-ignore
              (editDataItem.data[key] as string)
                .split(/\r\n|\n/)
                .map((line, index) =>
                  index === currentIndex ? newValue : line
                )
                .join("\r\n")
            : newValue,
        },
      };

      // setEditDataItem(updatedDataItem); // ??

      params.onChangeRow && params.onChangeRow(updatedDataItem); // Gọi callback để truyền dữ liệu đã chỉnh sửa lên DataTable
    };

    var valueUniqueInput = params.dataItem.data["MSSV"];

    const renderTableCellValue = (
      keyId: string,
      key: string,
      value: any,
    ) => {
      if (
        key === "Quá trình" ||
        key === "Giữa kỳ" ||
        key === "Cuối kỳ" ||
        key === "Thực hành"
      ) {
        if (params.isEditTable) {
          return (
            <InputComponent
              key={`${keyId}_input_${key}_${value}`}
              value={value as string | number}
              placeholder={value as string | number}
              //@ts-ignore
              onChange={(newValue) =>
                //@ts-ignore
                handleInputChange({ key: key, newValue: newValue })
              }
            />
          );
        } else {
          return (
            <span
              className="cursor-pointer underline"
              onClick={params.viewDetailGradeColumn}
            >
              {value}
            </span>
          );
        }
      } else {
        return value;
      }
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => {}}
        className={`bg-background-secondary  text-left ${
          params.isEditTable
            ? "hover:bg-white cursor-default"
            : "hover:bg-light-800 cursor-default"
        } duration-100`}
      >
        {/* checkbox */}
        <Table.Cell className="w-10 border-r-[1px] z-100 ">
          <div
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.RowGradingGroupTable
            }}
          >
            {params.isMultipleDelete ? (
              <div className="flex items-center justify-center w-10 h-10">
                <input
                  id="apple"
                  type="checkbox"
                  name="filterOptions"
                  value={valueUniqueInput}
                  onChange={() => {
                    {
                      params.onClickCheckBoxSelect &&
                        params.onClickCheckBoxSelect(valueUniqueInput);
                    }
                  }}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-primary-600"
                />
              </div>
            ) : null}
          </div>
        </Table.Cell>

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
    return (
      prevProps.dataItem === nextProps.dataItem &&
      prevProps.isEditTable === nextProps.isEditTable &&
      prevProps.isMultipleDelete === nextProps.isMultipleDelete
    );
  }
);

export default RowGradingGroupTable;
