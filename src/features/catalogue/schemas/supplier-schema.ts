import { z } from "zod";

export const supplierSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Supplier name must contain at least 2 characters.",
    )
    .max(
      150,
      "Supplier name cannot exceed 150 characters.",
    ),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .or(z.literal(""))
    .optional(),

  phone: z
    .string()
    .trim()
    .max(
      30,
      "Phone number cannot exceed 30 characters.",
    )
    .optional(),

  address: z
    .string()
    .trim()
    .max(
      500,
      "Address cannot exceed 500 characters.",
    )
    .optional(),

  status: z.enum(["Active", "Inactive"]),
});

export type SupplierFormValues = z.infer<
  typeof supplierSchema
>;