import { getNameOrganization } from "@/services/getNameOrganization";
import {
  ISubjectResponseData,
  SubjectData,
  SubjectDataItem,
} from "@/types/entity/Subject";

//? Data lấy về ở dạng ISubjectResponseData, cần convert sang SubjectDataItem

export const convertToDataTableSubjectsViKeys = (
  data: ISubjectResponseData[]
): SubjectDataItem[] => {
  return data.map((item, index) => {
    const requiredFields: SubjectData = {
      "Mã MH": item.code,
      "Hình thức thi LT GIỮA KỲ": item.midterm_format ?? "",
      "Thời gian thi LT GIỮA KỲ": parseInt(item.midterm_time ?? "0", 10), // Chuyển đổi sang số
      "Hình thức thi LT CUỐI KỲ": item.final_format ?? "",
      "Thời gian thi CUỐI KỲ": parseInt(item.final_time ?? "0", 10), // Chuyển đổi sang số
      "Hình thức thi THỰC HÀNH CUỐI KỲ": item.practical_format ?? "",
      "Trọng số QUÁ TRÌNH": item.coursework_weight || 0,
      "Trọng số THỰC HÀNH": item.practical_weight || 0,
      "Trọng số GIỮA KỲ": item.midterm_weight || 0,
      "Trọng số CUỐI KỲ": item.final_weight || 0,
      "Học kỳ": item.semester || 0,
      "Năm học": item.year || 0,
      "Tên môn học": item.name,
    };

    return {
      type: "subject",
      STT: (index + 1).toString(), // Chuyển `index` thành chuỗi
      isDeleted: false,
      data: requiredFields,
    };
  });
};

//? Data import vào ở dạng ISubject, cần convert sang ISubject

export const convertToAPIDataTableSubjects = ({
  data,
  organizationId,
}: {
  data: SubjectDataItem[];
  organizationId: string;
}) => {
  const subjectsData = data.map((item, index) => {
    return {
      description: "",
      organization_id: organizationId,
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
