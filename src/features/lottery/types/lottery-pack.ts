export type LotteryPackStatus =
  | "In Stock"
  | "Active"
  | "Completed"
  | "Inactive";

export interface LotteryPack {
  id: number;
  game_id: number;
  game_name: string;
  pack_number: string;
  start_ticket_no: number;
  end_ticket_no: number;
  activated_at: string | null;
  location_id: string | null;
  status: LotteryPackStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateLotteryPackPayload {
  game_id: number;
  pack_number: string;
  start_ticket_no: number;
  end_ticket_no: number;
  activated_at?: string;
  location_id?: string;
  status?: LotteryPackStatus;
}

export type UpdateLotteryPackPayload =
  Partial<CreateLotteryPackPayload>;

export interface LotteryPackStats {
  total: number;
  active: number;
  inactive: number;
}

export interface LotteryPackFilters {
  search?: string;
  game_id?: number;
  status?: LotteryPackStatus | "all";
  page?: number;
  limit?: number;
}