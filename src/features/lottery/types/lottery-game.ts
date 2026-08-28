export type LotteryGameStatus = "Active" | "Inactive";

export interface LotteryGame {
  id: number;
  name: string;
  game_number: string | null;
  ticket_price: number;
  tickets_per_pack: number | null;
  status: LotteryGameStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateLotteryGamePayload {
  name: string;
  game_number?: string;
  ticket_price: number;
  tickets_per_pack?: number;
  status?: LotteryGameStatus;
}

export type UpdateLotteryGamePayload = Partial<CreateLotteryGamePayload>;

export interface LotteryGameStats {
  total: number;
  active: number;
  inactive: number;
}

export interface LotteryGameFilters {
  search?: string;
  status?: LotteryGameStatus | "all";
  page?: number;
  limit?: number;
}
