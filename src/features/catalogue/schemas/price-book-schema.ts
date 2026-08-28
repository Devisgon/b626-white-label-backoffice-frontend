import { z } from "zod";

export const priceBookSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Price book name must contain at least 2 characters.")
    .max(255, "Price book name cannot exceed 255 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  status: z.enum(["Active", "Inactive"]),
});

export const priceBookItemSchema = z.object({
  productId: z
    .number({
      message: "Select a product.",
    })
    .int("Product ID must be a whole number.")
    .positive("Select a valid product."),

  sellingPrice: z
    .number({
      message: "Selling price must be a number.",
    })
    .min(0, "Selling price cannot be negative."),
});

export type PriceBookFormValues = z.infer<typeof priceBookSchema>;

export type PriceBookItemFormValues = z.infer<typeof priceBookItemSchema>;
