import { Table } from "flowbite-react";
import React, { useRef } from "react";
import InputComponent from "../components/InputComponent";
import { TopicData, TopicDataItem } from "@/types/entity/Topic";

interface RowParams {
  dataItem: TopicDataItem;
  valueUniqueInput: string;
  itemsSelected: string[];
  isEditTable?: boolean;
  isMultipleDelete?: boolean;
  onChangeRow?: (item: any) => void;
  onClickCheckBoxSelect?: (item: string) => void;
}
interface handleInputChangeParams {
  key: keyof TopicData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const RowTopicDataTable = React.memo(
  (params: RowParams) => {
    const refInput = useRef(params.dataItem);

    const handleInputChange = ({
      key,
      newValue,
      isMultipleInput,
      currentIndex,
      isCheckbox,
    }: handleInputChangeParams) => {
      //@ts-ignore
      const updatedDataItem: TopicDataItem = {
        ...refInput.current,
        data: {
          ...refInput.current.data,
          [key]: newValue,
        },
      };

      refInput.current = updatedDataItem; //? ĐỂ UPATE ĐƯỢC NHIỀU FIELD TRÊN 1 HÀNG

      params.onChangeRow && params.onChangeRow(updatedDataItem); // Gọi callback để truyền dữ liệu đã chỉnh sửa lên DataTable
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => {}}
        className={`bg-background-secondary text-left duration-100 ${
          params.isEditTable || params.isEditTable
            ? "hover:bg-white cursor-default"
            : "hover:bg-light-800 cursor-default"
        }`}
      >
        {/* checkbox */}
        <Table.Cell className="w-10 border-r-[1px] z-100 ">
          <div
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.Row
            }}
          >
            <div className="flex items-center justify-center w-10 h-10">
              <input
                id="apple"
                type="checkbox"
                name="filterOptions"
                value={params.valueUniqueInput}
                checked={params.itemsSelected.includes(params.valueUniqueInput)}
                onChange={() => {
                  {
                    params.onClickCheckBoxSelect &&
                      params.onClickCheckBoxSelect(params.valueUniqueInput);
                  }
                }}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-primary-600"
              />
            </div>
          </div>
        </Table.Cell>

        {/* STT */}
        <Table.Cell className="w-10 border-r-[1px]  text-left">
          <span>{params.dataItem.STT}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          const keyId = params.dataItem.data["Tên đề tài tiếng Việt"];

          return params.isEditTable ? (
            key === "Mô tả" ? (
              <Table.Cell
                key={`${key}_${value}`}
                theme={{
                  base: `group-first/body:group-first/row:first:rounded-tl-lg
          group-first/body:group-first/row:last:rounded-tr-lg
          group-last/body:group-last/row:first:rounded-bl-lg
          group-last/body:group-last/row:last:rounded-br-lg
          px-4 py-4 text-center text-secondary-900`,
                }}
                className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]`}
              >
                <InputComponent
                  key={`${keyId}_input_${key}_${value}`}
                  value={value as string | number}
                  placeholder={value as string | number}
                  // @ts-ignore
                  onChange={(newValue) => handleInputChange({ key, newValue })}
                  isDescription
                  isInTable
                />
              </Table.Cell>
            ) : (
              <Table.Cell
                key={`${key}_${value}`}
                theme={{
                  base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
                }}
                className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]`}
              >
                <InputComponent
                  key={`${keyId}_input_${key}_${value}`}
                  value={value as string | number}
                  placeholder={value as string | number}
                  // @ts-ignore
                  onChange={(newValue) => handleInputChange({ key, newValue })}
                />
              </Table.Cell>
            )
          ) : (
            <Table.Cell
              key={`${key}_${value}`}
              theme={{
                base: `group-first/body:group-first/row:first:rounded-tl-lg
              group-first/body:group-first/row:last:rounded-tr-lg
              group-last/body:group-last/row:first:rounded-bl-lg
              group-last/body:group-last/row:last:rounded-br-lg
              px-4 py-4 text-center text-secondary-900`,
              }}
              className={`border-r-[1px] px-2 py-4 normal-case text-left max-w-[800px]`}
            >
              {value}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    // Kiểm tra nếu `dataItem` của Row không thay đổi thì không cần re-render
    return (
      prevProps.itemsSelected === nextProps.itemsSelected &&
      prevProps.dataItem === nextProps.dataItem &&
      prevProps.isEditTable === nextProps.isEditTable &&
      prevProps.isMultipleDelete === nextProps.isMultipleDelete
    );
  }
);

export default RowTopicDataTable;
