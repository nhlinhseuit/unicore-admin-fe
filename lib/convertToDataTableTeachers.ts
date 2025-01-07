import { TeacherData, TeacherDataItem } from "@/types/entity/Teacher";
import { ITeacherResponseData } from "@/types/entity/Teacher";
import { generateUsername } from "./utils";

export const convertToDataTableTeachersViKeys = (
  data: ITeacherResponseData[]
): TeacherDataItem[] => {
  return data.map((item, index) => {
    const requiredFields: TeacherData = {
      "Mã cán bộ": item.code,
      "Tài khoản": generateUsername(item.name),
      "Mật khẩu": "1", // Giá trị mặc định
      "Họ và tên": item.name,
      "Học vị": item.degree,
      "Hướng nghiên cứu": item.research_direction ?? "", // Đảm bảo không bị undefined
      "Quan tâm tìm hiểu": item.research_concern ?? "", // Đảm bảo không bị undefined
      Email: item.email,
      SDT: item.phone ?? "", // Đảm bảo không bị undefined
      "Giới tính": item.gender ? "Nam" : "Nữ", // Chuyển đổi boolean sang string
      "Địa chỉ": item.address ?? "", // Đảm bảo không bị undefined
      "Ngày sinh": item.dob,
    };

    return {
      type: "teacher",
      STT: (index + 1).toString(), // Chuyển index thành string
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
  const teachersData = data.map((item) => {
    return {
      code: item.data["Mã cán bộ"],
      name: item.data["Họ và tên"],
      email: item.data["Email"],
      phone: item.data["SDT"],
      address: item.data["Địa chỉ"],
      dob: item.data["Ngày sinh"],
      gender: item.data["Giới tính"] === "Nam",
      degree: item.data["Học vị"],
      research_direction: item.data["Hướng nghiên cứu"],
      research_concern: item.data["Quan tâm tìm hiểu"],
    };
  });

  return {
    teachers: teachersData,
    organization_id: organizationId,
  };
};
