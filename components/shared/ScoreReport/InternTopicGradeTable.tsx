import { InternReviewDataItem } from "@/types";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import IconButton from "../Button/IconButton";
import { tableTheme } from "../Table/components/DataTable";
import InputComponent from "../Table/components/InputComponent";

interface DataTableParams {
  isEditTable: boolean;
  dataTable: InternReviewDataItem[];
  handleEditTable: () => void;
  handleSaveTable: (updatedData: any) => void;
}

const InternTopicGradeTable = (params: DataTableParams) => {
  const [updatedData, setUpdatedData] = useState<Record<string, any>>({});

  const handleInputChange = ({
    key,
    newValue,
    keyId,
    currentIndex,
  }: {
    key: string; // Always "Điểm" for scores
    newValue: string | number; // New score value
    keyId: string | number; // MSSV
    currentIndex: number; // Index of the score being updated (0, 1, or 2)
  }) => {
    setUpdatedData((prev) => {
      const newState = { ...prev };

      // Ensure the record for the student exists
      if (!newState[keyId]) {
        newState[keyId] = {
          MSSV: keyId,
          Điểm: [
            ...(params.dataTable.find((item) => item.data.MSSV === keyId)?.data[
              "Điểm"
            ] || ["", "", ""]),
          ],
        };
      }

      // Update the specific score
      newState[keyId]["Điểm"][currentIndex] = newValue;

      return newState;
    });
  };

  const handleSave = () => {
    //! POST DATA
    console.log("Updated Data:", updatedData);

    params.handleSaveTable(updatedData);
  };

  const handleEdit = () => {
    params.handleEditTable();
  };

  const renderCellValue = ({
    key,
    value,
    keyId,
  }: {
    key: string;
    value: string | number | Array<string | number>;
    keyId: string | number;
  }) => {
    switch (key) {
      case "Giảng viên chấm điểm":
        return Array.isArray(value)
          ? value.map((item, index) => (
              <React.Fragment key={index}>
                {item}
                {index < value.length - 1 && <br />}
              </React.Fragment>
            ))
          : value;
      case "Điểm":
        return Array.isArray(value) ? (
          params.isEditTable ? (
            <div className="flex flex-col gap-1">
              {value.map((item, index) => (
                <InputComponent
                  key={`${keyId}_${item}_${index}`}
                  value={item}
                  placeholder={item as string | number}
                  onChange={(newValue) => {
                    handleInputChange({
                      key: "Điểm",
                      newValue,
                      keyId,
                      currentIndex: index, // Index of the score in the array
                    });
                  }}
                  otherClassess="w-full"
                />
              ))}
            </div>
          ) : (
            value.map((item, index) => (
              <React.Fragment key={index}>
                {item}
                {index < value.length - 1 && <br />}
              </React.Fragment>
            ))
          )
        ) : null;

      default:
        return value;
    }
  };

  const renderCell = ({
    key,
    value,
    keyId,
  }: {
    key: string;
    value: string | number | Array<string | number>;
    keyId: string | number;
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
        className={`border-r-[1px] px-2 py-4 normal-case text-left min-h-[64px] 
          ${key === "Điểm" ? "text-center" : ""}`}
      >
        {renderCellValue({ key, value, keyId })}
      </Table.Cell>
    );
  };

  return (
    <>
      <div className="flex justify-end items-center mb-4 gap-4">
        {params.isEditTable ? (
          <IconButton text="Lưu" onClick={handleSave} />
        ) : (
          <IconButton text="Chỉnh sửa" onClick={handleEdit} />
        )}
      </div>

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

            {Object.keys(params.dataTable[0].data || {}).map((key, index) => {
              return (
                <Table.HeadCell
                  key={`${key}_${index}`}
                  theme={tableTheme?.head?.cell}
                  className={`px-2 py-4 border-r-[1px] uppercase whitespace-nowrap`}
                >
                  {key}
                </Table.HeadCell>
              );
            })}
          </Table.Head>

          {/* BODY */}
          <Table.Body className="text-left divide-y">
            {params.dataTable.map((dataItem, index) => (
              <Table.Row
                key={dataItem.STT}
                onClick={() => {}}
                className={`bg-background-secondary  text-left hover:bg-white cursor-default duration-100`}
              >
                {/* STT */}
                <Table.Cell className="w-10 border-r-[1px]  text-left">
                  <span>{dataItem.STT}</span>
                </Table.Cell>

                {Object.entries(dataItem.data).map(([key, value]) => {
                  const keyId = dataItem.data["MSSV"];

                  return renderCell({
                    key,
                    value,
                    keyId,
                  });
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default InternTopicGradeTable;
