"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import IconButtonStopPropagation from "@/components/shared/Button/IconButtonStopPropagation";
import DetailFilterComponent from "@/components/shared/DetailFilterComponent";
import CoursesDataTable from "@/components/shared/Table/TableImport/CoursesDataTable";
import ImportCentralizedExam from "@/components/shared/Table/TableImport/ImportCentralizedExam";
import ImportInternReport from "@/components/shared/Table/TableImport/ImportInternReport";
import ImportStudentsListInCourse from "@/components/shared/Table/TableImport/ImportStudentsListInCourse";
import ImportThesisReport from "@/components/shared/Table/TableImport/ImportThesisReport";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  mockNotCompleteActions,
  mockSemesterList,
  mockYearList,
} from "@/mocks";

import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

const Courses = () => {
  const [isImport, setIsImport] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isImportCompleteAction, setIsImportCompleteAction] = useState(-1);

  // [1, 2, 3]

  // [
  //   2020, 2021, 2022, 2023, 2024,
  // ]

  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedYear, setSelectedYear] = useState(1);

  const getImportCompleteActionComponent = () => {
    switch (isImportCompleteAction) {
      case 1:
        return <ImportStudentsListInCourse />;
      case 2:
        return <ImportCentralizedExam typeExam="midterm" />;
      case 3:
        return <ImportCentralizedExam typeExam="final" />;
      case 4:
        return <ImportThesisReport />;
      case 5:
        return <ImportInternReport />;
      default:
        return;
    }
  };

  const renderComponent = () => {
    if (!isImport && isImportCompleteAction === -1)
      return (
        <div>
          <div className="flex justify-end mb-3">
            <IconButton
              text="Import danh sách lớp mới"
              onClick={() => {
                setIsShowDialog(true);
              }}
              iconLeft={"/assets/icons/upload-white.svg"}
              iconWidth={16}
              iconHeight={16}
            />
          </div>
          <div className="flex items-center justify-end gap-4 mb-3">
            <p className="text-sm italic">* Học kỳ hiện tại: HK1, năm 2024</p>
          </div>
          <div className="items-center flex w-full gap-2 mb-8">
            <p className="mr-2 inline-flex justify-start text-sm font-semibold whitespace-nowrap">
              Bộ lọc lớp:
            </p>

            <DetailFilterComponent />
          </div>

          {/* //TODO: TODO WITH CLASS */}
          <div className="w-full">
            <p className="text-sm font-semibold whitespace-nowrap">
              Bạn chưa hoàn thành các bước sau:
            </p>
            <div className="mt-4 flex gap-4 w-full flex-wrap">
              {mockNotCompleteActions.map((item, index) => (
                <Dropdown
                  key={item.id}
                  className="z-30 rounded-lg"
                  label=""
                  renderTrigger={() => (
                    <div className="cursor-pointer px-2 border-[1px] border-[#17a1fa] h-12  rounded-lg flex items-center gap-2 mb-2 relative">
                      <div className="cursor-pointer bg-[#17a1fa] w-5 h-5 my-2 rounded-full flex-center text-sm text-white">
                        {item.id}
                      </div>
                      <p className="text-[#17a1fa] body-medium whitespace-nowrap mr-8">
                        {item.action}
                      </p>
                      <Image
                        src={"/assets/icons/chevron-down.svg"}
                        width={22}
                        height={22}
                        alt="close"
                        className="absolute right-0 mr-2 cursor-pointer"
                      />
                    </div>
                  )}
                >
                  <div className="relative">
                    <div className="scroll-container scroll-container-dropdown-content">
                      <span className="px-4 py-2 text-sm text-left text-gray-700 cursor-default font-semibold">
                        {item.desc}
                      </span>
                      <span className="flex items-center justify-start px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                        {item.data}
                      </span>
                      <div className="flex justify-end mb-2">
                        <IconButtonStopPropagation
                          text="Đi tới"
                          green
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsImportCompleteAction(item.id);
                          }}
                          otherClasses="mr-4"
                        />
                      </div>
                    </div>
                  </div>
                </Dropdown>
              ))}
            </div>
          </div>
        </div>
      );
    else if (isImport) {
      return (
        <>
          <BackToPrev
            text={"Quay lại danh sách lớp học"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />
          <CoursesDataTable />
        </>
      );
    } else
      return (
        <>
          <BackToPrev
            text={"Quay lại danh sách lớp học"}
            onClickPrev={() => {
              setIsImportCompleteAction(-1);
            }}
          />
          {getImportCompleteActionComponent()}
        </>
      );
  };

  return (
    <div>
      {renderComponent()}

      <AlertDialog open={isShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Chọn học kỳ, năm học để import danh sách lớp
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="my-12 w-full flex flex-col gap-8">
            <div className="flex-center gap-6">
              <p className="w-[20%] inline-flex justify-start text-sm whitespace-nowrap">
                Chọn học kỳ
              </p>
              <Dropdown
                className="min-w-max z-30 rounded-lg"
                label=""
                dismissOnClick={true}
                renderTrigger={() => (
                  <div>
                    <IconButton
                      text={`${mockSemesterList[selectedSemester - 1].value}`}
                      onClick={() => {}}
                      iconRight={"/assets/icons/chevron-down.svg"}
                      bgColor="bg-white"
                      textColor="text-black"
                      border
                      otherClasses="w-[300px]"
                    />
                  </div>
                )}
              >
                <div className="w-full scroll-container scroll-container-dropdown-content">
                  {mockSemesterList.map((semester, index) => (
                    <Dropdown.Item
                      key={`${semester.id}_${index}`}
                      onClick={() => {
                        if (selectedSemester === semester.id) {
                          setSelectedSemester(1);
                        } else {
                          setSelectedSemester(semester.id);
                        }
                      }}
                      className="w-[300px] min-w-max"
                    >
                      <div className="flex justify-between w-full">
                        <p className="w-[80%] text-left line-clamp-1">
                          {semester.value}
                        </p>
                        {selectedSemester === semester.id ? (
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

            <div className="flex-center gap-6">
              <p className="w-[20%] inline-flex justify-start text-sm whitespace-nowrap">
                Chọn năm học
              </p>
              <Dropdown
                className="min-w-max z-30 rounded-lg"
                label=""
                dismissOnClick={true}
                renderTrigger={() => (
                  <div>
                    <IconButton
                      text={`${mockYearList[selectedYear - 1].value}`}
                      onClick={() => {}}
                      iconRight={"/assets/icons/chevron-down.svg"}
                      bgColor="bg-white"
                      textColor="text-black"
                      border
                      otherClasses="w-[300px]"
                    />
                  </div>
                )}
              >
                <div className="w-full scroll-container scroll-container-dropdown-small">
                  {mockYearList.map((year, index) => (
                    <Dropdown.Item
                      key={`${year.id}_${index}`}
                      onClick={() => {
                        if (selectedYear === year.id) {
                          setSelectedYear(1);
                        } else {
                          setSelectedYear(year.id);
                        }
                      }}
                      className="w-[300px] min-w-max"
                    >
                      <div className="flex justify-between w-full">
                        <p className="w-[80%] text-left line-clamp-1">
                          {year.value}
                        </p>
                        {selectedYear === year.id ? (
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
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsShowDialog(false);
              }}
            >
              Đóng
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsShowDialog(false);
                setIsImport(true);
              }}
              className="bg-primary-500 hover:bg-primary-500/90"
            >
              Đồng ý
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Courses;
