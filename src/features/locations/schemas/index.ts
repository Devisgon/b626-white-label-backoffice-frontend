import { z } from "zod";

export const activeLocationSchema = z.object({
  locationId: z.string().uuid("Please select a valid location."),
});

export type ActiveLocationFormValues = z.infer<typeof activeLocationSchema>;
