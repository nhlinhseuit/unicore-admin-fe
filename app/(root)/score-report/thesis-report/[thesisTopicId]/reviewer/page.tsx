"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import ReviewForm from "@/components/shared/ScoreReport/ReviewForm";
import { mockThesisReviewTopic } from "@/mocks";
import { usePathname } from "next/navigation";

const page = () => {
  const pathName = usePathname();
  
  const segments = pathName.split("/");
  const topicId = segments[segments.length - 2]; // Lấy phần tử áp cuối
  const prevRoute = segments.slice(0, -2).join("/");

  //! API: Khi gọi API ở đây thì lấy data get được bỏ vào store, và lấy ra để find ở đây
  const topic = mockThesisReviewTopic.find((item) => item.id === topicId);
  const reviewer = topic?.reviewTeacher ?? ''

  return (
    <>
      <BackToPrev
        text="Quay lại danh sách đề tài"
        linkPrev={prevRoute}
      />
      <div className="flex gap-4">
        <div>
          <ReviewForm topic={topic!} ownerName={reviewer} isReviewer={true}/>
        </div>
      </div>
    </>
  );
};

export default page;
