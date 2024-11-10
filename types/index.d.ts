import { BADGE_CRITERIA } from "@/constants";

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface CourseData {
  "Mã môn học": string;
  "Mã lớp": string;
  "Tên môn học": string;
  "Mã GV": string;
  "Tên GV": string;
  "Sĩ số": string;
  "Số TC": string;
  HTGD: string;
  "Khoa quản lý": boolean;
  "Ngày BĐ": string;
  "Ngày KT": string;
  "Học kỳ": number;
  "Năm học": number;
}

// nếu giữ như này thì phải đổi lại tên vì đây là data của 1 student
export interface RegisterGroupData {
  "Mã nhóm": string;
  "Tên nhóm": string;
  MSSV: string;
  SĐT: string;
  "Họ và tên": string;
}

export interface TopicData {
  "Tên đề tài": string;
  "Mô tả": string;
  "GV phụ trách": string;
}

export interface GradingExerciseData {
  // 1 là có nhóm
  // 0 là cá nhân
  "Hình thức": boolean;
  "Mã nhóm": string;
  "Tên nhóm": string;
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
  "Tên nhóm": string;
  "Bài nộp": string;
  "Trễ hạn": string;
  MSSV: string;
  "Họ và tên": string;
  Điểm: number;
  "Góp ý": string;
}

export interface SubjectData {
  "Khoa QL": string;
  "Mã MH": string;
  "Hình thức thi LT GIỮA KỲ": string;
  "Thời gian thi LT GIỮA KỲ": number;
  "Hình thức thi LT CUỐI KỲ": string;
  "Thời gian thi CUỐI KỲ": number;
  "Hình thức thi THỰC HÀNH CUỐI KỲ": string;
  "Trọng số QUÁ TRÌNH": number;
  "Trọng số THỰC HÀNH": number;
  "Trọng số GIỮA KỲ": number;
  "Trọng số CUỐI KỲ": number;
  "Hệ ĐT": string;
  "Lớp CDIO": string;
  "Học kỳ": number;
  "Năm học": number;
  "Tên môn học": string;
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

export interface RegisterGroupDataItem {
  STT: string;
  isDeleted: boolean;
  data: RegisterGroupData;
}
export interface TopicDataItem {
  STT: string;
  isDeleted: boolean;
  data: TopicData;
}

export interface GradingExerciseDataItem {
  STT: string;
  isDeleted: boolean;
  data: GradingExerciseData;
}
export interface GradingReportDataItem {
  STT: string;
  isDeleted: boolean;
  data: GradingReportData;
}

export interface CourseDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: CourseData;
}

export interface SubjectDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: SubjectData;
}
export interface StudentDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: StudentData;
}
export interface TeacherDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: TeacherData;
}
