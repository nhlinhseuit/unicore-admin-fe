import { ThesisReportCouncilDataItem } from "@/types";
import BorderContainer from "../BorderContainer";
import StatusButton from "../Button/StatusButton";

interface Props {
  topic: ThesisReportCouncilDataItem;
  onClick?: () => void;
}

const ThesisTopic = (params: Props) => {
  return (
    <BorderContainer otherClasses="cursor-pointer" onClick={params.onClick}>
      <div className="rounded-[10px] relative flex-col w-full p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <p className="base-semibold">{params.topic.council}</p>
            <StatusButton
              orange={
                !(
                  params.topic.numberOfTopic ===
                  params.topic.numberOfCompletedGradingTopic
                )
              }
              green={
                params.topic.numberOfTopic ===
                params.topic.numberOfCompletedGradingTopic
              }
              text={
                params.topic.numberOfTopic ===
                params.topic.numberOfCompletedGradingTopic
                  ? "Đã hoàn thành nhập điểm"
                  : `Đã nhập điểm ${params.topic.numberOfCompletedGradingTopic}/${params.topic.numberOfTopic} đề tài`
              }
              smallText
              otherClasses="rounded-md ml-4"
            />
          </div>
          <div className="flex gap-2">
            <p className="body-semibold whitespace-nowrap">Thời gian:</p>
            <p className="body-regular">{params.topic.councilInfo}</p>
          </div>
          <div className="flex gap-2">
            <p className="body-semibold line-clamp-1 ">Số đề tài: </p>
            <p className="body-regular">{params.topic.numberOfTopic}</p>
          </div>
          <p className="body-semibold line-clamp-1 ">Hội đồng chấm: </p>
          <p className="body-regular line-clamp-1 ">
            - Chủ tịch: {params.topic.president}
          </p>
          <p className="body-regular line-clamp-1 ">
            - Thư ký: {params.topic.secretary}
          </p>
          <p className="body-regular line-clamp-1 ">
            - Ủy viên: {params.topic.member}
          </p>
        </div>
      </div>
    </BorderContainer>
  );
};

export default ThesisTopic;
