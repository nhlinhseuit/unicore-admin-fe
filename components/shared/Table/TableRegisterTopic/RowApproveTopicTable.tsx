import { RegisterTopicTableType } from "@/constants";
import {
  CourseData,
  RegisterTopicDataItem,
  StudentData,
  SubjectData,
  TeacherData,
} from "@/types";
import { Table } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import IconButton from "../../Button/IconButton";
import InputComponent from "../components/InputComponent";
import MoreButtonComponent from "../components/MoreButtonComponent";

interface RowParams {
  type: RegisterTopicTableType;
  dataItem: RegisterTopicDataItem;
  isHasSubCourses?: boolean;
  onClickCheckBoxSelect?: (item: string) => void;
}
interface handleInputChangeParams {
  key:
    | keyof CourseData
    | keyof SubjectData
    | keyof StudentData
    | keyof TeacherData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const RowApproveTopicTable = React.memo(
  (params: RowParams) => {
    var valueUniqueInput = params.dataItem.data["Mã nhóm"];

    const renderCellValue = ({
      key,
      value,
      keyId,
      params,
    }: {
      key: string;
      value: string | number | Array<string | number>;
      keyId: string | number;
      params: any;
    }) => {
      switch (key) {
        case "MSSV":
        case "Họ và tên":
        case "SĐT":
          return params.isEditTable ? (
            Array.isArray(value) ? (
              <div className="flex flex-col gap-1">
                {value.map((item, index) => (
                  <InputComponent
                    key={`${keyId}_${item}_${index}`}
                    value={item}
                    placeholder={item as string | number}
                    onChange={(newValue) => {
                      // handleInputChange({
                      //   key,
                      //   newValue,
                      //   isMultipleInput: true,
                      //   currentIndex: index,
                      // })
                    }}
                  />
                ))}
              </div>
            ) : (
              <InputComponent
                key={`${keyId}_input_${value}`}
                value={value as string | number}
                placeholder={value as string | number}
                onChange={(newValue) => {
                  // handleInputChange({ key, newValue });
                }}
              />
            )
          ) : Array.isArray(value) ? (
            value.map((item, index) => (
              <React.Fragment key={index}>
                {item}
                {index < value.length - 1 && <br />}
              </React.Fragment>
            ))
          ) : (
            value
          );

        default:
          return params.isEditTable ? (
            <InputComponent
              key={`${keyId}_input_${key}_${value}`}
              value={value as string | number}
              placeholder={value as string | number}
              //@ts-ignore
              onChange={
                (newValue) => {}
                //@ts-ignore
                // handleInputChange({ key: key, newValue: newValue })
              }
              //! NOTE: Đặt w-full cho ô input Mô tả
              isDescription={key === "Mô tả"}
              isInTable
            />
          ) : (
            value
          );
      }
    };

    const renderCell = ({
      key,
      value,
      keyId,
      params,
    }: {
      key: string;
      value: string | number | Array<string | number>;
      keyId: string | number;
      params: any;
    }) => {
      if (key === "Mã nhóm") return null;

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
          // !: NOTE: Giới hạn ô mô tả không quá dài bằng !w-[800px] line-clamp-6
          className={`border-r-[1px] px-2 py-4 normal-case text-left min-h-[64px] ${
            key === "Mô tả"
              ? "!w-[800px] line-clamp-6 flex items-center"
              : "whitespace-nowrap"
          }`}
        >
          {renderCellValue({ key, value, keyId, params })}
        </Table.Cell>
      );
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        onClick={() => {}}
        className={`bg-background-secondary  text-left 
          hover:bg-light-800 cursor-default
         duration-100`}
      >
        {/* checkbox */}
        <Table.Cell className="w-10 border-r-[1px] z-100 ">
          <div
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện lan truyền đến Table.RowApproveTopicTable
            }}
          >
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
          </div>
        </Table.Cell>

        {/* STT - Là STT của nhóm */}
        <Table.Cell className="w-10 border-r-[1px]  text-left">
          <span>{params.dataItem.data["Mã nhóm"]}</span>
        </Table.Cell>

        {/* Các giá trị khác */}
        {Object.entries(params.dataItem.data).map(([key, value]) => {
          const keyId = params.dataItem.data["Mã nhóm"];
          return renderCell({
            key,
            value,
            keyId,
            params,
          });
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    // Kiểm tra nếu `dataItem` của RowApproveTopicTable không thay đổi thì không cần re-render
    return prevProps.dataItem === nextProps.dataItem;
  }
);

export default RowApproveTopicTable;
