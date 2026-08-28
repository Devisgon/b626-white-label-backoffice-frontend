import { z } from "zod";

export const deductionSchema = z.object({
  userId: z.string().uuid("Select a valid employee"),
  type: z.enum(["TAX", "INSURANCE", "LOAN", "OTHER"]),
  amount: z.coerce.number().min(0, "Amount cannot be negative"),
  isRecurring: z.boolean().default(true),
  note: z.string().trim().max(500).optional(),
});

export type DeductionFormInput = z.input<typeof deductionSchema>;
export type DeductionFormValues = z.output<typeof deductionSchema>;
