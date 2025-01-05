export interface TeacherDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: TeacherData;
}

export interface TeacherData {
  "Mã cán bộ": string;
  "Tài khoản": string;
  "Mật khẩu": string;
  "Họ và tên": string;
  "Học vị": string;
  "Hướng nghiên cứu": string;
  "Quan tâm tìm hiểu": string;
  Email: string;
  SDT: string;
  "Giới tính": string;
  "Địa chỉ": string;
  "Ngày sinh": string;
}

export interface ITeacher {
  organization_id: string;
  teachers: ITeacherData[];
}

interface ITeacherData {
  code: string;
  name: string;
  email: string;
  dob: string;
  gender: boolean;
  degree: string;
  research_direction: string;
}
