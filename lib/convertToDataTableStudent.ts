import { StudentData } from "@/types";
import { IStudentResponseData, StudentDataItem } from "@/types/entity/Student";

export const convertToDataTableStudentViKeys = (
  data: IStudentResponseData[]
): StudentDataItem[] => {
  return data.map((item, index) => {
    const requiredFields: StudentData = {
      MSSV: item.code,
      "Tài khoản": item.email,
      "Mật khẩu": "1",
      "Họ và tên": item.name,
      "Lớp sinh hoạt": item.advisory_class,
      Email: item.email,
      SDT: item.phone ?? "",
      "Giới tính": item.gender ? "Nam" : "Nữ",
      "Địa chỉ": item.address ?? "",
      "Ngày sinh": item.dob,
    };

    return {
      type: "student",
      STT: (index + 1).toString(),
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
      address: item.data["Địa chỉ"],
      phone: item.data["SDT"],
      dob: item.data["Ngày sinh"],
      gender: item.data["Giới tính"],
      advisory_class: item.data["Lớp sinh hoạt"],
      // KHÓA bao nhiêu
      academic_batch: parseInt(item.data["MSSV"].substring(0, 2)) - 5,
    };
  });

  return {
    students: studentData,
    organization_id: organizationId,
  };
};
