import React from "react";
import BorderContainer from "./BorderContainer";
import MiniButton from "./Button/MiniButton";

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface Props {
  item: Teacher;
  index: number;
  courseId: string;
  selectedStudents: Teacher[]; // Thêm prop nhận danh sách
  setSelectedStudents: React.Dispatch<React.SetStateAction<Teacher[]>>; // Thêm prop để set
}

const TeacherItem = (params: Props) => {
  const { item, index, courseId, selectedStudents, setSelectedStudents } =
    params;

  return (
    <div className="p-1 flex items-center gap-2">
      <p className="flex-grow text-left normal-regular -translate-y-[1px] text-dark200_light900 line-clamp-2">
        Giảng viên: {item.name}
      </p>
      <div className="mr-3 flex-center">
        <MiniButton
          key={1}
          value={1}
          icon={"/assets/icons/minus-white.svg"}
          bgColor="bg-[#F02021]"
          onClick={() => {
            setSelectedStudents((prev) =>
              prev.filter((student) => student.id !== item.id)
            );
          }}
          otherClasses={"!w-[18px] !h-[18px]"}
        />
      </div>
    </div>
  );
};

export default TeacherItem;
