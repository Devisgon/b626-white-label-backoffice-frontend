import { z } from "zod";
export const lotterySaleSchema = z
  .object({
    pack_id: z.coerce.number().int().min(1, "Pack is required"),
    opening_ticket_no: z.coerce.number().int().min(0),
    closing_ticket_no: z.coerce.number().int().min(0),
    tickets_sold: z.coerce.number().int().min(0),
    total_amount: z.coerce.number().min(0),
    payout_amount: z
      .union([z.literal(""), z.coerce.number().min(0)])
      .optional(),
    shift: z.string().optional(),
    sale_date: z.string().min(1, "Sale date is required"),
    status: z.string().optional(),
  })
  .refine((data) => data.closing_ticket_no >= data.opening_ticket_no, {
    message: "Closing ticket must be after opening ticket",
    path: ["closing_ticket_no"],
  });
export type LotterySaleFormInput = z.input<typeof lotterySaleSchema>;
export type LotterySaleFormValues = z.output<typeof lotterySaleSchema>;
