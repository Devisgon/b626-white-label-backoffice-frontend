import { z } from "zod";

export const inventoryLocationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Location name must contain at least 2 characters.")
    .max(255, "Location name cannot exceed 255 characters."),

  code: z
    .string()
    .trim()
    .min(2, "Location code must contain at least 2 characters.")
    .max(50, "Location code cannot exceed 50 characters.")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Code can only contain letters, numbers, hyphens and underscores.",
    ),

  address: z
    .string()
    .trim()
    .max(500, "Address cannot exceed 500 characters.")
    .optional(),

  status: z.enum(["Active", "Inactive"]),
});

export type InventoryLocationFormValues = z.infer<
  typeof inventoryLocationSchema
>;
