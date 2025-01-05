

import { CourseDataItem, ICourse } from "@/types/entity/Course";

//? Data lấy về ở dạng ICourse, cần convert sang CourseDataItem

export const convertToDataTableCoursesViKeys = (data: ICourse) => {
  return data.classes.map((item, index) => {
    const requiredFields = {
      "Mã môn học": item.subject_code,
      "Mã lớp": item.code,
      "Tên môn học": item.name_subject ?? '',
      "Mã GV": item.teacher_code,
      "Tên GV": item.teacher_name,
      "HTGD": item.type,
      "Số TC": item.credits.toString(),
      "Khoa quản lý": item.is_org_managed ? "Có" : "Không",
      "Ngày BĐ": item.start_date,
      "Ngày KT": item.end_date,
      "Học kỳ": item.semester,
      "Năm học": item.year,
    };

    return {
      type: "course",
      STT: index + 1,
      isDeleted: false,
      data: requiredFields,
    };
  });
};


//? Data import vào ở dạng ICourse, cần convert sang ICourse
export const convertToAPIDataTableCourses = ({
  data,
  organizationId,
}: {
  data: CourseDataItem[];
  organizationId: string;
}) => {
  const classesData = data.map((item, index) => {
    return {
      organization_id: organizationId,
      subject_code: item.data["Mã môn học"],
      code: item.data["Mã lớp"],
      name: item.data["Tên môn học"],
      teacher_code: item.data["Mã GV"],
      teacher_name: item.data["Tên GV"],
      type: item.data["HTGD"],
      is_org_managed: item.data["Khoa quản lý"],
      credits: parseInt(item.data["Số TC"], 10) || 0, // Chuyển số tín chỉ về số nguyên
      start_date: item.data["Ngày BĐ"],
      end_date: item.data["Ngày KT"],
      semester: item.data["Học kỳ"],
      year: item.data["Năm học"],
      note: "", // Không có trường tương ứng trong model
    };
  });

  return {
    classes: classesData,
    organization_id: organizationId,
  };
};
