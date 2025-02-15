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
import { Table } from "flowbite-react";
import { useEffect, useMemo, useRef, useState } from "react";

import NoResult from "@/components/shared/Status/NoResult";
import { tableTheme } from "@/components/shared/Table/components/DataTable";
import MyFooter from "@/components/shared/Table/components/MyFooter";
import { itemsPerPageRegisterTable } from "@/constants";
import { InternInfoItem } from "@/types/entity/Topic";
import RowInternInfoTable from "./RowInternInfoTable";

import IconButton from "@/components/shared/Button/IconButton";
import TableSearch from "@/components/shared/Search/TableSearch";
import { Dropdown } from "flowbite-react";

interface DataTableParams {
  isAlreadyRegisteredGroup?: boolean;
  isEditTable: boolean;
  isMultipleDelete: boolean;
  dataTable: InternInfoItem[];

  onClickEditTable?: () => void;
  onSaveEditTable?: (localDataTable: any) => void;
  onClickMultipleDelete?: () => void;
  onClickDelete?: (itemsSelected: string[]) => void;
  onClickDeleteAll?: () => void;
  onClickGetOut?: () => void;
  onClickCancelEdit?: () => void;
}

const InternInfoTable = (params: DataTableParams) => {
  const dataTable = useMemo(() => {
    return params.dataTable.filter((dataItem) => dataItem.isDeleted !== true);
  }, [params.dataTable]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isShowFooter, setIsShowFooter] = useState(true);
  const totalItems = dataTable.length;

  const [isShowDialog, setIsShowDialog] = useState(-1);
  const [itemsSelected, setItemsSelected] = useState<string[]>([]);
  const [isShowDeleteInfo, setIsShowDeleteInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const currentItems = useMemo(() => {
    return dataTable.slice(
      (currentPage - 1) * itemsPerPageRegisterTable,
      currentPage * itemsPerPageRegisterTable
    );
  }, [dataTable, currentPage]);

  const localDataTableRef = useRef(currentItems);
  const updateLocalDataTableRef = (newValue: any) => {
    localDataTableRef.current = newValue;
  };

  useEffect(() => {
    if (itemsSelected.length > 0 || params.isMultipleDelete) {
      if (!isShowDeleteInfo) setIsShowDeleteInfo(true);
    } else {
      if (isShowDeleteInfo) setIsShowDeleteInfo(false);
    }
  }, [itemsSelected, params.isMultipleDelete]);

  const saveDataTable = () => {
    console.log("here");

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
      console.log("updatedDataTable", updatedDataTable);
      params.onSaveEditTable(updatedDataTable);
    }
  };

  console.log("intern table rerender 1", params.dataTable);
  console.log("intern table rerender 2", dataTable);

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
          {params.isEditTable ? (
            <div className="flex items-center gap-2">
              <IconButton text="Lưu" onClick={saveDataTable} />
              <IconButton
                bgColor="bg-gray-500"
                text="Hủy"
                onClick={() => {
                  params.onClickCancelEdit && params.onClickCancelEdit();
                }}
              />
            </div>
          ) : isShowDeleteInfo ? (
            <div className="flex items-center gap-2">
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
            </div>
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

      {/* TABLE */}
      {currentItems.length === 0 ? (
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
              ></Table.HeadCell>
              <Table.HeadCell
                theme={tableTheme?.head?.cell}
                className={` w-10 border-r-[1px] uppercase`}
              >
                STT
              </Table.HeadCell>
              {Object.keys(currentItems[0]?.data || {}).map((key) => {
                if (key === "Mã nhóm" || key === "Mã đề tài") return null;

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
              {currentItems.map((dataItem, index) => {
                var valueUniqueInput = dataItem.STT;

                return dataItem.isDeleted ? (
                  <></>
                ) : (
                  <>
                    {/* //TODO: Main Row: Leader */}
                    <RowInternInfoTable
                      key={dataItem.STT}
                      dataItem={dataItem}
                      valueUniqueInput={valueUniqueInput.toString()}
                      itemsSelected={itemsSelected}
                      isAlreadyRegisteredGroup={params.isAlreadyRegisteredGroup}
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
                        console.log("updatedDataItem", updatedDataItem);

                        updateLocalDataTableRef(
                          localDataTableRef.current.map((item) =>
                            item.STT === updatedDataItem.STT
                              ? updatedDataItem
                              : item
                          )
                        );
                      }}
                      saveSingleRow={(updatedDataItem: any) => {
                        const updatedDataTable = dataTable.map((item, index) =>
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
                );
              })}
            </Table.Body>
          </Table>
        </div>
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

      {/* ALERT CONFIRM */}
      {isShowDialog !== -1 ? (
        <AlertDialog open={isShowDialog !== -1}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
              <AlertDialogDescription>
                Thao tác này không thể hoàn tác, dữ liệu của bạn sẽ bị xóa vĩnh
                viễn và không thể khôi phục.
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
                    params.onClickDelete && params.onClickDelete(itemsSelected);
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
    </div>
  );
};

export default InternInfoTable;
