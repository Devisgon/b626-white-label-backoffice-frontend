import { z } from "zod";

export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Brand name must contain at least 2 characters.")
    .max(100, "Brand name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  status: z.enum(["Active", "Inactive"]),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
