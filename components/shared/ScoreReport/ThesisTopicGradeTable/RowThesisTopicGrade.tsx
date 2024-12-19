import { ThesisTopicGradeData, ThesisTopicGradeDataItem } from "@/types";
import { Table } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import InputComponent from "../../Table/components/InputComponent";

interface RowParams {
  valueUniqueInput: string;
  dataItem: ThesisTopicGradeDataItem;
  isEditTable?: boolean;
  isHasSubCourses?: boolean;
  onChangeRow?: (item: any) => void;
}
interface handleInputChangeParams {
  key: keyof ThesisTopicGradeData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const RowThesisTopicGrade = React.memo(
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
      const updatedDataItem: ThesisTopicGradeDataItem = {
        ...refInput.current,
        data: {
          ...refInput.current.data,
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

      refInput.current = updatedDataItem; //? ĐỂ UPATE ĐƯỢC NHIỀU FIELD TRÊN 1 HÀNG

      params.onChangeRow && params.onChangeRow(updatedDataItem); // Gọi callback để truyền dữ liệu đã chỉnh sửa lên DataTable
    };

    var valueUniqueInput = params.dataItem.data["Mã nhóm"];

    const renderCellStyle = (key: string) => {
      let style = "";

      if (key === "Mô tả") {
        style += "!w-[800px] line-clamp-6 flex items-center";
      } else if (
        key === "STT" ||
        key === "Phản biện" ||
        key === "Hướng dẫn" ||
        key === "Chủ tịch" ||
        key === "Điểm tổng" ||
        key === "Thư ký" ||
        key === "Ủy viên"
      ) {
        style += "text-center";
      } else {
        style += "whitespace-nowrap";
      }

      return style;
    };

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
        case "Phản biện":
        case "Hướng dẫn":
          return params.isEditTable ? (
            <div className="flex justify-center items-center gap-2">
              <span>{value}</span>
              <Link
                href={`/score-report/thesis-report/${keyId}/${
                  key === "Phản biện" ? "reviewer" : "supervisor"
                }`}
              >
                <Image
                  src={"/assets/icons/edit-black.svg"}
                  width={24}
                  height={24}
                  alt={"edit"}
                  className={`object-contain cursor-pointer -translate-y-[2px] `}
                />
              </Link>
            </div>
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

        case "Chủ tịch":
        case "Thư ký":
        case "Ủy viên":
          // case "Điểm tổng":
          return params.isEditTable ? (
            <InputComponent
              key={`${keyId}_input_${value}`}
              value={value as string | number}
              placeholder={value as string | number}
              onChange={(newValue) => {
                handleInputChange({ key, newValue });
              }}
              otherClassess="w-[100px]"
            />
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

        case "MSSV":
        case "Họ và tên":
          return Array.isArray(value)
            ? value.map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  {index < value.length - 1 && <br />}
                </React.Fragment>
              ))
            : value;

        default:
          return value;
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
          className={`border-r-[1px] px-2 py-4 normal-case text-left min-h-[64px] ${renderCellStyle(
            key
          )}`}
        >
          {renderCellValue({ key, value, keyId, params })}
        </Table.Cell>
      );
    };

    console.log("re-render Row");

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
        {/* STT - Là STT của nhóm */}
        <Table.Cell className="w-10 border-r-[1px] text-center">
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
    // Kiểm tra nếu `dataItem` của RowThesisTopicGrade không thay đổi thì không cần re-render
    return (
      prevProps.dataItem === nextProps.dataItem &&
      prevProps.isEditTable === nextProps.isEditTable
    );
  }
);

export default RowThesisTopicGrade;
