import { z } from "zod";

export const payrollProfileSchema = z.object({
  userId: z.string().uuid("Select a valid employee"),
  payType: z.enum(["HOURLY", "SALARY"]),
  baseRate: z.coerce.number().min(0, "Base rate cannot be negative"),
  overtimeRate: z.union([z.literal(""), z.coerce.number().min(0)]).optional(),
  bankAccountId: z
    .union([z.literal(""), z.string().uuid("Select a valid bank account")])
    .optional(),
});

export type PayrollProfileFormInput = z.input<typeof payrollProfileSchema>;
export type PayrollProfileFormValues = z.output<typeof payrollProfileSchema>;
