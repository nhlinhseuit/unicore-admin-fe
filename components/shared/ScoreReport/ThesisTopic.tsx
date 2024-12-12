import BorderContainer from "../BorderContainer";

interface Props {
  id: string;
  name: string;
  supervisor: string;
  studentIds: string[];
  studentNames: string[];
  reportAt: string;
  onClick: () => void;
}

const ThesisTopic = (params: Props) => {
  return (
    <BorderContainer otherClasses="cursor-pointer" onClick={params.onClick}>
      <div className=" rounded-[10px] relative flex-col w-full p-6">
        <div className="flex justify-start items-center gap-2">
          <p className="base-semibold">{params.name}</p>
          <p className="small-regular italic text-[#636363] line-clamp-1 ">
            - GVHD: {params.supervisor}
          </p>
        </div>
        {params.studentIds.map((item, index) => (
          <p className="mt-4 small-regular line-clamp-1 ">
            {params.studentIds[index]} - {params.studentNames[index]}
          </p>
        ))}
        <p className="mt-4 small-regular line-clamp-1 ">
          Bảo vệ Khóa luận ngày: {params.reportAt}
        </p>
      </div>
    </BorderContainer>
  );
};

export default ThesisTopic;
