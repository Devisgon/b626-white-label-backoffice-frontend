export interface OperationsShift {
  id: number;
  staff_name: string;
  location_id: string | null;
  opening_float: number;
  closing_cash: number | null;
  shift_start: string;
  shift_end: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface CreateShiftPayload {
  staff_name: string;
  location_id?: string;
  opening_float: number;
  closing_cash?: number;
  shift_start: string;
  shift_end?: string;
  status?: string;
}
export type UpdateShiftPayload = Partial<CreateShiftPayload>;
