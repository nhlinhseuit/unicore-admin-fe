import { StudentDataItem } from "@/types/entity/Student";

export const convertToAPIDataTableStudentsInCourse = ({
  data,
  class_id,
  subclass_code,
  leader_code,
}: {
  data: StudentDataItem[];
  class_id: string;
  subclass_code: string;
  leader_code: string;
}) => {
  const student_codes = data.map((item, index) => {
    return item.data["MSSV"];
  });

  return {
    class_id,
    subclass_code,
    leader_code,
    student_codes: student_codes,
  };
};
