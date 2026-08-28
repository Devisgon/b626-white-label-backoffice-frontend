import { z } from "zod";
export const printChecksSchema = z.object({
  transactionIds: z
    .array(z.string().uuid())
    .min(1, "Select at least one check"),
  startingCheckNumber: z.string().min(1, "Starting check number is required"),
});
export type PrintChecksFormValues = z.infer<typeof printChecksSchema>;
