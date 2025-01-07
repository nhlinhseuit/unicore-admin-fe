export interface SubjectDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: SubjectData;
}

export interface SubjectData {
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
  "Học kỳ": number;
  "Năm học": number;
  "Tên môn học": string;
}

export interface ISubjectParams {
  organization_id: string;
  subjects: ISubjectParamsData[];
}

interface ISubjectParamsData {
  name: string;
  code: string;
  description: string;
  // metadata: IMetaData;
  // subjectId: string;
  semester: number;
  year: number;
  organization_id: string;
  midterm_format: string;
  practical_format: string;
  final_format: string;
  midterm_time: string;
  final_time: string;
  coursework_weight: number;
  midterm_weight: number;
  practical_weight: number;
  final_weight: number;
}

// interface IMetaData {
//   subjectId: string;
//   semester: number;
//   year: number;
//   organization_id: string;
//   midterm_format: string;
//   midterm_time: string;
//   practical_format: string;
//   final_format: string;
//   final_time: string;
//   coursework_weight: number;
//   midterm_weight: number;
//   practical_weight: number;
//   final_weight: number;
// }

export interface ISubjectResponseData {
  // subjectId: string;
  // semester: number;
  // year: number;

  id: string;
  code: string;
  name: string;
  semester?: number;
  year?: number;
  description?: null;
  organization_id: string;
  organization_name: string;
  midterm_format?: string;
  practical_format: string;
  final_format: string;
  coursework_weight: number;
  midterm_weight: number;
  practical_weight: number;
  final_weight: number;
  midterm_time: string;
  final_time: string;
}
