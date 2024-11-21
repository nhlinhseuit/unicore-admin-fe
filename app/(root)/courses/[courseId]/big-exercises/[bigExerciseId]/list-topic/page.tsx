"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import MiniButton from "@/components/shared/Button/MiniButton";
import ErrorComponent from "@/components/shared/Status/ErrorComponent";
import NoResult from "@/components/shared/Status/NoResult";
import TableSkeleton from "@/components/shared/Table/components/TableSkeleton";
import TopicRegisterGroupDataTable from "@/components/shared/Table/TableRegisterStudent/TopicRegisterGroupDataTable";
import TopicGroupTable from "@/components/shared/Table/TableTopic/TopicDataTable";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { mockTopicDataTable, mockTopicRegisterGroupDataTable } from "@/mocks";
import { TopicDataItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import { z } from "zod";

const ListTopic = () => {
  // Tạo một reference để liên kết với thẻ input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const [mockDataState, setMockDataState] = useState(
    mockTopicRegisterGroupDataTable
  );
  const mockDataRef = useRef(mockDataState);
  const updateMockDataRef = (newData: any) => {
    mockDataRef.current = newData;
  };

  const [isImport, setIsImport] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [dataTable, setDataTable] = useState<TopicDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicsFileUpload = (e: any) => {
    setIsLoading(true);
    setErrorMessages([]);
    setDataTable([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Bỏ 1 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 1, // Chỉ số 1 đại diện cho hàng 2 (vì index bắt đầu từ 0)
        defval: "",
      });

      let errorMessages: string[] = [];

      const transformedData = parsedData.map((item: any, index: number) => {
        // Kiểm tra các trường quan trọng (required fields)
        const requiredFields = {
          "Tên đề tài": item["Tên đề tài"],
          "Mô tả": item["Mô tả"],
          "GV phụ trách": item["GV phụ trách"],
        };

        // Lặp qua các trường để kiểm tra nếu có giá trị undefined
        if (index === 0) {
          Object.entries(requiredFields).forEach(([fieldName, value]) => {
            if (value === undefined) {
              errorMessages.push(`Trường "${fieldName}" bị thiếu hoặc lỗi.`);
            }
          });
        }

        return {
          type: "topic",
          STT: item.STT,
          isDeleted: false,
          data: {
            "Tên đề tài": item["Tên đề tài"],
            "Mô tả": item["Mô tả"],
            "GV phụ trách": item["GV phụ trách"],
          },
        };
      });

      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        setDataTable(transformedData as []);
      }

      setIsLoading(false);
    };
  };

  const AnnoucementSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Tên đề tài phải chứa ít nhất 5 ký tự" })
      .max(130),
    description: z
      .string()
      .min(20, { message: "Nội dung đề tài phải chứa ít nhất 20 ký tự" }),
  });

  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: any) {
    try {
      console.log({
        title: values.title,
        description: values.description,
        data: mockDataRef,
      });

      setMockDataState(mockTopicRegisterGroupDataTable);

      // naviate to home page
      // router.push("/");

      toast({
        title: "Đăng đề tài mới thành công.",
        variant: "success",
        duration: 3000,
      });

      setIsCreateNew(false);
      reset({
        title: "",
        description: "",
      });
    } catch {
    } finally {
    }
  }

  return (
    <>
      {!isImport ? (
        <>
          <div className="flex justify-end mb-3 gap-2">
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
          </div>

          <p className="flex justify-end pb-6 italic text-sm text-red-500">
            * Hiện tại kh làm chức năng chỉnh sửa ở đây, cần sửa thì import lại
            danh sách
          </p>

          <TopicGroupTable
            isEditTable={false}
            isMultipleDelete={false}
            // @ts-ignore
            dataTable={mockTopicDataTable}
          />
        </>
      ) : (
        <>
          <BackToPrev
            text={"Quay lại danh sách đề tài"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />
          {errorMessages.length > 0 && (
            <div className="mb-6">
              {errorMessages.map((item, index) => (
                <ErrorComponent
                  key={`${item}_${index}`}
                  text={item}
                  onClickClose={() => {
                    setErrorMessages((prevErrors) =>
                      prevErrors.filter((_, i) => i !== index)
                    );
                  }}
                />
              ))}
            </div>
          )}

          <div className="mb-6">
            <div className="flex mb-2">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleTopicsFileUpload}
                  style={{ display: "none" }}
                />

                <IconButton
                  text="Import danh sách đề tài"
                  onClick={handleButtonClick}
                  iconLeft={"/assets/icons/upload-white.svg"}
                  iconWidth={16}
                  iconHeight={16}
                />
              </div>
              {dataTable.length > 0 && (
                <IconButton text="Lưu" onClick={() => {}} otherClasses="ml-2" />
              )}
            </div>

            <a
              href="/assets/KTLN - template import ds đề tài.xlsx"
              download
              className=" text-blue-500 underline text-base italic"
            >
              Tải xuống template file import danh sách đề tài
            </a>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : dataTable.length > 0 ? (
            <TopicGroupTable
              isEditTable={false}
              isMultipleDelete={false}
              dataTable={dataTable}
            />
          ) : (
            <NoResult
              title="Không có dữ liệu!"
              description="🚀 Import file danh sách để thấy được dữ liệu."
              linkTitle="Import danh sách đề tài"
              handleFileUpload={handleTopicsFileUpload}
            />
          )}
        </>
      )}

      <AlertDialog open={isCreateNew}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Đăng đề tài mới
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* NAME ANNOUCEMENT */}
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Tên đề tài <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Input
                          {...field}
                          placeholder="Nhập tên đề tài..."
                          className="
                                no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Mô tả đề tài <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <textarea
                          {...field}
                          placeholder="Nhập mô tả..."
                          className="
                          no-focus
                          paragraph-regular
                          background-light900_dark300
                          light-border-2
                          text-dark300_light700
                          min-h-[200px]
                          rounded-md
                          border
                          resize-none
                          w-full
                          px-3
                          py-4
                          focus:outline-none
                          focus:ring-0
                          active:outline-none
                          focus:border-inherit
                          text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <>
                  <div>
                    <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Danh sách nhóm (nếu đã có nhóm liên hệ trước)
                    </label>
                    <p className="mb-4  text-[0.8rem] dark:text-slate-400 mt-2.5 body-regular text-light-500">
                      Nhóm trưởng điền tên đầu tiên.
                    </p>
                  </div>

                  <TopicRegisterGroupDataTable
                    isEditTable={false}
                    isMultipleDelete={false}
                    dataTable={mockDataRef.current}
                    onChangeTable={(newValue) => {
                      updateMockDataRef(newValue);
                    }}
                  />
                </>
              </div>

              <div className="relative flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                {/* mt-4 cho nên translate 7 */}
                <div className="absolute left-[50%] -translate-y-7">
                  <MiniButton
                    key={1}
                    value={2}
                    icon={"/assets/icons/add.svg"}
                    bgColor="bg-primary-500"
                    onClick={(value) => {
                      // setSelectedMiniButton(value);

                      const newEntry = {
                        STT: (mockDataRef.current.length + 1).toString(),
                        data: {
                          MSSV: "",
                          SĐT: "",
                          "Họ và tên": "",
                        },
                      };

                      // Cập nhật mockDataRef mà không re-render `TopicRegisterGroupDataTable`
                      updateMockDataRef([...mockDataRef.current, newEntry]);

                      // Cập nhật mockDataState để re-render những phần khác trong UI
                      setMockDataState([...mockDataRef.current]);
                    }}
                    otherClasses={"w-[26px] h-[26px] mr-10"}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCreateNew(false);
                    setMockDataState(mockTopicRegisterGroupDataTable);
                  }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 px-4 py-2 mt-2 sm:mt-0"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-primary-500 text-slate-50 shadow hover:bg-primary-500/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2"
                >
                  Đồng ý
                </button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ListTopic;
