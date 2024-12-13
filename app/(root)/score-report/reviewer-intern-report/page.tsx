"use client";

import InternTopicGradeTable from "@/components/shared/ScoreReport/InternTopicGradeTable";
import TitleDescription from "@/components/shared/TitleDescription";
import { mockInternReviewDetail } from "@/mocks";
import { useState } from "react";

const ReviewerInternReport = () => {
  const [isEditTable, setIsEditTable] = useState(true);
  const [dataTable, setDataTable] = useState(mockInternReviewDetail)
  return (
    <>
      <TitleDescription
        title="Cán bộ chấm điểm báo cáo thực tập doanh nghiệp"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />

      <InternTopicGradeTable
        dataTable={dataTable}
        isEditTable={isEditTable}
        handleSaveTable={(updatedData) => {
          setIsEditTable(false);
          
          setDataTable((prevDataTable) =>
            prevDataTable.map((item) => {
              const updatedItem = updatedData[item.data.MSSV];
              if (updatedItem) {
                return {
                  ...item,
                  data: {
                    ...item.data,
                    Điểm: updatedItem["Điểm"], // Cập nhật điểm từ updatedData
                  },
                };
              }
              return item; // Giữ nguyên nếu không có trong updatedData
            })
          );
          
        }}
        handleEditTable={() => {
          setIsEditTable(true);
        }}
      />
    </>
  );
};

export default ReviewerInternReport;
