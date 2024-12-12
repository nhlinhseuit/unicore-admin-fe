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
import { mockNotCompleteActions } from "@/mocks";
import { Dropdown } from "flowbite-react";
import { useState } from "react";

const Courses = () => {
  const [isImport, setIsImport] = useState(false);
  const [isImportCompleteAction, setIsImportCompleteAction] = useState(-1);

  const getImportCompleteActionComponent = () => {
    switch (isImportCompleteAction) {
      case 1:
        return <ImportStudentsListInCourse />;
      case 2:
        return <ImportCentralizedExam />;
      case 5:
        return <ImportThesisReport />;
      case 6:
        return <ImportInternReport />;
        // doing
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
                setIsImport(true);
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

                      <p className="text-[#17a1fa] body-medium whitespace-nowrap ">
                        {item.action}
                      </p>
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

  return renderComponent();
};

export default Courses;
