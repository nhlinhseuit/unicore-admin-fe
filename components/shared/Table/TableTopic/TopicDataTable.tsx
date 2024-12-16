import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Dropdown, Table } from "flowbite-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TopicDataItem } from "@/types";
import { itemsPerPageTopicTable } from "@/constants";
import { tableTheme } from "../components/DataTable";
import MyFooter from "../components/MyFooter";
import RowTopicDataTable from "./RowTopicDataTable";
import TableSearch from "../../Search/TableSearch";
import IconButton from "../../Button/IconButton";
import AlertCreateNewTopic from "@/app/(root)/courses/[courseId]/(courseRelated)/upload-topic/(UploadTopicResult)/AlertCreateNewTopic";
import ImportListTopic from "@/app/(root)/courses/[courseId]/(courseRelated)/upload-topic/(UploadTopicResult)/ImportListTopic";
import useSetDebounceSearchTerm from "@/hooks/table/useSetDebounceSearchTerm";
import useDebounceSearchDataTable from "@/hooks/table/useDebounceSearchDataTable";
import NoResult from "../../Status/NoResult";

interface DataTableParams {
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: TopicDataItem[];

  onClickEditTable?: () => void;
  onSaveEditTable?: (localDataTable: any) => void;
  onClickMultipleDelete?: () => void;
  onClickDelete?: (itemsSelected: string[]) => void;
  onClickDeleteAll?: () => void;
  onClickGetOut?: () => void;
}

