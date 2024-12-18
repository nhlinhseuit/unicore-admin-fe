
// TODO: SUBJECT

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

export const convertToAPIDataTable = ({
  data,
  organizationId,
}: {
  data: SubjectDataItem[];
  organizationId: string;
}) => {
  const subjectsData = data.map((item, index) => {
    return {
      organization_id: organizationId,
      description: "",
      code: item.data["Mã MH"],
      midterm_format: item.data["Hình thức thi LT GIỮA KỲ"],
      midterm_time: item.data["Thời gian thi LT GIỮA KỲ"],
      final_format: item.data["Hình thức thi LT CUỐI KỲ"],
      final_time: item.data["Thời gian thi CUỐI KỲ"],
      practical_format: item.data["Hình thức thi THỰC HÀNH CUỐI KỲ"],
      coursework_weight: item.data["Trọng số QUÁ TRÌNH"],
      practical_weight: item.data["Trọng số THỰC HÀNH"],
      midterm_weight: item.data["Trọng số GIỮA KỲ"],
      final_weight: item.data["Trọng số CUỐI KỲ"],
      semester: item.data["Học kỳ"],
      year: item.data["Năm học"],
      name: item.data["Tên môn học"],
    };
  });

  return {
    subjects: subjectsData,
    organization_id: organizationId,
  };
};
