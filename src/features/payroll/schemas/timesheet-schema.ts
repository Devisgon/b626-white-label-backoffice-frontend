import { z } from "zod";

export const timesheetNoteSchema = z.object({
  notes: z.string().trim().max(500).optional(),
});

export type TimesheetNoteFormValues = z.output<typeof timesheetNoteSchema>;
