"use client";

import IconButton from "@/components/shared/Button/IconButton";
import ThesisTopic from "@/components/shared/ScoreReport/ThesisTopic";
import TitleDescription from "@/components/shared/TitleDescription";
import { ReviewThesisFilterType } from "@/constants";
import { mockThesisReviewTopic } from "@/mocks";
import { CourseDataItem } from "@/types";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ReviewerThesisReport = () => {
  const [selectedIsReviewedStatus, setSelectedIsReviewedStatus] = useState(0);
  const [selectedCouncil, setSelectedCouncil] = useState("");

  const [renderData, setRenderData] = useState(mockThesisReviewTopic);

  const getUniqueCouncil = () => {
    return Array.from(
      new Set(mockThesisReviewTopic.map((item) => item.council))
    );
  };

  const applyFilter = () => {
    let filteredData = mockThesisReviewTopic;

    if (selectedIsReviewedStatus !== -1) {
      filteredData = filteredData.filter((item) => {
        return item.isReviewd == selectedIsReviewedStatus;
      });
    }

    if (selectedCouncil !== "") {
      filteredData = filteredData.filter((item) => {
        return item.council == selectedCouncil;
      });
    }

    setRenderData(filteredData);
  };

  useEffect(() => {
    applyFilter();
  }, [selectedIsReviewedStatus, selectedCouncil]);

  return (
    <>
      <TitleDescription
        title="Cán bộ phản biện nhận xét Khóa luận tốt nghiệp"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />

      <div className="mt-6 mb-6 flex justify-start ml-10 w-1/2 items-center gap-4">
        <p className="inline-flex justify-start text-sm whitespace-nowrap">
          Bộ lọc:
        </p>

        <Dropdown
          className="z-30 rounded-lg"
          label=""
          dismissOnClick={true}
          renderTrigger={() => (
            <div>
              <IconButton
                text={
                  selectedIsReviewedStatus !== -1
                    ? ReviewThesisFilterType[selectedIsReviewedStatus].value
                    : "Chọn bộ lọc"
                }
                onClick={() => {}}
                iconRight="/assets/icons/chevron-down.svg"
                bgColor="bg-white"
                textColor="text-black"
                border
              />
            </div>
          )}
        >
          <div className="scroll-container scroll-container-dropdown-content">
            {ReviewThesisFilterType.map((course, index) => (
              <Dropdown.Item
                key={`${course}_${index}`}
                onClick={() => {
                  if (selectedIsReviewedStatus === course.id) {
                    setSelectedIsReviewedStatus(-1);
                  } else {
                    setSelectedIsReviewedStatus(course.id);
                  }
                }}
              >
                <div className="flex justify-between w-full gap-4">
                  <p className="text-left line-clamp-1">{course.value}</p>
                  {selectedIsReviewedStatus === course.id && (
                    <Image
                      src="/assets/icons/check.svg"
                      alt="selected"
                      width={21}
                      height={21}
                      className="cursor-pointer mr-2"
                    />
                  )}
                </div>
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          className="z-30 rounded-lg"
          label=""
          dismissOnClick={true}
          renderTrigger={() => (
            <div>
              <IconButton
                text={
                  selectedCouncil !== "" ? selectedCouncil : "Chọn hội đồng"
                }
                iconRight="/assets/icons/chevron-down.svg"
                bgColor="bg-white"
                textColor="text-black"
                border
              />
            </div>
          )}
        >
          <div className="scroll-container scroll-container-dropdown-content">
            {getUniqueCouncil().map((council, index) => (
              <Dropdown.Item
                key={`${council}_${index}`}
                onClick={() => {
                  if (selectedCouncil === council) {
                    setSelectedCouncil("");
                  } else {
                    setSelectedCouncil(council);
                  }
                }}
              >
                <div className="flex justify-between w-full gap-4">
                  <p className="text-left line-clamp-1">{council}</p>
                  {selectedCouncil === council && (
                    <Image
                      src="/assets/icons/check.svg"
                      alt="selected"
                      width={21}
                      height={21}
                      className="cursor-pointer mr-2"
                    />
                  )}
                </div>
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown>
      </div>

      <div className="flex flex-col gap-4">
        {renderData.map((topic) => (
          <Link href={`/score-report/reviewer-thesis-report/${topic.id}`}>
            <ThesisTopic key={topic.id} topic={topic} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ReviewerThesisReport;
