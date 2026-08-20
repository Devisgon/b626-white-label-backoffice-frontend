import { z } from "zod";

export const departmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Department name must contain at least 2 characters.",
    )
    .max(
      150,
      "Department name cannot exceed 150 characters.",
    ),

  description: z
    .string()
    .trim()
    .max(
      500,
      "Description cannot exceed 500 characters.",
    )
    .optional(),

  defaultTaxRate: z
    .number({
      message: "Tax rate must be a number.",
    })
    .min(0, "Tax rate cannot be negative.")
    .max(100, "Tax rate cannot exceed 100%.")
    .optional(),

  defaultMargin: z
    .number({
      message: "Margin must be a number.",
    })
    .min(0, "Margin cannot be negative.")
    .max(100, "Margin cannot exceed 100%.")
    .optional(),

  ageRestriction: z.boolean(),

  nacsCode: z
    .string()
    .trim()
    .max(
      50,
      "NACS code cannot exceed 50 characters.",
    )
    .optional(),

  posDepartmentNumber: z
    .number({
      message:
        "POS department number must be a number.",
    })
    .int(
      "POS department number must be a whole number.",
    )
    .min(
      1,
      "POS department number must be at least 1.",
    )
    .optional(),

  status: z.enum(["Active", "Inactive"]),
});

export type DepartmentFormValues = z.infer<
  typeof departmentSchema
>;