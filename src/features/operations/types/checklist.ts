export interface OperationsChecklist {
  id: number;
  item_name: string;
  checklist_type: string | null;
  location_id: string | null;
  checklist_date: string;
  completed_by: string | null;
  completed_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface CreateChecklistPayload {
  item_name: string;
  checklist_type?: string;
  location_id?: string;
  checklist_date: string;
  completed_by?: string;
  completed_at?: string;
  status?: string;
}
export type UpdateChecklistPayload = Partial<CreateChecklistPayload>;