const TopicDataTable: React.FC<DataTableParams> = (params) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [itemsSelected, setItemsSelected] = useState<string[]>([]);

  const [isShowDeleteInfo, setIsShowDeleteInfo] = useState(false);
  useEffect(() => {
    if (itemsSelected.length > 0 || params.isMultipleDelete) {
      if (!isShowDeleteInfo) setIsShowDeleteInfo(true);
    } else {
      if (isShowDeleteInfo) setIsShowDeleteInfo(false);
    }
  }, [itemsSelected, params.isMultipleDelete]);

  const [isImport, setIsImport] = useState(false);
  const handleSetImport = (value: boolean) => {
    setIsImport(value);
  };
  const [isCreateNew, setIsCreateNew] = useState(false);
  const handleSetCreateNew = (value: boolean) => {
    setIsCreateNew(value);
  };
  const [isShowDialog, setIsShowDialog] = useState(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = dataTable.length;

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageTopicTable,
      currentPage * itemsPerPageTopicTable
    );
  }, [dataTable, currentPage]);

  const localDataTableRef = useRef(currentItems);
  const updateLocalDataTableRef = (newValue: any) => {
    localDataTableRef.current = newValue;
  };

  //TODO: SEARCH
  const applyFilter = () => {
    setFilteredDataTable(currentItems);
  };

  useEffect(() => {
    applyFilter();
  }, [currentItems]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredDataTable, setFilteredDataTable] = useState(currentItems);

  useSetDebounceSearchTerm(setDebouncedSearchTerm, searchTerm);
  useDebounceSearchDataTable(
    debouncedSearchTerm,
    setFilteredDataTable,
    applyFilter,
    () => {},
    () => {},
    dataTable,
    currentItems
  );

  // useEffect(() => {
  //   updateLocalDataTableRef([...filteredDataTable]);
  // }, [filteredDataTable]); // Chạy mỗi khi filteredDataTable thay đổi

  const saveDataTable = () => {
    const updatedDataTable = dataTable.map((item) => {
      // Tìm item tương ứng trong localDataTable dựa vào STT (hoặc một identifier khác)
      const localItem = localDataTableRef.current.find(
        (local) => local.STT === item.STT
      );

      // * Nếu tìm thấy, cập nhật giá trị bằng localItem, ngược lại giữ nguyên item
      // * Trải item và localitem ra, nếu trùng nhau thì localItem ghi đè
      return localItem ? { ...item, ...localItem } : item;
    });

    if (params.onSaveEditTable) {
      params.onSaveEditTable(updatedDataTable);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0">
        {/* ACTION VỚI TABLE */}
        <div className="w-full mr-3 md:w-1/3">
          {params.isEditTable || params.isMultipleDelete ? (
            <></>
          ) : (
            <TableSearch
              setSearchTerm={(value) => setSearchTerm(value)}
              searchTerm={searchTerm}
            />
          )}
        </div>
        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center">
          <div className="flex items-center w-full gap-2 md:w-auto">
            {params.isEditTable || isShowDeleteInfo ? (
              <></>
            ) : (
              <>
                <IconButton
                  text="Import danh sách đề tài mới"
                  onClick={() => {
                    setIsImport(true);
                  }}
                  iconLeft={"/assets/icons/upload-white.svg"}
                  iconWidth={16}
                  iconHeight={16}
                />

                <IconButton
                  text="Đăng đề tài mới"
                  green
                  onClick={() => {
                    setIsCreateNew(true);
                  }}
                  iconLeft={"/assets/icons/add.svg"}
                  iconWidth={16}
                  iconHeight={16}
                />
              </>
            )}

            {params.isEditTable ? (
              <IconButton text="Lưu" onClick={saveDataTable} />
            ) : isShowDeleteInfo ? (
              <>
                <p className="text-sm font-medium">
                  Đã chọn:
                  <span className="font-semibold">
                    {` ${itemsSelected.length}`}
                  </span>
                </p>
                <IconButton
                  text="Xóa"
                  onClick={() => {
                    setIsShowDialog(1);
                  }}
                  bgColor="bg-red"
                />
                <IconButton
                  text="Thoát"
                  onClick={() => {
                    setItemsSelected([]);
                    params.onClickGetOut && params.onClickGetOut();
                  }}
                  bgColor="bg-gray-500"
                />
              </>
            ) : (
              <Dropdown
                className="z-30 rounded-lg"
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <div>
                    <IconButton
                      text="Hành động"
                      onClick={() => {}}
                      iconRight={"/assets/icons/chevron-down.svg"}
                      bgColor="bg-white"
                      textColor="text-black"
                      border
                    />
                  </div>
                )}
              >
                <Dropdown.Item onClick={params.onClickEditTable}>
                  Chỉnh sửa
                </Dropdown.Item>

                <Dropdown.Item onClick={params.onClickMultipleDelete}>
                  Xóa nhiều
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    setIsShowDialog(2);
                  }}
                >
                  Xóa tất cả
                </Dropdown.Item>
              </Dropdown>
            )}
          </div>
        </div>
      </div>

      {!isImport ? (
        <>
          {currentItems.length > 0 && filteredDataTable.length === 0 ? (
            <NoResult
              title="Không có dữ liệu!"
              description="💡 Bạn hãy thử tìm kiếm 1 từ khóa khác nhé."
            />
          ) : (
            <>
              {/* TABLE */}
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
                    ></Table.HeadCell>
                    <Table.HeadCell
                      theme={tableTheme?.head?.cell}
                      className={` w-10 border-r-[1px] uppercase`}
                    >
                      STT
                    </Table.HeadCell>

                    {Object.keys(filteredDataTable[0]?.data || {}).map(
                      (key, index) => {
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
                    {filteredDataTable.map((dataItem, index) => {
                      var valueUniqueInput = dataItem.STT;

                      return dataItem.isDeleted ? (
                        <></>
                      ) : (
                        <RowTopicDataTable
                          key={dataItem.STT}
                          dataItem={dataItem}
                          valueUniqueInput={valueUniqueInput.toString()}
                          itemsSelected={itemsSelected}
                          isEditTable={params.isEditTable}
                          isMultipleDelete={params.isMultipleDelete}
                          onClickCheckBoxSelect={(item: string) => {
                            console.log("item", item);
                            setItemsSelected((prev) => {
                              if (prev.includes(item)) {
                                return prev.filter((i) => i !== item);
                              } else {
                                return [...prev, item];
                              }
                            });
                          }}
                          onChangeRow={(updatedDataItem: any) => {
                            updateLocalDataTableRef(
                              localDataTableRef.current.map((item) =>
                                item.STT === updatedDataItem.STT
                                  ? updatedDataItem
                                  : item
                              )
                            );
                          }}
                        />
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </>
          )}

          {/* FOOTER */}
          {searchTerm !== "" ||
          params.isEditTable ||
          params.isMultipleDelete ? (
            <></>
          ) : (
            <MyFooter
              currentPage={currentPage}
              itemsPerPage={itemsPerPageTopicTable}
              totalItems={totalItems}
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
          )}

          {/* ALERT CONFIRM */}
          {isShowDialog !== -1 ? (
            <AlertDialog open={isShowDialog !== -1}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Bạn có chắc chắn muốn xóa?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Thao tác này không thể hoàn tác, dữ liệu của bạn sẽ bị xóa
                    vĩnh viễn và không thể khôi phục.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setIsShowDialog(-1);
                      setItemsSelected([]);
                      params.onClickGetOut && params.onClickGetOut();
                    }}
                  >
                    Hủy
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setItemsSelected([]);
                      params.onClickGetOut && params.onClickGetOut();
                      if (isShowDialog === 1) {
                        params.onClickDelete &&
                          params.onClickDelete(itemsSelected);
                      } else if (isShowDialog === 2) {
                        params.onClickDeleteAll && params.onClickDeleteAll();
                      }
                      setIsShowDialog(-1);
                    }}
                    className="bg-primary-500 hover:bg-primary-500/90"
                  >
                    Đồng ý
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <></>
          )}
        </>
      ) : (
        <ImportListTopic handleSetImport={handleSetImport} />
      )}

      <AlertCreateNewTopic
        isCreateNew={isCreateNew}
        handleSetCreateNew={handleSetCreateNew}
      />
    </div>
  );
};

export default TopicDataTable;
