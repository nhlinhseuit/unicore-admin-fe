export interface OfficerDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: OfficerData;
}

export interface OfficerData {
  "Mã giáo vụ": string;
  "Tài khoản": string;
  "Mật khẩu": string;
  "Họ và tên": string;
  Email: string;
  SDT: string;
  "Giới tính": string;
  "Địa chỉ": string;
  "Ngày sinh": string;
  "Vị trí": string;
}

export interface IOfficer {
  organization_id: string;
  teachers: IOfficerData[];
}

interface IOfficerData {
  code: string;
  name: string;
  email: string;
  dob: string;
  gender: boolean;
  position: string;
}
