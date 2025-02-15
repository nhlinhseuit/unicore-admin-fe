import {
  CentralizedExamDataItem,
  QAandProjectExamDataItem,
  StudentData,
  StudentDataItem,
} from "@/types";
import { Dropdown, Table } from "flowbite-react";
import Image from "next/image";
import { SubjectData, SubjectDataItem } from "@/types/entity/Subject";
import { TeacherData, TeacherDataItem } from "@/types/entity/Teacher";
import { OfficerData, OfficerDataItem } from "@/types/entity/Officer";
import { CourseData, CourseDataItem } from "@/types/entity/Course";
import React, { useRef, useState } from "react";
import InputComponent from "./InputComponent";

interface RowParams {
  isFetchTable?: boolean;
  dataItem:
    | CourseDataItem
    | SubjectDataItem
    | StudentDataItem
    | OfficerDataItem
    | CentralizedExamDataItem
    | QAandProjectExamDataItem
    | TeacherDataItem;
  itemsSelected: string[];
  valueUniqueInput: string;
  isSimpleTable?: boolean;
  isEditTable?: boolean;
  isMultipleDelete?: boolean;
  isHasSubCourses?: boolean;
  onClickCheckBoxSelect?: (item: string) => void;
  onChangeRow?: (item: any) => void;
}

interface handleInputChangeParams {
  key:
    | keyof CourseData
    | keyof SubjectData
    | keyof StudentData
    | keyof OfficerData
    | keyof TeacherData;
  newValue: any;
  isMultipleInput?: boolean;
  currentIndex?: number;
  isCheckbox?: boolean;
}

