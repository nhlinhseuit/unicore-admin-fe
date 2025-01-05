import { BADGE_CRITERIA } from "@/constants";


//! endof SUBJECT



// TODO: PAGE INTERFACE

interface ReportDataOption {
  id: number;
  dateSchedule: Date | undefined;
  timeSchedule: string;
  value: number;
}

// TODO: DATA INTERFACE

export interface SidebarLink {
  id: string;
  imgURL: string;
  route: string;
  label: string;
}


// nếu giữ như này thì phải đổi lại tên vì đây là data của 1 student
export interface RegisterGroupData {
  "Mã nhóm": string;
  MSSV: string;
  SĐT: string;
  "Họ và tên": string;
}
export interface RegisterTopicData {
  "Tên đề tài": string;
  "Mô tả": string;
  "Mã nhóm": string;
  MSSV: string[];
  SĐT: string[];
  "Họ và tên": string[];
}
export interface TopicRegisterGroupData {
  MSSV: string;
  SĐT: string;
  "Họ và tên": string;
}

export interface TopicData {
  "Tên đề tài": string;
  "Mô tả": string;
}
export interface FileData {
  "Tên file": string;
  "Ngày sửa đổi": string;
  "Người sửa đổi": string;
}

export interface GradingExerciseData {
  "Điểm danh"?: boolean;
  // 1 là có nhóm
  // 0 là cá nhân
  "Hình thức": boolean;
  "Mã nhóm": string;
  "Bài nộp": string;
  "Trễ hạn": string;
  MSSV: string;
  "Họ và tên": string;
  Điểm: number;
  "Góp ý": string;
}

export interface GradingReportData {
  "Điểm danh": boolean;
  "Mã nhóm": string;
  "Bài nộp": string;
  "Trễ hạn": string;
  MSSV: string;
  "Họ và tên": string;
  Điểm: number;
  "Góp ý": string;
}

export interface ScoreTranscriptData {
  MSSV: string;
  Nhóm: string;
  "Họ và tên": string;
  "Quá trình": number;
  "Giữa kỳ": number;
  "Cuối kỳ": number;
  "Điểm trung bình": number;
}


export interface StudentData {
  MSSV: string;
  "Tài khoản": string;
  "Mật khẩu": string;
  "Họ và tên": string;
  "Lớp sinh hoạt": string;
  Email: string;
  SDT: string;
  "Giới tính": string;
  "Địa chỉ": string;
  "Ngày sinh": string;
}

export interface RegisterGroupDataItem {
  STT: string;
  isDeleted: boolean;
  data: RegisterGroupData;
}
export interface RegisterTopicDataItem {
  STT: string;
  isDeleted: boolean;
  data: RegisterTopicData;
}

export interface TopicRegisterGroupDataItem {
  STT: string;
  data: TopicRegisterGroupData;
}
export interface TopicDataItem {
  STT: string;
  isDeleted: boolean;
  data: TopicData;
}
export interface FileDataItem {
  STT: string;
  isDeleted: boolean;
  data: FileData;
}

export interface GradingExerciseDataItem {
  STT: string;
  isDeleted: boolean;
  data: GradingExerciseData;
}

export interface PostDataGradingDetailItem {
  id: string;
  creator: string;
  createdAt: string;
  title: string;
  fileName: string;
  scoreDetail: DataGradingDetailItem;
}
export interface DataGradingDetailItem {
  "Bài nộp": string;
  Điểm: number;
  "Góp ý": string;
  "Tỉ lệ điểm": number;
}

export interface GradingReportDataItem {
  STT: string;
  isDeleted: boolean;
  data: GradingReportData;
}
export interface ScoreTranscriptDataItem {
  STT: string;
  isDeleted: boolean;
  data: ScoreTranscriptData;
}
export interface GradeColumnPercentDataItem {
  "Quá trình": number;
  "Giữa kỳ": number;
  "Cuối kỳ": number;
}

export interface StudentDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: StudentData;
}

export interface OfficerPermissionDataItem {
  name: string;
  email: string;
  permissions: OfficerPermissionData;
}
