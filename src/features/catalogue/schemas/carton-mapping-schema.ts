import { z } from "zod";

export const cartonMappingSchema = z
  .object({
    carton_product_id: z.coerce
      .number()
      .int("Please select a valid carton product.")
      .positive("Please select a carton product."),

    child_product_id: z.coerce
      .number()
      .int("Please select a valid child product.")
      .positive("Please select a child product."),

    quantity: z.coerce
      .number()
      .int("Quantity must be a whole number.")
      .positive("Quantity must be greater than zero."),
  })
  .refine((values) => values.carton_product_id !== values.child_product_id, {
    message: "Carton and child product cannot be the same.",
    path: ["child_product_id"],
  });

export const updateCartonMappingSchema = z.object({
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number.")
    .positive("Quantity must be greater than zero."),
});

export type CartonMappingFormValues = z.infer<typeof cartonMappingSchema>;

export type UpdateCartonMappingFormValues = z.infer<
  typeof updateCartonMappingSchema
>;
