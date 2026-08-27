import { z } from "zod";
export const maintenanceLogSchema = z.object({ title: z.string().min(1, "Title is required"), description: z.string().optional(), location_id: z.string().uuid().optional().or(z.literal("")), priority: z.string().optional(), reported_by: z.string().optional(), status: z.string().optional() });
export type MaintenanceLogFormInput = z.input<typeof maintenanceLogSchema>;
export type MaintenanceLogFormValues = z.output<typeof maintenanceLogSchema>;

