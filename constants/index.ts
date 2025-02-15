import { SidebarLink } from "@/types";
import { CourseType } from "@/types/entity/Course";

export const itemsPerPage = 30;
export const maxStudentPerGroup = 2;
export const minStudentPerGroup = 1;
export const itemsPerPageRegisterTable = 20;
export const itemsPerPageTopicTable = 20;
export const MAX_FILE_VALUE = 25; // 25MB
export const MAX_FILE_SIZE = MAX_FILE_VALUE * 1024 * 1024; // 25MB
export const ALLOWED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/pdf", // .pdf
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls
  "text/plain", // .txt
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];
export const MAX_CATEGORIES = 5; // Số danh mục tối đa chọn khi đăng thông báo

export const statusThesis = [
  { id: 1, value: "Đạt" },
  { id: 2, value: "Không đạt" },
];
export const ratingThesis = [
  { id: 1, value: "Xuất sắc" },
  { id: 2, value: "Giỏi" },
  { id: 3, value: "Khá" },
  { id: 4, value: "Trung bình" },
  { id: 5, value: "kém" },
];

// TODO: NAVBAR TAB
export const DepartmentAnnouncementsTabItems = [
  { value: "listAnnouncements", label: "Danh sách thông báo", route: "/" },
  {
    value: "createAnnouncement",
    label: "Tạo thông báo",
    route: "/create-announcement",
  },
];

export const DepartmentCoursesTabItems = [
  { value: "listCourses", label: "Danh sách lớp học", route: "/courses" },
  {
    value: "joinedCourses",
    label: "Lớp học đã tham gia",
    route: "/courses/joined",
  },
];

export const DepartmentSettingTabItems = [
  { value: "settingNoti", label: "Cài đặt", route: "/setting" },
];

export const DepartmentSubjectsTabItems = [
  { value: "listSubjects", label: "Danh sách môn học", route: "/subjects" },
];
export const DepartmentTeachersTabItems = [
  { value: "listTeachers", label: "Danh sách giảng viên", route: "/teachers" },
];
export const DepartmentOfficersTabItems = [
  { value: "listTeachers", label: "Danh sách giáo vụ", route: "/officers" },
];
export const DepartmentStudentsTabItems = [
  { value: "listStudents", label: "Danh sách sinh viên", route: "/students" },
];

export const DepartmentCourseTabItems = [
  { value: "generalPost", label: "Thông báo chung", route: "/" },
  {
    value: "events",
    label: "Sự kiện",
    route: "/events",
  },
  {
    value: "scoreTranscript",
    label: "Bảng điểm",
    route: "/score-transcript",
  },
  // {
  //   value: "files",
  //   label: "Lưu trữ",
  //   route: "/files",
  // },
  {
    value: "setting",
    label: "Cài đặt",
    route: "/setting",
  },
];

export const BigExerciseTabItems = [
  { value: "generalPost", label: "Thông báo chung", route: "/" },
  {
    value: "happeningEvent",
    label: "Hoạt động đang diễn ra",
    route: "/happening-event",
  },
  {
    value: "uploadTopic",
    label: "Danh sách đề tài",
    route: "/upload-topic",
  },
  {
    value: "registerTopic",
    label: "Đăng ký đề tài",
    route: "/register-topic",
  },
  {
    value: "approveTopic",
    label: "Duyệt đề xuất đề tài",
    route: "/approve-topic",
  },
  {
    value: "scoreTranscript",
    label: "Bảng điểm",
    route: "/score-transcript",
  },
  // {
  //   value: "files",
  //   label: "Lưu trữ",
  //   route: "/files",
  // },
  {
    value: "setting",
    label: "Cài đặt",
    route: "/setting",
  },
];

export const BigExerciseInternTabItems = [
  { value: "generalPost", label: "Thông báo chung", route: "/" },
  {
    value: "happeningEvent",
    label: "Hoạt động đang diễn ra",
    route: "/happening-event",
  },
  {
    value: "internInfo",
    label: "Điền thông tin thực tập",
    route: "/intern-info",
  },
  {
    value: "scoreTranscript",
    label: "Bảng điểm",
    route: "/score-transcript",
  },
  {
    value: "setting",
    label: "Cài đặt",
    route: "/setting",
  },
];

// TODO: OTHERS

export enum Action {
  create,
  edit,
  editing,
  delete,
  none,
}

export const AnnouncementTypesNotRegularCourse = [
  { route: "/create-announcement", label: "Tạo thông báo" },
  { route: "/create-report", label: "Tạo báo cáo đồ án" },
];

export enum RegisterTopicTableType {
  registerTopic,
  approveTopic,
  // !: GỘP SAU:
  registerGroup,
}

export enum DataTableType {
  Course = "Lớp học",
  Subject = "Môn học",
  Student = "Sinh viên",
  Teacher = "Giảng viên",
  Officer = "Giáo vụ",
  Exam = "Lịch thi",
}

