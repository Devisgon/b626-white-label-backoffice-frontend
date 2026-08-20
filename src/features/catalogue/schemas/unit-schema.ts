import { z } from "zod";

export const unitSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Unit name must contain at least 2 characters.",
    )
    .max(
      100,
      "Unit name cannot exceed 100 characters.",
    ),

  shortName: z
    .string()
    .trim()
    .min(
      1,
      "Short name must contain at least 1 character.",
    )
    .max(
      20,
      "Short name cannot exceed 20 characters.",
    )
    .optional()
    .or(z.literal("")),

  status: z.enum(["Active", "Inactive"]),
});

export type UnitFormValues = z.infer<
  typeof unitSchema
>;