import { RegisterGroupDataItem, RegisterTopicDataItem } from "@/types";
import { Table } from "flowbite-react";
import { useMemo, useState } from "react";
import NoResult from "../../Status/NoResult";
import { tableTheme } from "../components/DataTable";
import RowRegisterTopicTable from "./RowRegisterTopicTable";

import { RegisterTopicTableType, itemsPerPageRegisterTable } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { mockTeacherGradingList } from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import IconButton from "../../Button/IconButton";
import TableSearch from "../../Search/TableSearch";
import MyFooter from "../components/MyFooter";

interface DataTableParams {
  type: RegisterTopicTableType;
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: RegisterTopicDataItem[];
}

const RegisterTopicTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  const [selectedTeacherGrading, setSelectedTeacherGrading] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [isShowFooter, setIsShowFooter] = useState(true);
  const totalItems = dataTable.length;

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageRegisterTable,
      currentPage * itemsPerPageRegisterTable
    );
  }, [dataTable, currentPage]);

  const [filteredDataTable, setFilteredDataTable] =
    useState<RegisterGroupDataItem[]>(currentItems);

  return (
    <div>
      {/* TABLE */}
      {currentItems.length > 0 && filteredDataTable.length === 0 ? (
        <NoResult
          title="Không có dữ liệu!"
          description="💡 Bạn hãy thử tìm kiếm 1 từ khóa khác nhé."
        />
      ) : (
        <>
          {params.type === RegisterTopicTableType.approveTopic ? (
            <div className="flex justify-between items-center mb-3 gap-2">
              <div className="flex gap-2 items-center">
                <p className="inline-flex justify-start text-sm whitespace-nowrap">
                  Chọn giảng viên
                </p>
                <Dropdown
                  className="min-w-max z-30 rounded-lg"
                  label=""
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <div>
                      <IconButton
                        text={`${
                          mockTeacherGradingList[selectedTeacherGrading - 1]
                            .value
                        }`}
                        onClick={() => {}}
                        iconRight={"/assets/icons/chevron-down.svg"}
                        bgColor="bg-white"
                        textColor="text-black"
                        border
                      />
                    </div>
                  )}
                >
                  <TableSearch
                    setSearchTerm={() => {}}
                    searchTerm=""
                    otherClasses="p-2"
                  />
                  <div className="w-full scroll-container scroll-container-dropdown-content">
                    {mockTeacherGradingList.map((teacher, index) => (
                      <Dropdown.Item
                        key={`${teacher.id}_${index}`}
                        onClick={() => {
                          if (selectedTeacherGrading === teacher.id) {
                            setSelectedTeacherGrading(1);
                          } else {
                            setSelectedTeacherGrading(teacher.id);
                          }
                        }}
                        className="min-w-max"
                      >
                        <div className="flex justify-between w-full">
                          <p className="w-[80%] text-left line-clamp-1">
                            {teacher.value}
                          </p>
                          {selectedTeacherGrading === teacher.id ? (
                            <Image
                              src="/assets/icons/check.svg"
                              alt="search"
                              width={21}
                              height={21}
                              className="cursor-pointer mr-2"
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </Dropdown.Item>
                    ))}
                  </div>
                </Dropdown>
              </div>

              <div className="flex items-center mb-3 gap-2">
                <p className="text-sm font-medium">
                  Đã chọn:
                  <span className="font-semibold">
                    {` ${itemsSelected.length}`}
                  </span>
                </p>
                <IconButton
                  text="Chỉ định giảng viên"
                  green
                  onClick={() => {
                    if (itemsSelected.length === 0) {
                      toast({
                        title: "Vui lòng chọn đề tài!",
                        variant: "error",
                        duration: 3000,
                      });
                      return;
                    }
                    toast({
                      title: "Chỉ định giảng viên duyệt đề tài thành công.",
                      description: `Đề tài ${itemsSelected.join(
                        ", "
                      )} sẽ dược duyệt bởi ${
                        mockTeacherGradingList[selectedTeacherGrading - 1].value
                      }.`,
                      variant: "success",
                      duration: 3000,
                    });
                    setItemsSelected([]);
                  }}
                  iconWidth={16}
                  iconHeight={16}
                />
              </div>
            </div>
          ) : null}

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
                  className={`border-r-[1px] uppercase`}
                ></Table.HeadCell>

                <Table.HeadCell
                  theme={tableTheme?.head?.cell}
                  className={` w-10 border-r-[1px] uppercase`}
                >
                  STT
                </Table.HeadCell>

                {Object.keys(filteredDataTable[0]?.data || {}).map((key) => {
                  if (key === "Mã nhóm") return null;

                  return (
                    <Table.HeadCell
                      key={key}
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
                {filteredDataTable.map((dataItem, index) =>
                  dataItem.isDeleted ? (
                    <></>
                  ) : (
                    <>
                      {/* //TODO: Main Row: Leader */}
                      <RowRegisterTopicTable
                        type={params.type}
                        key={dataItem.STT}
                        isMemberOfAboveGroup={
                          index === 0
                            ? false
                            : filteredDataTable[index - 1].data["Mã nhóm"] ===
                              dataItem.data["Mã nhóm"]
                        }
                        dataItem={dataItem}
                        isEditTable={params.isEditTable}
                        isMultipleDelete={params.isMultipleDelete}
                        onClickCheckBoxSelect={(item: string) => {
                          setItemsSelected((prev) => {
                            if (prev.includes(item)) {
                              return prev.filter((i) => i !== item);
                            } else {
                              return [...prev, item];
                            }
                          });
                        }}
                        onChangeRow={(updatedDataItem: any) => {
                          //   setLocalDataTable((prevTable) =>
                          //     prevTable.map((item) =>
                          //       item.STT === updatedDataItem.STT
                          //         ? updatedDataItem
                          //         : item
                          //     )
                          //   );
                        }}
                        saveSingleRow={(updatedDataItem: any) => {
                          const updatedDataTable = dataTable.map(
                            (item, index) =>
                              item.STT === updatedDataItem.STT
                                ? updatedDataItem
                                : item
                          );

                          //   if (params.onSaveEditTable) {
                          //     params.onSaveEditTable(updatedDataTable);
                          //   }
                        }}
                        onClickGetOut={() => {
                          // params.onClickGetOut
                        }}
                        deleteSingleRow={() => {
                          //  params.onClickDelete
                        }}
                      />
                    </>
                  )
                )}
              </Table.Body>
            </Table>
          </div>
        </>
      )}

      {/* FOOTER */}
      {!isShowFooter || params.isEditTable || params.isMultipleDelete ? (
        <></>
      ) : (
        <MyFooter
          currentPage={currentPage}
          itemsPerPage={itemsPerPageRegisterTable}
          totalItems={totalItems}
          onPageChange={(newPage) => setCurrentPage(newPage)} //HERE
        />
      )}
    </div>
  );
};

export default RegisterTopicTable;
