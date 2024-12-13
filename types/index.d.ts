import { BADGE_CRITERIA } from "@/constants";

//TODO: reviewer-thesis-report

export interface ReviewTopicDataItem {
   id: string;
   isReviewd: int,
   nameTopic: string;
   supervisor: string[];
   studentIds: string[];
   studentNames: string[];
   council: string;
   councilInfo: string;
   reviewTeachers: string[];
}

// TODO: PAGE INTERFACE

export interface ReportDataOption {
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
export interface CentralizedExamData {
  "Mã môn học": string;
  "Mã lớp": string;
  "Tên môn học": string;
  "Mã GV": string;
  "Tên GV": string;
  "Sĩ số": string;
  "Ngày thi": string;
  Thứ: string;
  "Ca Thi": string;
  "Phòng Thi": string;
  "Hệ ĐT": string;
  "Đợt thi": string;
  "Lần thi": string;
  "Học kỳ": number;
  "Năm học": number;
}
export interface QAandProjectExamData {
  "Mã môn học": string;
  "Mã lớp": string;
  "Tên môn học": string;
  "Tên GV": string;
  "Ngày thi": string;
  Thứ: string;
  Tiết: string;
  "Phòng Thi": string;
  "Số SV": string;
  "Đợt thi": string;
  "Lần thi": string;
  "Học kỳ": number;
  "Năm học": number;
  "Hình thức": string;
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
export interface InternReviewDataItem {
  STT: string;
  data: InternReviewData;
}

export interface InternReviewData {
  MSSV: string;
  "Họ và tên": string;
  "Vị trí thực tập": string;
  "Công ty thực tập": string;
  "Giảng viên chấm điểm": string[];
  Điểm: string[];
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

export interface CourseDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: CourseData;
}
export interface CentralizedExamDataItem {
  type: "string";
  STT: string;
  isDeleted: boolean;
  data: CentralizedExamData;
}
export interface QAandProjectExamDataItem {
  type: "string";
  STT: string;
  isDeleted: boolean;
  data: QAandProjectExamData;
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

export interface OfficerPermissionDataItem {
  name: string;
  email: string;
  permissions: OfficerPermissionData;
}
