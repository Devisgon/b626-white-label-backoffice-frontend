import { z } from "zod";
export const shiftSchema = z.object({ staff_name: z.string().min(1, "Staff name is required"), location_id: z.string().uuid().optional().or(z.literal("")), opening_float: z.coerce.number().min(0), closing_cash: z.union([z.literal(""), z.coerce.number().min(0)]).optional(), shift_start: z.string().min(1, "Shift start is required"), shift_end: z.string().optional(), status: z.string().optional() });
export type ShiftFormInput = z.input<typeof shiftSchema>;
export type ShiftFormValues = z.output<typeof shiftSchema>;

