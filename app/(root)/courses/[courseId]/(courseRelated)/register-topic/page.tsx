"use client";

import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import RadioboxComponent from "@/components/shared/RadioboxComponent";
import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RegisterTopicTableType } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { mockDataStudentRegisterTopic } from "@/mocks";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import NoResult from "@/components/shared/Status/NoResult";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TopicDataItem } from "@/types/entity/Topic";

const RegisterTopic = () => {
  const router = useRouter();
  const isMainGroupExisted = false;

  const [isToggleCreateSchedule, setIsToggleCreateSchedule] = useState(true);
  const [isToggleViewTable, setIsToggleViewTable] = useState(true);
  const [isUseExistedGroup, setIsUseExistedGroup] = useState(2);

  const [minMember, setMinMember] = useState("");
  const [maxMember, setMaxMember] = useState("");
  const [selectedLeaderOption, setSelectedLeaderOption] = useState(false);

  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();

  const handleClickViewTable = () => {
    setIsToggleViewTable(!isToggleViewTable);
  };

  const handleClickCreateSchedule = () => {
    setIsToggleCreateSchedule(!isToggleCreateSchedule);
  };

  const handleChangeMinMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinMember(e.target.value);
  };

  const handleChangeMaxMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMember(e.target.value);
  };

  const [isAlreadyHasSchedule, setIsAlreadyHasSchedule] = useState(false);

  const AnnoucementSchema = z
    .object({
      date: z.string().optional(),
      groupOption: z.string().optional(),
    })
    .refine((data) => dateStart !== undefined && dateEnd !== undefined, {
      message: "Bạn phải chọn ngày bắt đầu và ngày kết thúc",
      path: ["date"],
    })

    .refine(
      (data) => {
        if (isMainGroupExisted) {
          return true;
        }
        return isUseExistedGroup === 2;
      },
      {
        message: "Không có nhóm chính, phải tạo nhóm mới",
        path: ["groupOption"],
      }
    )

    .refine(
      (data) =>
        isUseExistedGroup === 1 ||
        (!isNaN(parseInt(minMember)) &&
          minMember.trim() !== "" &&
          !isNaN(parseInt(maxMember)) &&
          maxMember.trim() !== ""),
      {
        message: "Số lượng thành viên phải là chữ số",
        path: ["groupOption"],
      }
    )
    .refine(
      (data) => {
        if (isUseExistedGroup === 1) return true;
        return parseInt(minMember) <= 10 && parseInt(maxMember) <= 10;
      },
      {
        message:
          "Số lượng thành viên phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 10",
        path: ["groupOption"],
      }
    )
    .refine(
      (data) =>
        isUseExistedGroup === 1 || parseInt(minMember) < parseInt(maxMember),
      {
        message:
          "Số lượng thành viên tối thiểu phải nhỏ hơn số lượng thành viên đối đa",
        path: ["groupOption"],
      }
    );

  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {},
  });

  async function onSubmit(values: any) {
    try {
      console.log({
        dateStart: dateStart,
        dateEnd: dateEnd,
      });

      toast({
        title: "Tạo lịch thành công.",
        description: `Đăng ký nhóm sẽ diễn ra vào ngày ${format(
          dateStart ?? "",
          "dd/MM/yyyy"
        )}`,
        variant: "success",
        duration: 3000,
      });
    } catch {
    } finally {
    }
  }

  //! TABLE
  const [isEditTable, setIsEditTable] = useState(false);
  const [isMultipleDelete, setIsMultipleDelete] = useState(false);
  const [dataTable, setDataTable] = useState<TopicDataItem[]>(
    mockDataStudentRegisterTopic
  );

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ToggleTitle
            text="Lịch đăng ký đề tài"
            isActive={isAlreadyHasSchedule}
            showStatus
            showEditButton={isAlreadyHasSchedule}
            handleClick={handleClickCreateSchedule}
            value={isToggleCreateSchedule}
          />

          {isToggleCreateSchedule ? (
            <div className="px-6">
              <div className="flex w-full flex-col gap-10">
                {/* THỜI HẠN */}

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Thời hạn <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <div className="mt-3.5 flex gap-4 items-center">
                          <div className="w-1/4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={`w-full flex items-center text-center font-normal ${
                                    !dateStart && "text-muted-foreground"
                                  } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                                >
                                  <span
                                    className={`flex-grow text-center ${
                                      !dateStart && "text-muted-foreground"
                                    }`}
                                  >
                                    {dateStart
                                      ? format(dateStart, "dd/MM/yyyy")
                                      : "Ngày bắt đầu"}
                                  </span>
                                  <CalendarIcon className="ml-2 h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={dateStart}
                                  onSelect={setDateStart}
                                  initialFocus
                                  locale={vi}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <span> - </span>
                          <div className="w-1/4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={`w-full flex items-center text-center font-normal ${
                                    !dateEnd && "text-muted-foreground"
                                  } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                                >
                                  <span
                                    className={`flex-grow text-center ${
                                      !dateEnd && "text-muted-foreground"
                                    }`}
                                  >
                                    {dateEnd
                                      ? format(dateEnd, "dd/MM/yyyy")
                                      : "Ngày kết thúc"}
                                  </span>
                                  <CalendarIcon className="ml-2 h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={dateEnd}
                                  onSelect={setDateEnd}
                                  initialFocus
                                  locale={vi}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Thời hạn giảng viên được phép đăng đề tài.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupOption"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Số lượng thành viên nhóm{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <div>
                          <div className="mt-3.5 flex gap-6">
                            <div className="flex gap-2 w-1/3 items-center">
                              <span className="body-regular w-auto flex-shrink-0">
                                Tối thiểu
                              </span>
                              <Input
                                value={minMember}
                                onChange={handleChangeMinMember}
                                name="minMembers"
                                placeholder="Nhập số lượng..."
                                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                              />
                            </div>
                            <div className="flex gap-2 w-1/3 items-center">
                              <p className="body-regular w-auto flex-shrink-0">
                                Tối đa
                              </p>
                              <Input
                                value={maxMember}
                                onChange={handleChangeMaxMember}
                                name="maxMembers"
                                placeholder="Nhập số lượng..."
                                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                              />
                            </div>
                          </div>

                          <div className="mt-10">
                            <CheckboxComponent
                              handleClick={() => {
                                setSelectedLeaderOption(!selectedLeaderOption);
                              }}
                              value={selectedLeaderOption}
                              text="Nhóm có nhóm trưởng"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex mt-12 gap-2">
                <SubmitButton text="Đăng" otherClasses="w-fit" />
                <IconButton
                  text="Hủy"
                  red
                  otherClasses="w-fit"
                  onClick={() => {}}
                />
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="mt-10">
            <ToggleTitle
              text="Danh sách đăng ký đề tài"
              handleClick={handleClickViewTable}
              value={isToggleViewTable}
            />
          </div>

          {isToggleViewTable ? (
            dataTable.filter((item) => !item.isDeleted).length > 0 ? (
              <RegisterTopicTable
                type={RegisterTopicTableType.registerTopic}
                isEditTable={isEditTable}
                isMultipleDelete={isMultipleDelete}
                // @ts-ignore
                dataTable={dataTable}
                onClickEditTable={() => {
                  setIsEditTable(true);
                }}
                onSaveEditTable={(localDataTable) => {
                  console.log("here");
                  setIsEditTable(false);
                  // set lại data import hoặc patch API
                  localDataTable = localDataTable as TopicDataItem[];
                  setDataTable(localDataTable);
                }}
                onClickMultipleDelete={() => {
                  setIsMultipleDelete(true);
                }}
                onClickDeleteAll={() => {
                  setDataTable((prevData) => {
                    return prevData.map((item) => ({
                      ...item,
                      isDeleted: true,
                    }));
                  });

                  toast({
                    title: "Xóa thành công",
                    description: `Đã xóa tất cả lớp học`,
                    variant: "success",
                    duration: 3000,
                  });
                }}
                onClickDelete={(itemsSelected: string[]) => {
                  // ? DELETE THEO MÃ LỚP
                  setDataTable((prevData) => {
                    return prevData.map((item) => {
                      if (itemsSelected.includes(item.STT.toString())) {
                        return {
                          ...item,
                          isDeleted: true,
                        };
                      }
                      return item;
                    });
                  });

                  toast({
                    title: "Xóa thành công",
                    description: `${`Các lớp ${itemsSelected.join(
                      ", "
                    )} đã được xóa.`}`,
                    variant: "success",
                    duration: 3000,
                  });
                }}
                onClickGetOut={() => {
                  setIsMultipleDelete(false);
                }}
                onClickCancelEdit={() => {
                  setIsEditTable(false);
                }}
              />
            ) : (
              <NoResult
                title="Không có dữ liệu!"
                description="🚀 Chưa có đề tài nào được đăng ký."
              />
            )
          ) : (
            <></>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RegisterTopic;