export enum FilterType {
  SortNewer,
  SortOlder,
  DetailFilter,
  None,
}

export const ListCourseColors = [
  { type: CourseType.RegularCourseWithProject, color: "#e8f7ff" },
  { type: CourseType.InternCourse, color: "#fef5e5" },
  { type: CourseType.ProjectCourse, color: "#ecf2ff" },
  { type: CourseType.ThesisCourse, color: "#ecf2ff" },
];

export const DepartmentScoreReportTabItems = [
  {
    value: "thesisReviewTicket",
    label: "Phiếu nhận xét Khóa luận tốt nghiệp",
    route: "/score-report/thesis-review-ticket",
  },
  {
    value: "scoreThesisReport",
    label: "Nhập điểm hội đồng Khóa luận tốt nghiệp",
    route: "/score-report/thesis-report",
  },
  {
    value: "scoreInternReport",
    label: "Nhập điểm hội đồng Thực tập doanh nghiệp",
    route: "/score-report/intern-report",
  },
];

export const ReviewThesisFilterType = [
  { id: 0, value: "Đề tài chưa nhận xét" },
  { id: 1, value: "Đề tài đã nhận xét" },
];

export const GradingThesisTopicFilterType = [
  { id: 0, value: "Đã hoàn thành" },
  { id: 1, value: "Chưa hoàn thành" },
];

export const AnnouncementsFilterType = [
  { id: 0, value: "Thông báo đã đăng" },
  { id: 1, value: "Thông báo đã ẩn" },
  { id: 1, value: "Thông báo đã tạo" },
];

export enum DetailFilter {
  Semester,
  Year,
  Subject,
  Teacher,
}

export enum DetailFilterScore {
  Semester,
  Year,
  Subject,
  Teacher,
  Course,
}

export const FilterTable = [
  { type: "sort" },
  {
    type: "detailFilter",
    data: [
      { type: "semester" },
      { type: "year" },
      { type: "subject" },
      { type: "teacher" },
    ],
  },
];

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const TableDataMoreComponentItems = [
  { value: "edit", label: "Chỉnh sửa" },
  { value: "delete", label: "Xóa" },
];

export const FileTableDataMoreComponentItems = [
  { value: "rename", label: "Đổi tên" },
  { value: "download", label: "Tải xuống" },
];
export const FileTableDataOnlyViewMoreComponentItems = [
  { value: "download", label: "Tải xuống" },
];

export const CourseItemMoreComponentItems = [{ value: "hide", label: "Ẩn" }];

// TODO: SIDEBAR
export const sidebarDepartmentLinks: SidebarLink[] = [
  {
    id: "1",
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    id: "2",
    imgURL: "/assets/icons/teachers.svg",
    route: "/teachers",
    label: "Giảng viên",
  },
  {
    id: "3",
    imgURL: "/assets/icons/students.svg",
    route: "/students",
    label: "Sinh viên",
  },
  {
    id: "4",
    imgURL: "/assets/icons/subjects.svg",
    route: "/subjects",
    label: "Môn học",
  },
  {
    id: "5",
    imgURL: "/assets/icons/courses.svg",
    route: "/courses",
    label: "Lớp học",
  },
  // {
  //   id: "6",
  //   imgURL: "/assets/icons/score-transcript.svg",
  //   route: "/score-transcript",
  //   label: "Bảng điểm",
  // },
  {
    id: "6",
    imgURL: "/assets/icons/teachers.svg",
    route: "/officers",
    label: "Giáo vụ",
  },
  {
    id: "7",
    imgURL: "/assets/icons/reward.svg",
    route: "/score-report",
    label: "Chấm điểm báo cáo",
  },
  {
    id: "8",
    imgURL: "/assets/icons/setting.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];

export const sidebarTeacherLinks: SidebarLink[] = [
  {
    id: "1",
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    id: "2",
    imgURL: "/assets/icons/users.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    id: "3",
    imgURL: "/assets/icons/star.svg",
    route: "/timetable",
    label: "Lịch biểu",
  },
  {
    id: "4",
    imgURL: "/assets/icons/suitcase.svg",
    route: "/messages",
    label: "Tin nhắn",
  },
  {
    id: "5",
    imgURL: "/assets/icons/user.svg",
    route: "/bookmarks",
    label: "Dấu trang",
  },
  {
    id: "6",
    imgURL: "/assets/icons/user.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];

export const sidebarStudentLinks: SidebarLink[] = [
  {
    id: "1",
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    id: "2",
    imgURL: "/assets/icons/users.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    id: "3",
    imgURL: "/assets/icons/star.svg",
    route: "/timetable",
    label: "Thời khóa biểu",
  },
  {
    id: "4",
    imgURL: "/assets/icons/suitcase.svg",
    route: "/messages",
    label: "Tin nhắn",
  },
  {
    id: "5",
    imgURL: "/assets/icons/user.svg",
    route: "/bookmarks",
    label: "Dấu trang",
  },
  {
    id: "6",
    imgURL: "/assets/icons/user.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];
