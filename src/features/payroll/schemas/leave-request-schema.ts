import { z } from "zod";

export const leaveRequestSchema = z
  .object({
    leaveType: z.enum(["SICK", "CASUAL", "PAID", "UNPAID"]),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().trim().max(500).optional(),
  })
  .refine((value) => value.endDate >= value.startDate, {
    message: "End date must be on or after the start date",
    path: ["endDate"],
  });

export type LeaveRequestFormInput = z.input<typeof leaveRequestSchema>;
export type LeaveRequestFormValues = z.output<typeof leaveRequestSchema>;
