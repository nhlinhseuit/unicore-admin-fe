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

export interface ITeacherParams {
  organization_id: string;
  teachers: ITeacherParamsData[];
}

interface ITeacherParamsData {
  code: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: boolean;
  role: string;
  degree: string;
  organization_id: string;
  research_direction: string;
  research_concern: string;
}
export interface ITeacherResponseData {
  id: string;
  code: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dob: string;
  gender: boolean;
  role: string;
  degree: string;
  organization_id: string;
  research_direction?: string;
  research_concern: string;
}
