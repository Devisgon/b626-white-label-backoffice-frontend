import { z } from "zod";

export const inventorySchema = z
  .object({
    product_id: z.coerce
      .number()
      .int("Please select a valid product.")
      .positive("Please select a product."),

    quantity: z.coerce
      .number()
      .int("Quantity must be a whole number.")
      .min(0, "Quantity cannot be negative."),

    reserved_quantity: z.coerce
      .number()
      .int("Reserved quantity must be a whole number.")
      .min(0, "Reserved quantity cannot be negative."),

    minimum_stock: z.coerce
      .number()
      .int("Minimum stock must be a whole number.")
      .min(0, "Minimum stock cannot be negative."),

    maximum_stock: z.coerce
      .number()
      .int("Maximum stock must be a whole number.")
      .min(0, "Maximum stock cannot be negative."),

    reorder_level: z.coerce
      .number()
      .int("Reorder level must be a whole number.")
      .min(0, "Reorder level cannot be negative."),

    warehouse: z
      .string()
      .trim()
      .min(2, "Warehouse name must contain at least 2 characters.")
      .max(255, "Warehouse name cannot exceed 255 characters."),

    status: z.enum(["Active", "Inactive"]),
  })
  .refine((values) => values.reserved_quantity <= values.quantity, {
    message: "Reserved quantity cannot exceed total quantity.",
    path: ["reserved_quantity"],
  })
  .refine((values) => values.maximum_stock >= values.minimum_stock, {
    message: "Maximum stock cannot be less than minimum stock.",
    path: ["maximum_stock"],
  });

export type InventoryFormValues = z.infer<typeof inventorySchema>;
