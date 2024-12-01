"use client";
import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import IconButtonStopPropagation from "@/components/shared/Button/IconButtonStopPropagation";
import DetailFilterComponent from "@/components/shared/DetailFilterComponent";
import CoursesDataTable from "@/components/shared/Table/TableImport/CoursesDataTable";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

const Courses = () => {
  const [isImport, setIsImport] = useState(false);
  return (
    <>
      {!isImport ? (
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
          {/* Chưa nhập ds sinh viên */}
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <div className="cursor-pointer border-[1px] border-[#17a1fa] w-full h-12  rounded-lg flex-between mb-2 relative">
                <Image
                  src={"/assets/icons/chevron-down.svg"}
                  width={22}
                  height={22}
                  alt="close"
                  className="absolute left-0 ml-4 cursor-pointer"
                />
                <div className="ml-12 bg-[#17a1fa] w-7 h-7 my-2 rounded-full flex-center text-white">
                  1
                </div>
                <p className="text-[#17a1fa] body-medium">
                  Bạn chưa nhập danh sách sinh viên cho các lớp. Nhấn vào để xem
                  danh sách lớp.
                </p>
                <IconButtonStopPropagation
                  text="Đi tới"
                  green
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  otherClasses="mr-4"
                />
              </div>
            )}
          >
            <div className="scroll-container scroll-container-dropdown-content">
              <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2,
              </p>
            </div>
          </Dropdown>

          {/* Chưa nhập ds GV chấm GK, CK */}
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <div className="cursor-pointer border-[1px] border-[#17a1fa] w-full h-12  rounded-lg flex-between mb-2 relative">
                <Image
                  src={"/assets/icons/chevron-down.svg"}
                  width={22}
                  height={22}
                  alt="close"
                  className="absolute left-0 ml-4 cursor-pointer"
                />
                <div className="ml-12 bg-[#17a1fa] w-7 h-7 my-2 rounded-full flex-center text-white">
                  2
                </div>
                <p className="text-[#17a1fa] body-medium">
                  Bạn chưa nhập danh sách giảng viên chấm điểm thi Giữa kỳ -
                  Cuối kỳ cho các lớp. Nhấn vào để xem danh sách lớp.
                </p>
                <IconButtonStopPropagation
                  text="Đi tới"
                  green
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  otherClasses="mr-4"
                />
              </div>
            )}
          >
            <div className="scroll-container scroll-container-dropdown-content">
              <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                STT 01: SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2, STT 01:
                SE100.PMCL2021.2, STT 01: SE100.PMCL2021.2,
              </p>
            </div>
          </Dropdown>

          {/* Chưa import lịch thi tập trung Giữa kỳ - Cuối kỳ*/}
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <div className="cursor-pointer border-[1px] border-[#17a1fa] w-full h-12  rounded-lg flex-between mb-2 relative">
                <Image
                  src={"/assets/icons/chevron-down.svg"}
                  width={22}
                  height={22}
                  alt="close"
                  className="absolute left-0 ml-4 cursor-pointer"
                />
                <div className="ml-12 bg-[#17a1fa] w-7 h-7 my-2 rounded-full flex-center text-white">
                  3
                </div>
                <p className="text-[#17a1fa] body-medium">
                  Bạn chưa import lịch thi tập trung Giữa kỳ - Cuối kỳ. Nhấn vào
                  để xem danh sách lớp.
                </p>
                <IconButtonStopPropagation
                  text="Đi tới"
                  green
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  otherClasses="mr-4"
                />
              </div>
            )}
          >
            <div className="scroll-container scroll-container-dropdown-content">
              <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
              </p>
            </div>
          </Dropdown>

          {/* Chưa nhập ds sinh viên và chia nhóm cho lớp*/}
          <Dropdown
            className="z-30 rounded-lg"
            label=""
            renderTrigger={() => (
              <div className="cursor-pointer border-[1px] border-[#17a1fa] w-full h-12  rounded-lg flex-between mb-2 relative">
                <Image
                  src={"/assets/icons/chevron-down.svg"}
                  width={22}
                  height={22}
                  alt="close"
                  className="absolute left-0 ml-4 cursor-pointer"
                />
                <div className="ml-12 bg-[#17a1fa] w-7 h-7 my-2 rounded-full flex-center text-white">
                  4
                </div>
                <p className="text-[#17a1fa] body-medium">
                  Bạn chưa nhập danh sách sinh viên và chia nhóm cho các lớp.
                  Nhấn vào để xem danh sách lớp.
                </p>
                <IconButtonStopPropagation
                  text="Đi tới"
                  green
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  otherClasses="mr-4"
                />
              </div>
            )}
          >
            <div className="scroll-container scroll-container-dropdown-content">
              <p className="flex items-center justify-start w-full px-4 py-2 text-sm text-left text-gray-700 cursor-default">
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
                STT 01: Thực tập doanh nghiệp, STT 01: Thực tập doanh nghiệp,
              </p>
            </div>
          </Dropdown>
        </div>
      ) : (
        <>
          <BackToPrev
            text={"Quay lại danh sách lớp học"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />

          <CoursesDataTable />
        </>
      )}
    </>
  );
};

export default Courses;
