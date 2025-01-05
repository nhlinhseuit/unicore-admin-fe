import { IStudent, StudentDataItem } from "@/types/entity/Student";

export const convertToDataTableStudentsInInternCourseViKeys = (
  data: IStudent
) => {
  // return data.students.map((item, index) => {
  //   const requiredFields = {
  //     MSSV: item.code,
  //     "Tài khoản": item.email,
  //     "Mật khẩu": "1",
  //     "Họ và tên": item.name,
  //     "Lớp sinh hoạt": item.advisory_class,
  //     Email: item.email,
  //     SDT: item.phone,
  //     "Giới tính": item.gender ? "Nam" : "Nữ",
  //     "Địa chỉ": "", // Không có trường tương ứng trong `IStudent`
  //     "Ngày sinh": item.dob,
  //   };

  //   return {
  //     type: "student",
  //     STT: index + 1,
  //     isDeleted: false,
  //     data: requiredFields,
  //   };
  // });
};

export const convertToDataTableStudentsInInternCourse = ({
  data,
  organizationId,
}: {
  data: StudentDataItem[];
  organizationId: string;
}) => {
  // const studentData = data.map((item, index) => {
  //   return {
  //     organization_id: organizationId,
  //     code: item.data["MSSV"],
  //     email: item.data["Email"],
  //     phone: item.data["SDT"],
  //     dob: item.data["Ngày sinh"],
  //     gender: item.data["Giới tính"],
  //     advisory_class: item.data["Lớp sinh hoạt"],

  //     // không biết academic batch là gì nên tạm để lớp sinh hoạt
  //     academic_batch: item.data["Lớp sinh hoạt"],
  //   };
  // });

  // return {
  //   students: studentData,
  //   organization_id: organizationId,
  // };
};
