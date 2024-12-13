"use client";

import ToggleTitle from "@/components/shared/ToggleTitle";
import { useState } from "react";

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

const UploadTopic = () => {
  const router = useRouter();

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <ToggleTitle
            text="Lịch giảng viên đăng đề tài"
            showStatus
            showEditButton
            handleClick={handleClickCreateSchedule}
            value={isToggleCreateSchedule}
          />

          {isToggleCreateSchedule ? (
            <div className="flex px-6 gap-12">
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
            <p className="px-6 pb-6 italic text-sm text-red-500">
              * Table cho Khoa thì có GV phụ trách, table cho GV thì kh có
            </p>
          </div>

          {isToggleViewTable ? <UploadTopicResult /> : <></>}

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
      </form>
    </Form>
  );
};

export default UploadTopic;
