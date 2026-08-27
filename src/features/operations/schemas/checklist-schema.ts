import { z } from "zod";
export const checklistSchema = z.object({ item_name: z.string().min(1, "Item name is required"), checklist_type: z.string().optional(), location_id: z.string().uuid().optional().or(z.literal("")), checklist_date: z.string().min(1, "Checklist date is required"), completed_by: z.string().optional(), completed_at: z.string().optional(), status: z.string().optional() });
export type ChecklistFormInput = z.input<typeof checklistSchema>;
export type ChecklistFormValues = z.output<typeof checklistSchema>;

