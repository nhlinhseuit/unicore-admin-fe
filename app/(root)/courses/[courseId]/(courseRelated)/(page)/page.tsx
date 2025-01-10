"use client";

import IconButton from "@/components/shared/Button/IconButton";
import ExercisePostItem from "@/components/shared/PostItem/ExercisePostItem";
import PostItem from "@/components/shared/PostItem/PostItem";
import ReportPostItem from "@/components/shared/PostItem/ReportPostItem";
import TableSearch from "@/components/shared/Search/TableSearch";
import { AnnouncementTypesNotRegularCourse, FilterType } from "@/constants";
import { mockPostDataCourseIdPage } from "@/mocks";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sClassCode, sClassId } from "../../../(courses)/(store)/courseStore";
import Image from "next/image";
import { useState } from "react";

const page = () => {
  const pathName = usePathname();

  const classCode = sClassCode.use();
  const classId = sClassId.use();

  console.log("classCode", classCode);
  console.log("classId", classId);

  const [typeFilter, setTypeFilter] = useState(FilterType.None);

  //! CALL API để xem course này có phải có type là internCourse hay thesisCourse hay không
  const isNotRegularCourse = true;
  const renderAnnouncementTypes = isNotRegularCourse
    ? AnnouncementTypesNotRegularCourse
    : null;

  const getRenderPostItem = (item: any): JSX.Element => {
    switch (item.typePost) {
      case "report":
        return (
          <ReportPostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            fileName={item.fileName}
            comments={item.comments}
            setGrading={() => {
              // setIsGrading(true);
            }}
          />
        );
      case "exercise":
        return (
          <ExercisePostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            fileName={item.fileName}
            comments={item.comments}
            setGrading={() => {
              // setIsGrading(true);
            }}
          />
        );
      case "announcement":
      default:
        return (
          <PostItem
            key={item.id}
            id={item.id}
            creator={item.creator}
            createdAt={item.createdAt}
            title={item.title}
            fileName={item.fileName}
            comments={item.comments}
          />
        );
    }
  };

  const cancelDetailFilter = () => {
    setTypeFilter(FilterType.None);
  };

  const annoucementTypes = [
    { id: 1, value: "Thông báo" },
    { id: 2, value: "Bài tập" },
    { id: 3, value: "Báo cáo" },
  ];

  const [selectedAnnoucementType, setSelectedAnnoucementType] = useState(1);

  return (
    <div>
      <div
        className="
        mt-6 mb-10 flex w-full gap-6 sm:flex-row sm:items-center justify-between"
      >
        {/* Search & Filter */}
        <div className="flex items-center gap-2 justify-start w-2/3">
          <TableSearch
            setSearchTerm={() => {}}
            searchTerm={""}
            otherClasses="w-[50%]"
          />

          <Dropdown
            className="z-30 rounded-lg w-[25%]"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div>
                <IconButton
                  text={`${
                    annoucementTypes[selectedAnnoucementType - 1].value
                  }`}
                  iconRight={"/assets/icons/chevron-down.svg"}
                  bgColor="bg-white"
                  textColor="text-black"
                  border
                />
              </div>
            )}
          >
            <div className="w-full scroll-container scroll-container-dropdown-content">
              {annoucementTypes.map((type, index) => (
                <Dropdown.Item
                  key={`${type.id}_${index}`}
                  onClick={() => {
                    if (selectedAnnoucementType === type.id) {
                      setSelectedAnnoucementType(1);
                    } else {
                      setSelectedAnnoucementType(type.id);
                    }
                  }}
                  className="min-w-max"
                >
                  <div className="flex justify-between w-full">
                    <p className="w-[80%] text-left line-clamp-1">
                      {type.value}
                    </p>
                    {selectedAnnoucementType === type.id ? (
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

          <Dropdown
            className="z-30 rounded-lg w-[25%]"
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div>
                <IconButton
                  text="Bộ lọc"
                  iconLeft={
                    typeFilter === FilterType.None
                      ? "/assets/icons/filter.svg"
                      : "/assets/icons/filter_active.svg"
                  }
                  iconRight={"/assets/icons/chevron-down.svg"}
                  bgColor="bg-white"
                  textColor="text-black"
                  border
                />
              </div>
            )}
          >
            <Dropdown.Header>
              <span
                onClick={() => {
                  cancelDetailFilter();
                }}
                className="block truncate text-sm font-medium cursor-pointer"
              >
                Bỏ bộ lọc
              </span>
            </Dropdown.Header>
            <ul className=" text-sm" aria-labelledby="filterDropdownButton">
              <li
                className="flex items-center
                    w-full
                    justify-start
                    px-4
                    py-2
                    text-sm
                    text-gray-700
                    focus:outline-none
                    "
              >
                <input
                  checked={typeFilter === FilterType.SortNewer}
                  id="SortNewer"
                  type="radio"
                  name="filterOptions"
                  value={FilterType.SortNewer}
                  onChange={() => {
                    setTypeFilter(FilterType.SortNewer);
                  }}
                  className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                />
                <label
                  htmlFor="SortNewer"
                  className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Mới nhất
                </label>
              </li>
              <li
                className="flex items-center
                    w-full
                    justify-start
                    px-4
                    py-2
                    text-sm
                    text-gray-700
                    focus:outline-none
                    "
              >
                <input
                  checked={typeFilter === FilterType.SortOlder}
                  id="SortOlder"
                  type="radio"
                  name="filterOptions"
                  value={FilterType.SortOlder}
                  onChange={() => {
                    setTypeFilter(FilterType.SortOlder);
                  }}
                  className="w-4 h-4  cursor-pointer bg-gray-100 border-gray-300 rounded text-primary-600"
                />
                <label
                  htmlFor="SortOlder"
                  className="ml-2 cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Cũ nhất
                </label>
              </li>
            </ul>
          </Dropdown>
        </div>

        {/* Create announcement */}
        {renderAnnouncementTypes ? (
          <div>
            <Dropdown
              className="z-30 rounded-lg"
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <div className="w-full">
                  <div>
                    <IconButton
                      text="Tạo thông báo"
                      iconLeft="/assets/icons/add.svg"
                    />
                  </div>
                </div>
              )}
            >
              <div className="w-full">
                {renderAnnouncementTypes.map((item) => (
                  <Link
                    key={`${pathName}${item.route}`}
                    href={`${pathName}${item.route}`}
                  >
                    <Dropdown.Item>{item.label}</Dropdown.Item>
                  </Link>
                ))}
              </div>
            </Dropdown>
          </div>
        ) : null}
      </div>

      {/* PostList */}
      <div className="mt-6 flex flex-col gap-4">
        {mockPostDataCourseIdPage.map((item, index) => {
          return getRenderPostItem(item);
        })}
      </div>
    </div>
  );
};

export default page;
