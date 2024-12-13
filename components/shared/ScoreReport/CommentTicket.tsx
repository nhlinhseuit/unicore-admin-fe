import BorderContainer from "../BorderContainer";

interface Props {
  id: string;
  isActive: boolean;
  reviewer: string;
  onClick: () => void;
}

const ReviewPost = (params: Props) => {
  return (
    <BorderContainer
      otherClasses={`cursor-pointer ${params.isActive ? "!bg-[#ecf2ff]" : ""}`}
      onClick={params.onClick}
    >
      <div className=" rounded-[10px] relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <p
            className={`base-medium ${
              params.isActive ? "!text-[#5d87ff]" : ""
            }`}
          >
            Phiếu nhận xét của GV: {params.reviewer}
          </p>
        </div>
      </div>
    </BorderContainer>
  );
};

export default ReviewPost;
