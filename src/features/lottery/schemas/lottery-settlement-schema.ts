import { z } from "zod";
export const lotterySettlementSchema = z.object({ location_id: z.string().uuid("Select a valid location").optional().or(z.literal("")), settlement_date: z.string().min(1, "Settlement date is required"), total_sales: z.coerce.number().min(0), total_payouts: z.coerce.number().min(0), net_amount: z.coerce.number().min(0), status: z.string().optional(), notes: z.string().optional() });
export type LotterySettlementFormInput = z.input<typeof lotterySettlementSchema>;
export type LotterySettlementFormValues = z.output<typeof lotterySettlementSchema>;
