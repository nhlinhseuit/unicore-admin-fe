"use client";
import BorderContainer from "@/components/shared/BorderContainer";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { useRef, useState } from "react";

import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import OfficerPermission from "@/components/shared/OfficerPermission";
import { Input } from "@/components/ui/input";
import { mockDataOfficerDepartmentPermissions } from "@/mocks";

import { mockTeacherList } from "@/mocks";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dropdown } from "flowbite-react";

import TeacherItem from "@/components/shared/TeacherItem";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import Image from "next/image";
// import Student from "@/types/entity/Student";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

interface Teacher {
  id: string;
  name: string;
  email: string;
}

export const mockDbTeacher = [
  {
    id: "80210",
    name: "Nguyễn Thị Thanh Trúc",
    email: "trucntt@uit.edu.vn",
  },
  {
    id: "80209",
    name: "Lê Thanh Trọng",
    email: "tronglt@uit.edu.vn",
  },
  {
    id: "80360",
    name: "Huỳnh Hồ Thị Mộng Trinh",
    email: "trinhhhtm@uit.edu.vn",
  },
];

const Setting = () => {
  const [isToggleShowCourseSetting, setIsToggleShowCourseSetting] =
    useState(true);
  const [isToggleGeneralSetting, setIsToggleGeneralSetting] = useState(true);
  const [defaultPassword, setDefaultPassword] = useState("1");
  const [scoreCourse, setScoreCourse] = useState("0.5");
  const [scoreAverage, setScoreAverage] = useState("0.1");

  const [isShowDialogChooseTeacher, setIsShowDialogChooseTeacher] =
    useState(false);

  //? FORM

  const [officers, setOfficers] = useState(
    mockDataOfficerDepartmentPermissions
  );
  const [selectedTeachers, setSelectedTeachers] = useState<Teacher[]>([]);

  const teacherIdRef = useRef<HTMLInputElement>(null);
  const updateStudentId = (value: string) => {
    if (teacherIdRef.current) {
      teacherIdRef.current.value = value;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateStudentId(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (isHasTeacherInDb()) {
        setSuggestion(true);
      } else {
        setSuggestion(false);
      }
    }, 300);
  };

  const handleFocus = () => {
    if (isHasTeacherInDb()) {
      setSuggestion(true); // Hiển thị gợi ý nếu khớp
    } else {
      setSuggestion(false); // Ẩn gợi ý nếu không khớp
    }
  };

  const isHasTeacherInDb = () => {
    if (teacherIdRef.current) {
      return mockDbTeacher.find(
        (item) => item.id === teacherIdRef.current!.value
      );
    }
  };

  const handleSuggestionClick = () => {
    if (teacherIdRef.current) {
      if (
        selectedTeachers.some((item) => item.id === teacherIdRef.current!.value)
      ) {
        setSuggestion(false);
        updateStudentId("");
        return;
      }
    }

    setSelectedTeachers((prev) => [...prev, isHasTeacherInDb()!]);
    setSuggestion(false);
    updateStudentId("");
  };

  const [suggestion, setSuggestion] = useState(false);
  const [placeholder, setPlaceholder] = useState("Nhập mã giảng viên");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const AnnoucementSchema = z.object({
    nameGroup: z
      .string()
      .min(1, { message: "Bạn phải điền tên nhóm" })
      .max(100, { message: "Tên nhóm chứa tối đa 100 ký tự" }),
    studentList: z.string().optional(),
  });

  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {
      nameGroup: "",
      studentList: "",
    },
  });

  async function onSubmit(values: any) {
    try {
      console.log({
        nameGroup: values.nameGroup,
      });

      setOfficers((prev) => [
        ...prev,
        ...selectedTeachers.map((teacher) => ({
          name: teacher.name,
          email: teacher.email,
          permissions: {
            manageAcademicStaff: true,
            manageLecturers: true,
            manageStudents: true,
            manageSubjects: true,
            manageClasses: true,
            manageFacultyAnnouncements: true,
            manageAnnouncementCategories: true,
            manageClassStudents: true,
            manageExamSchedules: true,
            manageBigExercisesAnnouncements: true,
            manageProjectProposalSchedules: true,
            manageProjectProposals: true,
            manageProjectGroups: true,
            assignSupervisors: true,
            manageReportSchedules: true,
            submitFeedbackForms: true,
            enterFinalScores: true,
            adjustGradingFormula: true,
            adjustRoundingRules: true,
          },
        })),
      ]);

      toast({
        title: "Thêm quyền giảng viên thành công",
        variant: "success",
        duration: 3000,
      });

      setIsShowDialogChooseTeacher(false);
    } catch {
    } finally {
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <ToggleTitle
          text="Cài đặt chung"
          handleClick={() => {
            setIsToggleGeneralSetting(!isToggleGeneralSetting);
          }}
          value={isToggleGeneralSetting}
        />
        {isToggleGeneralSetting ? (
          <div className="mx-6 pl-6 flex flex-col gap-20">
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                1. Tài khoản
              </label>
              <BorderContainer otherClasses="p-6 mt-4 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    - Mật khẩu mặc định khi tạo tài khoản
                  </label>
                  <div>
                    <Input
                      value={defaultPassword}
                      onChange={(e) => {
                        setDefaultPassword(e.target.value);
                      }}
                      placeholder="Nhập điểm..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                    />
                  </div>
                </div>
              </BorderContainer>
            </div>

            <div>
              <SubmitButton text="Lưu cài đặt lớp" />
            </div>
          </div>
        ) : null}

        <ToggleTitle
          text="Cài đặt lớp"
          handleClick={() => {
            setIsToggleShowCourseSetting(!isToggleShowCourseSetting);
          }}
          value={isToggleShowCourseSetting}
        />
        {isToggleShowCourseSetting ? (
          <div className="mx-6 pl-6 flex flex-col gap-20">
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                1. Quy tắc làm tròn số
              </label>
              <BorderContainer otherClasses="p-6 mt-4 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    - Điểm lớp làm tròn lên:
                  </label>
                  <div>
                    <Input
                      value={scoreCourse}
                      onChange={(e) => {
                        setScoreCourse(e.target.value);
                      }}
                      placeholder="Nhập điểm..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                    - Điểm trung bình làm tròn lên:
                  </label>
                  <div>
                    <Input
                      value={scoreAverage}
                      onChange={(e) => {
                        setScoreAverage(e.target.value);
                      }}
                      placeholder="Nhập điểm..."
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[40px] border"
                    />
                  </div>
                </div>
              </BorderContainer>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
                  2. Phân quyền giáo vụ
                </label>

                <IconButton
                  text={"Thêm quyền giảng viên"}
                  green
                  iconLeft={"/assets/icons/add.svg"}
                  iconWidth={22}
                  iconHeight={22}
                  onClick={() => {
                    setIsShowDialogChooseTeacher(true);
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-4 w-full">
  {officers.map((item: any, index) => (
    <div key={index} className="w-[49%]">
      <OfficerPermission dataItem={item} />
    </div>
  ))}
</div>

            </div>

            <div>
              <SubmitButton text="Lưu cài đặt lớp" />
            </div>
          </div>
        ) : null}
      </div>

      <AlertDialog open={isShowDialogChooseTeacher}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className=" text-lg font-semibold text-center">
              Thêm quyền giảng viên
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {/* Danh sách thành viên nhóm */}
                <FormField
                  control={form.control}
                  // @ts-ignore
                  name="studentList"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Danh sách giảng viên
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Nhập các giảng viên để thêm quyền giáo vụ.
                      </FormDescription>
                      <FormControl className="mt-3.5 ">
                        <div className="mt-6">
                          <div>
                            <div className="relative" ref={ref}>
                              <Input
                                ref={teacherIdRef}
                                onChange={handleChange}
                                name="teacherIdRef"
                                placeholder={placeholder}
                                onFocus={handleFocus}
                                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                              />
                              {suggestion && (
                                <div
                                  className="absolute left-0 z-50 w-full mt-1 bg-white cursor-pointer p-2 rounded-md border normal-regular no-focus text-dark300_light700 min-h-[46px] shadow-lg"
                                  onClick={handleSuggestionClick}
                                >
                                  {isHasTeacherInDb()?.id} -{" "}
                                  {isHasTeacherInDb()?.name}
                                </div>
                              )}
                            </div>
                            {selectedTeachers.length > 0 ? (
                              <BorderContainer otherClasses="mt-3">
                                <div className="my-4 ml-4">
                                  {selectedTeachers && (
                                    <div className="flex flex-col gap-4">
                                      {selectedTeachers.map((item, index) => (
                                        <div key={item.id}>
                                          <TeacherItem
                                            item={item}
                                            index={index}
                                            courseId={"123123"}
                                            selectedStudents={selectedTeachers}
                                            setSelectedStudents={
                                              setSelectedTeachers
                                            }
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </BorderContainer>
                            ) : null}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                  <IconButton
                    cancel
                    text={"Hủy"}
                    onClick={() => {
                      setIsShowDialogChooseTeacher(false);
                    }}
                  />

                  {/* //! fake API */}
                  <IconButton
                    text={"Đồng ý"}
                    onClick={() => {
                      onSubmit({});
                    }}
                  />
                  {/* <SubmitButton text={"Đồng ý"} /> */}
                </div>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Setting;
