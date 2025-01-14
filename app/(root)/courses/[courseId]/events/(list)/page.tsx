"use client";

import BigExerciseItem from "@/components/shared/BigExercise/BigExerciseItem";
import LoadingComponent from "@/components/shared/LoadingComponent";
import ToggleTitle from "@/components/shared/ToggleTitle";
import { mockBigExercisesList, mockCentralizedExam } from "@/mocks";
import {
  fetchCentralizedExamInClass,
  fetchProjectsInClass,
} from "@/services/projectServices";
import { ICentralizedTestResponseData } from "@/types/entity/CentralizedTest";
import { IProjectResponseData } from "@/types/entity/Project";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BigExercises = () => {
  const pathName = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projects, setProjects] = useState<IProjectResponseData[]>([]);
  const [centralizedExams, setCentralizedExams] = useState<
    ICentralizedTestResponseData[]
  >([]);

  const mockParams1 = {
    class_id: "677cd4ae0a706479b8773770",
    subclass_code: "SE113.O21.PMCL",
  };

  const mockParams2 = {
    class_id: "6780ff6e854d3e02e4191716",
    subclass_code: "IT001.O21.CLC",
  };

  useEffect(() => {
    let pendingRequests = 2; // Theo dõi số lượng lời gọi đang xử lý
    setIsLoading(true);

    fetchProjectsInClass(mockParams1)
      .then((data: any) => {
        setProjects(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        pendingRequests -= 1;
        if (pendingRequests === 0) {
          setIsLoading(false);
        }
      });

    fetchCentralizedExamInClass(mockParams2)
      .then((data: any) => {
        console.log("fetchCentralizedExamInClass", data);
        setCentralizedExams(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        pendingRequests -= 1;
        if (pendingRequests === 0) {
          setIsLoading(false);
        }
      });
  }, []);

  const [isToggleShowCentralizedExam, setIsToggleShowCentralizedExam] =
    useState(true);
  const [isToggleShowFinalExam, setIsToggleShowFinalExam] = useState(false);
  const [isToggleShowBigExercise, setIsToggleShowBigExercise] = useState(true);

  return (
    <>
      {isLoading ? <LoadingComponent /> : null}
      <div className="flex flex-col gap-4">
        <ToggleTitle
          text="Thi tập trung"
          handleClick={() => {
            isToggleShowCentralizedExam;

            setIsToggleShowCentralizedExam(!isToggleShowCentralizedExam);
          }}
          value={isToggleShowCentralizedExam}
        />
        {isToggleShowCentralizedExam
          ? centralizedExams.map((item) => (
              <BigExerciseItem
                isCentralizedExam
                id={item.id}
                name={item.name}
                creator={item.created_by}
                createdAt={item.created_date}
                deadline={item.date}
              />
            ))
          : null}

        <ToggleTitle
          text="Bài tập lớn"
          handleClick={() => {
            setIsToggleShowBigExercise(!isToggleShowBigExercise);
          }}
          value={isToggleShowBigExercise}
        />
        {isToggleShowBigExercise
          ? projects.map((item) => (
              <Link key={item.id} href={`${pathName}/big-exercises/${item.id}`}>
                <BigExerciseItem
                  id={item.id}
                  name={item.name}
                  creator={item.created_by}
                  createdAt={item.created_date}
                  happeningEvent={""}
                  deadline={""}
                />
              </Link>
            ))
          : null}
      </div>
    </>
  );
};

export default BigExercises;
