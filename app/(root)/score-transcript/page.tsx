"use client";

import IconButton from "@/components/shared/Button/IconButton";
import DetailFilterComponentScore from "@/components/shared/DetailFilterComponentScore";
import ScoreColumnDetailPage from "@/components/shared/ScoreTranscript/ScoreColumnDetailPage";
import ScoreTranscriptTable from "@/components/shared/Table/TableScoreTranscript/ScoreTranscriptTable";
import { mockDataScoreTranscript, mockGradeColumnPercent } from "@/mocks";
import { useState } from "react";

const ScoreTranscript = () => {
  const [isViewDetailGradeColumn, setIsViewDetailGradeColumn] = useState(false);

  return (
    <>
      {isViewDetailGradeColumn ? (
        <ScoreColumnDetailPage
          onClickPrev={() => {
            setIsViewDetailGradeColumn(false);
          }}
        />
      ) : (
        <>
          <div
            className="
          mt-6 flex justify-between items-center w-full gap-6 sm:flex-row sm:items-center"
          >
            <div className="items-center flex w-full gap-2">
              <p className="mr-2 inline-flex justify-start text-sm font-semibold whitespace-nowrap">
                Xem bảng điểm lớp:
              </p>

              <DetailFilterComponentScore />
            </div>
          </div>

          {/* Create announcement */}
          <div className="flex justify-end gap-2 mt-4 mb-2">
            <IconButton text="Xuất file điểm" green />
          </div>

          {/* //TODO: BÀI TẬP */}
          <ScoreTranscriptTable
            dataTable={mockDataScoreTranscript}
            dataGradeColumnPercent={mockGradeColumnPercent}
            viewDetailGradeColumn={() => {
              setIsViewDetailGradeColumn(true);
            }}
          />
        </>
      )}
    </>
  );
};

export default ScoreTranscript;
