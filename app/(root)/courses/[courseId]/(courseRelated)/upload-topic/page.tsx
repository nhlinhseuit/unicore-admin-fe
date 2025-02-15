"use client";

import ToggleTitle from "@/components/shared/ToggleTitle";
import { useEffect, useState } from "react";

import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import UploadTopicResult from "./(UploadTopicResult)/UploadTopicResult";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImportListTopic from "./(UploadTopicResult)/ImportListTopic";
import AlertCreateNewTopic from "./(UploadTopicResult)/AlertCreateNewTopic";
import BorderContainer from "@/components/shared/BorderContainer";
import { handleCreateUploadTopicScheduleAction } from "@/services/topicInProjectServices";
import {
  isDateBeforeToday,
  formatDayToISODateWithDefaultTime,
  formatISOToDayDatatype,
} from "@/utils/dateTimeUtil";
import {
  endTopicImportTimeAtom,
  startTopicImportTimeAtom,
} from "../../../(courses)/(store)/courseStore";
import { useAtom } from "jotai";

const UploadTopic = () => {
  const router = useRouter();

  const [isImport, setIsImport] = useState(false);
  const handleSetImport = (value: boolean) => {
    setIsImport(value);
  };
  const [isCreateNew, setIsCreateNew] = useState(false);
  const handleSetCreateNew = (value: boolean) => {
    setIsCreateNew(value);
  };

  const [isToggleCreateSchedule, setIsToggleCreateSchedule] = useState(true);
  const [isToggleViewTable, setIsToggleViewTable] = useState(true);

  const handleClickViewTable = () => {
    setIsToggleViewTable(!isToggleViewTable);
  };

  const handleClickCreateSchedule = () => {
    setIsToggleCreateSchedule(!isToggleCreateSchedule);
  };

  const [dateStart, setDateStart] = useState<Date>();
  const [dateEnd, setDateEnd] = useState<Date>();

  const [isAlreadyHasSchedule, setIsAlreadyHasSchedule] = useState(0);

  const [startTopicImportTime, setStartTopicImportTime] = useAtom(
    startTopicImportTimeAtom
  );
  const [endTopicImportTime, setEndTopicImportTime] = useAtom(
    endTopicImportTimeAtom
  );

  const mockParamsStartTopicImportTime = null;
  const mockParamsEndTopicImportTime = null;

  useEffect(() => {
    //TODO thay cho startTopicImportTime
    if (mockParamsStartTopicImportTime && mockParamsEndTopicImportTime) {
      setDateStart(formatISOToDayDatatype(mockParamsStartTopicImportTime));
      setDateEnd(formatISOToDayDatatype(mockParamsEndTopicImportTime));

      //? Xác định status
      const date = formatISOToDayDatatype(mockParamsEndTopicImportTime);
      if (date !== undefined) {
        if (isDateBeforeToday(date)) setIsAlreadyHasSchedule(-1);
        else setIsAlreadyHasSchedule(1);
      } else {
        setIsAlreadyHasSchedule(0);
      }
    }
  }, []);

  //! FAKE API
  useEffect(() => {
    if (startTopicImportTime && endTopicImportTime) {
      setDateStart(formatISOToDayDatatype(startTopicImportTime));
      setDateEnd(formatISOToDayDatatype(endTopicImportTime));

      //? Xác định status
      const date = formatISOToDayDatatype(endTopicImportTime);
      if (date !== undefined) {
        if (isDateBeforeToday(date)) setIsAlreadyHasSchedule(-1);
        else setIsAlreadyHasSchedule(1);
      } else {
        setIsAlreadyHasSchedule(0);
      }
    }
  }, [startTopicImportTime, endTopicImportTime]);

  const AnnoucementSchema = z
    .object({
      date: z.string().optional(),
    })
    .refine((data) => dateStart !== undefined && dateEnd !== undefined, {
      message: "Bạn phải chọn ngày bắt đầu và ngày kết thúc",
      path: ["date"],
    });

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

      //TODO: trong lớp
      // class_id: "678e0290551a4b14f9d22bed",
      // subclass_code: "SE113.O21.PMCL",

      const mockParamsProjectId = "67a6e790dcf5f232aead4372";

      const formData = {
        start_topic_import_time: formatDayToISODateWithDefaultTime(
          dateStart ?? new Date()
        ),
        end_topic_import_time: formatDayToISODateWithDefaultTime(
          dateEnd ?? new Date()
        ),
      };

      const res = await handleCreateUploadTopicScheduleAction(
        mockParamsProjectId,
        formData
      );

      console.log("res handleCreateUploadTopicScheduleAction:", res);

      setStartTopicImportTime(res?.data.start_topic_import_time);
      setEndTopicImportTime(res?.data.end_topic_import_time);

      toast({
        title: "Tạo lịch đăng đề tài thành công.",
        description: `Đăng đề tài sẽ diễn ra vào ngày ${format(
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <ToggleTitle
              text="Lịch giảng viên đăng đề tài"
              isActive={isAlreadyHasSchedule}
              showStatus
              showEditButton={isAlreadyHasSchedule === 1}
              handleClick={handleClickCreateSchedule}
              value={isToggleCreateSchedule}
            />

            {isToggleCreateSchedule ? (
              <div className="px-6">
                <div className="flex w-full flex-col gap-10">
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

            <div className="mt-10 flex items-center gap-4">
              <ToggleTitle
                text="Danh sách đăng đề tài"
                handleClick={handleClickViewTable}
                value={isToggleViewTable}
              />

              <div>
                <IconButton
                  text="Import danh sách đề tài"
                  iconLeft={"/assets/icons/upload-white.svg"}
                  onClick={() => {
                    setIsImport(true);
                  }}
                />
              </div>

              <div>
                <IconButton
                  text="Đăng đề tài"
                  onClick={() => {
                    setIsCreateNew(true);
                  }}
                  green
                  iconLeft="/assets/icons/add.svg"
                />
              </div>
            </div>

            {isToggleViewTable ? (
              isImport ? (
                <BorderContainer otherClasses="pt-2 pb-6 px-6">
                  <ImportListTopic handleSetImport={handleSetImport} />
                </BorderContainer>
              ) : (
                <UploadTopicResult />
              )
            ) : (
              <></>
            )}
          </div>
        </form>
      </Form>

      <AlertCreateNewTopic
        isCreateNew={isCreateNew}
        handleSetCreateNew={handleSetCreateNew}
      />
    </>
  );
};

export default UploadTopic;
