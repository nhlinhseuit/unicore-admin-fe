"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CourseItemMoreComponentItems } from "@/constants";
import Image from "next/image";
import { useState } from "react";

interface MoreButtonParams {
  handleEdit: () => void;
  onClickGetOut?: () => void;
  onClickDelete?: () => void;
}

const MoreButtonCourseItem = (params: MoreButtonParams) => {
  const [isShowDialog, setIsShowDialog] = useState(false);

  return (
    <>
      <Menubar className="relative bg-transparent border-none shadow-none z-100">
        <MenubarMenu>
          <MenubarTrigger
            className="w-10 h-10 "
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Image
              src="/assets/icons/more.svg"
              alt="edit"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </MenubarTrigger>

          <MenubarContent
            className="
          -translate-y-2
          absolute right-[-3rem] mt-0 min-w-[120px] rounded border py-2 bg-white  
          dark:border-dark-400 dark:bg-dark-300"
          >
            {CourseItemMoreComponentItems.map((item) => (
              <MenubarItem
                className="
                      flex items-center gap-4 px-2.5 py-2 hover:bg-light-800
                      dark:focus:bg-dark-400 cursor-pointer"
                key={item.value}
                onClick={
                  item.value === "edit"
                    ? params.handleEdit
                    : item.value === "delete"
                    ? () => {
                        setIsShowDialog(true);
                      }
                    : undefined
                }
              >
                <p className="text-black  body-medium">{item.label}</p>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {isShowDialog ? (
        <AlertDialog open={isShowDialog}>
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
                  setIsShowDialog(false);
                  params.onClickGetOut && params.onClickGetOut();
                }}
              >
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setIsShowDialog(false);
                  params.onClickDelete && params.onClickDelete();
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
  );
};

export default MoreButtonCourseItem;