const Row = React.memo(
  (params: RowParams) => {
    const [isChecked, setIsChecked] = useState(
      //@ts-ignore
      params.dataItem.data["Khoa quản lý"] as boolean
    );

    const refInput = useRef(params.dataItem);

    const handleInputChange = ({
      key,
      newValue,
      isMultipleInput,
      currentIndex,
      isCheckbox,
    }: handleInputChangeParams) => {
      //@ts-ignore
      const updatedDataItem:
        | CourseDataItem
        | SubjectDataItem
        | StudentDataItem
        | CentralizedExamDataItem
        | QAandProjectExamDataItem
        | TeacherDataItem
        | OfficerDataItem = {
        ...refInput.current,
        data: {
          ...refInput.current.data,
          [key]: isMultipleInput
            ? //@ts-ignore
              (refInput.current.data[key] as string[]).map((line, index) =>
                index === currentIndex ? newValue : line
              )
            : newValue,
        },
      };

      refInput.current = updatedDataItem;

      params.onChangeRow && params.onChangeRow(updatedDataItem); // Gọi callback để truyền dữ liệu đã chỉnh sửa lên DataTable
    };

    const renderTableCell = ({
      key,
      value,
      keyId,
      isChecked,
      setIsChecked,
      handleInputChange,
      isHasSubCourses,
    }: {
      key: string;
      value: string | number;
      keyId: string;
      isChecked: boolean;
      setIsChecked: (checked: boolean) => void;
      handleInputChange: Function;
      isHasSubCourses: boolean | undefined;
    }) => {
      const shouldRenderInput =
        params.isEditTable &&
        !(
          params.isFetchTable &&
          (key === "Email" ||
            key === "Tài khoản" ||
            key === "Mật khẩu" ||
            key === "MSSV" ||
            key === "Mã cán bộ" ||
            key === "Mã giáo vụ" ||
            key === "Mã MH")
        );

      switch (key) {
        case "Mã lớp":
          return params.isEditTable ? (
            <InputComponent
              key={`${keyId}_input_${key}_${value}`}
              value={value as string | number}
              placeholder={value as string | number}
              onChange={(newValue) => handleInputChange({ key, newValue })}
            />
          ) : (
            //  : isHasSubCourses ? (
            //   <div className="flex">
            //     <span>{value}</span>
            //     <Dropdown
            //       className="z-30 rounded-lg"
            //       label=""
            //       renderTrigger={() => (
            //         <Image
            //           src="/assets/icons/info.svg"
            //           alt="search"
            //           width={21}
            //           height={21}
            //           className="ml-2 mr-4 cursor-pointer"
            //         />
            //       )}
            //     >
            //       <div className="scroll-container scroll-container-dropdown-content">
            //         <ul>
            //           {[
            //             "Huỳnh Hồ Thị Mộng Trinh",
            //             "Nguyễn Trịnh Đông",
            //             "Huỳnh Tuấn Anh",
            //           ].map((name) => (
            //             <li role="menuitem" key={name}>
            //               <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
            //                 Đồ án 1 - {name}
            //               </p>
            //             </li>
            //           ))}
            //         </ul>
            //       </div>
            //     </Dropdown>
            //   </div>
            // )
            <span>{value}</span>
          );

        case "Khoa quản lý":
          return params.isEditTable ? (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                handleInputChange({
                  key,
                  newValue: e.target.checked,
                  isCheckbox: true,
                });
              }}
              className="w-4 h-4 cursor-pointer"
            />
          ) : (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => {}}
              className="w-4 h-4 cursor-pointer"
            />
          );

        default:
          return shouldRenderInput ? (
            Array.isArray(value) ? (
              <div className="flex flex-col gap-1">
                {value.length === 0 ? ( // Trường hợp mảng rỗng
                  <InputComponent
                    key={`${keyId}_empty`}
                    value=""
                    placeholder="Enter value"
                    onChange={(newValue) => handleInputChange({ key, newValue })}

                  />
                ) : (
                  value.map((line, index) => (
                    <InputComponent
                      key={`${keyId}_${line}_${index}`}
                      value={line || ""}
                      placeholder={line || "Enter value"} // Hiển thị placeholder nếu dòng trống
                      onChange={(newValue) =>
                        handleInputChange({
                          key,
                          newValue,
                          isMultipleInput: true,
                          currentIndex: index,
                        })
                      }
                    />
                  ))
                )}
              </div>
            ) : (
              <InputComponent
                key={`${keyId}_input_${key}_${value}`}
                value={value || ""}
                placeholder={value || "Enter value"} // Hiển thị placeholder nếu giá trị trống
                onChange={(newValue) => handleInputChange({ key, newValue })}
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
      }
    };

    return (
      <Table.Row
        key={params.dataItem.STT}
        className={`bg-background-secondary text-left ${
          params.isEditTable
            ? "hover:bg-white cursor-default"
            : "hover:bg-light-800 cursor-default"
        } duration-100`}
      >
        {!params.isSimpleTable && (
          <Table.Cell className="w-10 border-r-[1px] z-100">
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-10 h-10"
            >
              <input
                type="checkbox"
                name="filterOptions"
                value={params.valueUniqueInput}
                checked={params.itemsSelected.includes(params.valueUniqueInput)}
                onChange={() => {
                  params.onClickCheckBoxSelect &&
                    params.onClickCheckBoxSelect(params.valueUniqueInput);
                }}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded cursor-pointer text-primary-600"
              />
            </div>
          </Table.Cell>
        )}

        <Table.Cell className="w-10 border-r-[1px] text-left">
          <span>{params.dataItem.STT}</span>
        </Table.Cell>

        {Object.entries(params.dataItem.data).map(([key, value]) => {
          let keyId: any;
          let data;

          switch (params.dataItem.type) {
            case "course":
              data = params.dataItem as CourseDataItem;
              keyId = data.data["Mã lớp"];

              break;
            case "subject":
              data = params.dataItem as SubjectDataItem;
              keyId = data.data["Mã MH"];

              break;
            case "student":
              data = params.dataItem as StudentDataItem;
              keyId = data.data["MSSV"];

              break;
            case "teacher":
              data = params.dataItem as TeacherDataItem;
              keyId = data.data["Mã cán bộ"];

              break;
          }

          return (
            <Table.Cell
              key={`${keyId}_${key}_${value}`}
              className={`border-r-[1px] px-2 py-4 normal-case whitespace-nowrap text-left ${
                key === "Khoa quản lý" ? "text-center" : ""
              }`}
            >
              {renderTableCell({
                key,
                value,
                keyId,
                isChecked,
                setIsChecked,
                handleInputChange,
                isHasSubCourses: params.isHasSubCourses,
              })}
            </Table.Cell>
          );
        })}
      </Table.Row>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.itemsSelected === nextProps.itemsSelected &&
      prevProps.dataItem === nextProps.dataItem &&
      prevProps.isEditTable === nextProps.isEditTable &&
      prevProps.isMultipleDelete === nextProps.isMultipleDelete
    );
  }
);

export default Row;
