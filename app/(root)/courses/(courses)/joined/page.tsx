"use client";
import CourseItem from "@/components/courses/CourseItem";
import MoreButtonCourseItem from "@/components/courses/MoreButtonCourseItem";
import IconButton from "@/components/shared/Button/IconButton";
import { DetailFilter, FilterType } from "@/constants";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import CourseItemDialog from "@/components/courses/CourseItemDialog";
import TableSearch from "@/components/shared/Search/TableSearch";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { mockCourses } from "@/mocks";
import { useRouter } from "next/navigation";
import DetailFilterComponent from "@/components/shared/DetailFilterComponent";

const JoinedCourses = () => {
  const [currentCourseId, setCurrentCourseId] = useState("");

  const router = useRouter();

  const colors = [
    "#fef5e5",
    "#e8f7ff",
    "#ecf2ff",
    "#e6fffa",
    "#fdede8",
    "#f1f4f9",
    "#fff5e6",
    "#e1f7d5",
    "#dce5ff",
    "#fffae6",
    "#f0f8ff",
    "#e0ffff",
    "#e7f5e8",
    "#f7e4f9",
    "#f6f8e9",
  ];

  const getCourseData = (idCourse: string) => {
    return mockCourses.find((item) => item.id === idCourse);
  };

  return (
    <>
      <div className="items-center flex w-full gap-2 mb-8">
        <p className="mr-2 inline-flex justify-start text-sm font-semibold whitespace-nowrap">
          Bộ lọc lớp:
        </p>

        <DetailFilterComponent />
      </div>

      <div className="flex gap-4 flex-wrap">
        {mockCourses.map((item, index) => (
          <div
            key={item.id}
            className="relative"
            onClick={() => {
              if (item.subCourses.length > 0) {
                setCurrentCourseId(item.id);
              } else {
                router.push(`/courses/${item.id}`);
              }
            }}
          >
            <CourseItem
              key={item.id}
              id={item.id}
              name={item.name}
              semester={item.semester}
              teachers={item.teachers}
              color={colors[index % colors.length]}
            />
            <div className="absolute right-0 top-0">
              <MoreButtonCourseItem handleEdit={() => {}} />
            </div>
          </div>
        ))}
      </div>

      {currentCourseId != "" && getCourseData(currentCourseId) ? (
        <AlertDialog open={currentCourseId !== ""}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                {currentCourseId}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                {getCourseData(currentCourseId)?.name}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {
              <div className="flex flex-wrap gap-2">
                {getCourseData(currentCourseId)?.subCourses.map(
                  (item, index) => (
                    <div key={item.id} className="relative w-[48%]">
                      <Link
                        href={`/courses/${
                          getCourseData(currentCourseId)?.subCourses[index].id
                        }`}
                      >
                        <CourseItemDialog
                          key={item.id}
                          id={item.id}
                          teacher={item.teacher}
                        />
                      </Link>
                      <div className="absolute right-0 top-0">
                        <MoreButtonCourseItem handleEdit={() => {}} />
                      </div>
                    </div>
                  )
                )}
              </div>
            }
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setCurrentCourseId("");
                  // params.onClickGetOut && params.onClickGetOut();
                }}
              >
                Đóng
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default JoinedCourses;
