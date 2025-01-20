import { generateUsername } from "./utils";
import {
  IOfficerResponse,
  OfficerData,
  OfficerDataItem,
} from "@/types/entity/Officer";

export const convertToDataTableOfficersViKeys = (
  data: IOfficerResponse[]
): OfficerDataItem[] => {
  return data.map((item, index) => {
    const requiredFields: OfficerData = {
      "Mã giáo vụ": item.code,
      "Tài khoản": generateUsername(item.name),
      "Mật khẩu": "1",
      "Họ và tên": item.name,
      "Vị trí": item.position,
      Email: item.email,
      SDT: item.phone || "", // Xử lý khi phone là undefined
      "Giới tính": item.gender ? "Nam" : "Nữ", // Chuyển boolean thành string
      "Địa chỉ": item.address,
      "Ngày sinh": item.dob,
    };

    return {
      type: "officer",
      STT: (index + 1).toString(), // Chuyển số thành chuỗi
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
  const officersData = data.map((item, index) => {
    return {
      organization_id: organizationId,
      code: item.data["Mã giáo vụ"],
      name: item.data["Họ và tên"],
      address: item.data["Địa chỉ"],
      phone: item.data["SDT"],
      email: item.data["Email"],
      dob: item.data["Ngày sinh"],
      // gender: "name",
      gender: item.data["Giới tính"] === "Nam",
      position: item.data["Vị trí"],
    };
  });

  return {
    staff: officersData,
    organization_id: organizationId,
  };
};
