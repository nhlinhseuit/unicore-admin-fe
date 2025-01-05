// TODO: SUBJECT

import { StudentDataItem } from "@/types/entity/Student";
import { ISubject, SubjectDataItem } from "@/types/entity/Subject";

export const convertToDataTableViKeys = (data: ISubject) => {
  return data.subjects.map((item, index) => {
    const requiredFields = {
      "Mã MH": item.code,
      "Hình thức thi LT GIỮA KỲ": item.midterm_format,
      "Thời gian thi LT GIỮA KỲ": item.midterm_time,
      "Hình thức thi LT CUỐI KỲ": item.final_format,
      "Thời gian thi CUỐI KỲ": item.final_time,
      "Hình thức thi THỰC HÀNH CUỐI KỲ": item.practical_format,
      "Trọng số QUÁ TRÌNH": item.coursework_weight,
      "Trọng số THỰC HÀNH": item.practical_weight,
      "Trọng số GIỮA KỲ": item.midterm_weight,
      "Trọng số CUỐI KỲ": item.final_weight,
      "Học kỳ": item.semester,
      "Năm học": item.year,
      "Tên môn học": item.name,
    };

    return {
      type: "subject",
      STT: index + 1,
      isDeleted: false,
      data: requiredFields,
    };
  });
};

export const convertToAPIDataTableStudent = ({
  data,
  organizationId,
}: {
  data: StudentDataItem[];
  organizationId: string;
}) => {
  const studentData = data.map((item, index) => {
    return {
      organization_id: organizationId,
      code: item.data["MSSV"],
      email: item.data["Email"],
      phone: item.data["SDT"],
      dob: item.data["Ngày sinh"],
      gender: item.data["Giới tính"],
      advisory_class: item.data["Lớp sinh hoạt"],

      // không biết academic batch là gì nên tạm để lớp sinh hoạt
      academic_batch: item.data["Lớp sinh hoạt"],
    };
  });

  return {
    students: studentData,
    organization_id: organizationId,
  };
};
