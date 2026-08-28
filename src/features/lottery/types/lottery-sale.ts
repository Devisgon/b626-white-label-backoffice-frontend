export type LotterySaleStatus = "Completed" | "Pending" | "Cancelled";
export interface LotterySale {
  id: number;
  pack_id: number;
  pack_number: string;
  opening_ticket_no: number;
  closing_ticket_no: number;
  tickets_sold: number;
  total_amount: number;
  payout_amount: number;
  shift: string | null;
  sale_date: string;
  status: LotterySaleStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface CreateLotterySalePayload {
  pack_id: number;
  opening_ticket_no: number;
  closing_ticket_no: number;
  tickets_sold: number;
  total_amount: number;
  payout_amount?: number;
  shift?: string;
  sale_date: string;
  status?: string;
}
export type UpdateLotterySalePayload = Partial<CreateLotterySalePayload>;
