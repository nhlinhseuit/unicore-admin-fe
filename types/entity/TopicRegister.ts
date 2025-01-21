
export interface ITopicRegisterResponseData {
  id: string;
  start_register_date: string; // ISO format date string
  end_register_date: string; // ISO format date string
  max_size: number;
  min_size: number;
}
