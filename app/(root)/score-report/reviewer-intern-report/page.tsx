"use client";

import InternTopicGradeTable from "@/components/shared/ScoreReport/InternTopicGradeTable";
import TitleDescription from "@/components/shared/TitleDescription";
import { mockInternReviewDetail } from "@/mocks";
import { useState } from "react";

const ReviewerInternReport = () => {
  const [isEditTable, setIsEditTable] = useState(true);
  return (
    <>
      <TitleDescription
        title="Cán bộ chấm điểm báo cáo thực tập doanh nghiệp"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />

      <InternTopicGradeTable
        dataTable={mockInternReviewDetail}
        isEditTable={isEditTable}
        handleSaveTable={() => {
          setIsEditTable(false);
        }}
        handleEditTable={() => {
          setIsEditTable(true);
        }}
      />
    </>
  );
};

export default ReviewerInternReport;
