
import { generateUsername } from "./utils";
import { IOfficer, OfficerDataItem } from "@/types/entity/Officer";

export const convertToDataTableOfficersViKeys = (data: IOfficer) => {
  return data.teachers.map((item, index) => {
    const requiredFields = {
      "Mã giáo vụ": item.code,
      "Tài khoản": generateUsername(item.name),
      "Mật khẩu": '1', 
      "Họ và tên": item.name,
      "Vị trí": item.position,
      Email: item.email,
      SDT: "@@@@@", // Không có trường tương ứng trong `IOfficer`
      "Giới tính": item.gender,
      "Địa chỉ": "@@@@@", // Không có trường tương ứng trong `IOfficer`
      "Ngày sinh": item.dob,
    };

    return {
      type: "officer",
      STT: index + 1,
      isDeleted: false,
      data: requiredFields,
    };
  });
};

export const convertToAPIDataTableOfficers = ({
  data,
  organizationId,
}: {
  data: OfficerDataItem[];
  organizationId: string;
}) => {
  const teachersData = data.map((item, index) => {
    return {
      code: item.data["Mã giáo vụ"],
      name: item.data["Họ và tên"],
      email: item.data["Email"],
      dob: item.data["Ngày sinh"],
      gender: item.data["Giới tính"],
      position: item.data["Vị trí"],
    };
  });

  return {
    teachers: teachersData,
    organization_id: organizationId,
  };
};
