
import { TeacherDataItem } from "@/types/entity/Teacher";
import { ITeacher } from "@/types/entity/Teacher";
import { generateUsername } from "./utils";

export const convertToDataTableTeachersViKeys = (data: ITeacher) => {
  return data.teachers.map((item, index) => {
    const requiredFields = {
      "Mã cán bộ": item.code,
      "Tài khoản": generateUsername(item.name),
      "Mật khẩu": '1', 
      "Họ và tên": item.name,
      "Học vị": item.degree,
      "Hướng nghiên cứu": item.research_direction,
      "Quan tâm tìm hiểu": "@@@@@", // Không có trường tương ứng trong `ITeacher`
      Email: item.email,
      SDT: "@@@@@", // Không có trường tương ứng trong `ITeacher`
      "Giới tính": item.gender,
      "Địa chỉ": "@@@@@", // Không có trường tương ứng trong `ITeacher`
      "Ngày sinh": item.dob,
    };

    return {
      type: "teacher",
      STT: index + 1,
      isDeleted: false,
      data: requiredFields,
    };
  });
};

export const convertToAPIDataTableTeachers = ({
  data,
  organizationId,
}: {
  data: TeacherDataItem[];
  organizationId: string;
}) => {
  const teachersData = data.map((item, index) => {
    return {
      code: item.data["Mã cán bộ"],
      name: item.data["Họ và tên"],
      email: item.data["Email"],
      dob: item.data["Ngày sinh"],
      gender: item.data["Giới tính"],
      degree: item.data["Học vị"],
      research_direction: item.data["Hướng nghiên cứu"],
    };
  });

  return {
    teachers: teachersData,
    organization_id: organizationId,
  };
};
