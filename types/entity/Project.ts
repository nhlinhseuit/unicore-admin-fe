import { ITTopicResponseData } from "./Topic";

export interface TopicDataItem {
  STT: string;
  type: string;
  isDeleted: boolean;
  data: TopicData;
}

export interface TopicData {
  "GV phụ trách"?: string;

  "Mã đề tài": string;
  "Tên đề tài tiếng Việt": string;
  "Tên đề tài tiếng Anh": string;
  "Mô tả": string;
  "Mã nhóm": string;
  MSSV: string[];
  SĐT: string[];
  "Họ và tên": string[];
}

export interface ITProjectResponseData {
  id: string;
  weight: number;
  name: string;
  description: string;
  topics: ITTopicResponseData[];
  eventType: string;
  created_date: string; // ISO date string
  modified_date: string | null;
  created_by: string;
  modified_by: string | null;
  in_group: boolean;
  weight_type: string;
  class_id: string;
  subclass_code: string;
  allow_grade_review: boolean;
  review_times: number;
  start_date: string | null;
  allow_topic_suggestion: boolean;
}

