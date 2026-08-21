import { z } from "zod";

export const productInventorySchema = z
  .object({
    product_id: z.coerce
      .number()
      .int(
        "Please select a valid product.",
      )
      .positive(
        "Please select a product.",
      ),

    location_id: z.coerce
      .number()
      .int(
        "Please select a valid inventory location.",
      )
      .positive(
        "Please select an inventory location.",
      ),

    on_hand_quantity: z.coerce
      .number()
      .int(
        "On-hand quantity must be a whole number.",
      )
      .min(
        0,
        "On-hand quantity cannot be negative.",
      ),

    reserved_quantity: z.coerce
      .number()
      .int(
        "Reserved quantity must be a whole number.",
      )
      .min(
        0,
        "Reserved quantity cannot be negative.",
      ),

    reorder_level: z.coerce
      .number()
      .int(
        "Reorder level must be a whole number.",
      )
      .min(
        0,
        "Reorder level cannot be negative.",
      ),

    minimum_stock: z.coerce
      .number()
      .int(
        "Minimum stock must be a whole number.",
      )
      .min(
        0,
        "Minimum stock cannot be negative.",
      ),

    maximum_stock: z.coerce
      .number()
      .int(
        "Maximum stock must be a whole number.",
      )
      .min(
        0,
        "Maximum stock cannot be negative.",
      ),
  })
  .refine(
    (values) =>
      values.reserved_quantity <=
      values.on_hand_quantity,
    {
      message:
        "Reserved quantity cannot exceed on-hand quantity.",
      path: ["reserved_quantity"],
    },
  )
  .refine(
    (values) =>
      values.maximum_stock >=
      values.minimum_stock,
    {
      message:
        "Maximum stock cannot be less than minimum stock.",
      path: ["maximum_stock"],
    },
  );

export type ProductInventoryFormValues =
  z.infer<typeof productInventorySchema>;