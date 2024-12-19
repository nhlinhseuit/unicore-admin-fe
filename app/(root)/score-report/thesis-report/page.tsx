"use client";

import ThesisTopicGradeTable from "@/components/shared/ScoreReport/ThesisTopicGradeTable/ThesisTopicGradeTable";
import TitleDescription from "@/components/shared/TitleDescription";
import { mockThesisTopicGrade } from "@/mocks";
import { ThesisTopicGradeDataItem } from "@/types";
import { useState } from "react";

const ReviewerThesisReport = () => {
  //! TABLE
  const [isEditTable, setIsEditTable] = useState(false);
  const [dataTable, setDataTable] =
    useState<ThesisTopicGradeDataItem[]>(mockThesisTopicGrade);

  return (
    <>
      <TitleDescription
        title="Cán bộ phản biện nhận xét Khóa luận tốt nghiệp"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />

      <ThesisTopicGradeTable
        isEditTable={isEditTable}
        // @ts-ignore
        dataTable={dataTable}
        onClickEditTable={() => {
          setIsEditTable(true);
        }}
        onSaveEditTable={(localDataTable) => {
          setIsEditTable(false);
          // set lại data import hoặc patch API
          localDataTable = localDataTable as ThesisTopicGradeDataItem[];
          setDataTable(localDataTable);
        }}
      />
    </>
  );
};

export default ReviewerThesisReport;
