import { ReviewTopicDataItem } from "@/types";
import BorderContainer from "../BorderContainer";
import StatusButton from "../Button/StatusButton";

interface Props {
  topic: ReviewTopicDataItem;
}

const ThesisTopic = (params: Props) => {
  return (
    <BorderContainer otherClasses="cursor-pointer">
      <div className="rounded-[10px] relative flex-col w-full p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <p className="base-semibold">{params.topic.council}</p>
            <StatusButton
              orange={!params.topic.isReviewd}
              green={params.topic.isReviewd}
              text={params.topic.isReviewd ? "Đã nhận xét" : "Chưa nhận xét"}
              smallText
              otherClasses="rounded-md ml-4"
            />
          </div>
          <p className="small-regular line-clamp-1">
            {params.topic.councilInfo}
          </p>
          <p className="small-regular line-clamp-1 ">
            Hội đồng phản biện:{" "}
            {params.topic.reviewTeachers.map((reviewer) => reviewer).join(", ")}
          </p>
        </div>

        <div className="mt-4  flex justify-start items-center gap-2">
          <p className="base-semibold">Đề tài: {params.topic.nameTopic}</p>

          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - GVHD: {params.topic.supervisor.map((sup) => sup).join(", ")}
          </p>
        </div>

        {params.topic.studentIds.map((item, index) => (
          <p className="mt-4 small-regular line-clamp-1">
            {params.topic.studentIds[index]} -{" "}
            {params.topic.studentNames[index]}
          </p>
        ))}
      </div>
    </BorderContainer>
  );
};

export default ThesisTopic;
