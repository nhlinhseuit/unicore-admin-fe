export interface CourseDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: CourseData;
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

export interface ICourse {
  organization_id: string;
  classes: ICourseData[];
}

interface ICourseData {
  code: string;
  name_subject?: string;
  subject_code: string;
  is_org_managed: boolean;
  teacher_code: string;
  teacher_name: string;
  type: string;
  credits: number;
  start_date: string;
  end_date: string;
  semester: number;
  year: number;
  note: string;
}
