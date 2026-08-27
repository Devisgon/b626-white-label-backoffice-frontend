export type LotterySettlementStatus = "Pending" | "Settled" | "Cancelled";
export interface LotterySettlement { id: number; location_id: string | null; settlement_date: string; total_sales: number; total_payouts: number; net_amount: number; status: LotterySettlementStatus; notes: string | null; created_at: string; updated_at: string; deleted_at: string | null; }
export interface CreateLotterySettlementPayload { location_id?: string; settlement_date: string; total_sales: number; total_payouts: number; net_amount: number; status?: string; notes?: string; }
export type UpdateLotterySettlementPayload = Partial<CreateLotterySettlementPayload>;
