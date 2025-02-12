"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import ReviewForm from "@/components/shared/ScoreReport/ReviewForm";
import ThesisReviewTicketTable from "@/components/shared/ScoreReport/ThesisReviewTicketTable/ThesisTopicGradeTable";
import TitleDescription from "@/components/shared/TitleDescription";
import {
  mockThesisReviewTicket,
  mockThesisReviewTopic
} from "@/mocks";
import { ThesisReviewTicketDataItem, ThesisTopicGradeDataItem } from "@/types";
import { useState } from "react";

const page = () => {
  const [isGradeThesisReport, setIsGradeThesisReport] = useState(false);
  const [isReviewingFormAndFormId, setIsReviewingFormAndFormId] = useState({
    formId: "",
    isReviewer: -1,
  });

  //! TABLE
  const [isEditTable, setIsEditTable] = useState(false);
  const [dataTable, setDataTable] = useState<ThesisReviewTicketDataItem[]>(
    mockThesisReviewTicket
  );

  //! review form

  const getTopic = () => {
    return mockThesisReviewTopic.find(
      (item) => item.id === isReviewingFormAndFormId.formId
    );
  };
  const getReviewer = () => {
    return (
      mockThesisReviewTopic.find(
        (item) => item.id === isReviewingFormAndFormId.formId
      )?.reviewTeacher ?? ""
    );
  };

  return (
    <>
      <TitleDescription
        title="Nhập phiếu nhận xét Khóa luận tốt nghiệp"
        description={["Thời hạn: 7/12/2024 - 28/12/2024"]}
      />

      {isReviewingFormAndFormId.formId !== "" ? (
        <>
          <BackToPrev
            text="Quay lại nhập điểm hội đồng"
            onClickPrev={() => {
              setIsReviewingFormAndFormId({ formId: "", isReviewer: -1 });
            }}
          />
          <div className="flex gap-4">
          <div className="w-full">
          <ReviewForm
                //@ts-ignore
                topic={getTopic()}
                ownerName={getReviewer()}
                isReviewer={isReviewingFormAndFormId.isReviewer === 1}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <ThesisReviewTicketTable
            isEditTable={isEditTable}
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
            onReviewForm={(formId: string, isReviewer: number) => {
              setIsReviewingFormAndFormId({
                formId: formId,
                isReviewer: isReviewer,
              });
            }}
          />
        </>
      )}
    </>
  );
};

export default page;
