export interface SubjectDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: SubjectData;
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

export interface ISubject {
  organization_id: string;
  subjects: ISubjectData[];
}

interface ISubjectData {
  name: string;
  code: string;
  description: string;
  semester: number;
  year: number;
  organization_id: string;
  midterm_format: string;
  midterm_time: string;
  practical_format: string;
  final_format: string;
  final_time: string;
  coursework_weight: number;
  midterm_weight: number;
  practical_weight: number;
  final_weight: number;
}
