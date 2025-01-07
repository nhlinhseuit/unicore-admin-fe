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
  "Vị trí": string;
  Email: string;
  SDT: string;
  "Giới tính": string;
  "Địa chỉ": string;
  "Ngày sinh": string;
}

export interface IOfficerParams {
  organization_id: string;
  officers: IOfficerDataParams[];
}

interface IOfficerDataParams {
  code: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: boolean;
  position: string;
}

export interface IOfficerResponse {
  id: string;
  code: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  dob: string;
  gender: boolean;
  position: string;
}
