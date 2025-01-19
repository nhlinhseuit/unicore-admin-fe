export interface IAnnouncementResponseData {
  id: string;
  name: string;
  description: string;
  type: string;
  categories: string[] | null;
  source_id: string;
  created_date: string; // ISO date string
  modified_date: string | null;
  created_by: string;
  created_email: string;
  modified_by: string | null;
}
