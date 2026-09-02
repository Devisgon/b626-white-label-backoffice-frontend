import { z } from "zod";

export const sendToPosSchema = z.object({
  mappingIds: z.array(z.string().uuid()).optional(),
});

export type SendToPosFormValues = z.infer<typeof sendToPosSchema>;
