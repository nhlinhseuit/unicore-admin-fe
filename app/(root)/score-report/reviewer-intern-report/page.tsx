"use client";

import IconButton from "@/components/shared/Button/IconButton";
import InternTopicGradeTable from "@/components/shared/ScoreReport/InternTopicGradeTable";
import TitleDescription from "@/components/shared/TitleDescription";
import { mockInternReviewDetail } from "@/mocks";

const ReviewerInternReport = () => {
  return (
    <>
      <TitleDescription
        title="Cán bộ chấm điểm báo cáo thực tập doanh nghiệp"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />

      <div className="flex justify-end mb-4">
        <IconButton text="Lưu" />
      </div>

      <InternTopicGradeTable
        dataTable={mockInternReviewDetail}
        isEditTable={true}
      />
    </>
  );
};

export default ReviewerInternReport;
