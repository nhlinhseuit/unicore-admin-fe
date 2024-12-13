"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import BorderContainer from "@/components/shared/BorderContainer";
import CommentTicket from "@/components/shared/ScoreReport/CommentTicket";
import ReviewForm from "@/components/shared/ScoreReport/ReviewForm";
import { mockThesisReviewTopic } from "@/mocks";
import { usePathname } from "next/navigation";
import { useState } from "react";

const page = () => {
  const pathName = usePathname();
  const topicId = pathName.split("/").pop();
  const prevRoute = pathName.split("/").slice(0, -1).join("/");

  //! API: Khi gọi API ở đây thì lấy data get được bỏ vào store, và lấy ra để find ở đây
  const topic = mockThesisReviewTopic.find((item) => item.id === topicId);
  const [selectedReviewer, setSelectedReviewer] = useState(
    topic?.reviewTeachers[0] ?? ""
  );

  return (
    <>
      <BackToPrev
        text="Quay lại danh sách đề tài"
        linkPrev={prevRoute}
      />
      <div className="flex gap-4">
        <div>
          <ReviewForm topic={topic!} reviewerName={selectedReviewer} />
        </div>

        <div className="w-[40%] flex flex-col gap-4">
          <BorderContainer otherClasses={"p-6"}>
            <p className="paragraph-semibold mb-4">
              Danh sách phiếu nhận xét Hội đồng 1
            </p>
            <div className="flex flex-col gap-2">
              {topic!.reviewTeachers.map((teacher, index) => (
                <CommentTicket
                  isActive={selectedReviewer === teacher}
                  key={`${topic!.id}_${teacher}_${index}`}
                  id={`${topic!.id}_${teacher}`}
                  onClick={() => {
                    setSelectedReviewer(teacher);
                  }}
                  reviewer={teacher}
                />
              ))}
            </div>
          </BorderContainer>
        </div>
      </div>
    </>
  );
};

export default page;
