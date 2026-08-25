import { z } from "zod";

const optionalLocationField = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      z.string().uuid().safeParse(value).success,
    {
      message:
        "Please select a valid location.",
    },
  )
  .transform((value) =>
    value === "" ? undefined : value,
  );

export const fuelPriceSchema = z.object({
  fuel_type: z
    .string()
    .trim()
    .min(1, "Please select a fuel type.")
    .max(
      50,
      "Fuel type cannot exceed 50 characters.",
    ),

  price_per_liter: z
    .string()
    .trim()
    .min(1, "Price per litre is required.")
    .refine(
      (value) =>
        Number.isFinite(Number(value)) &&
        Number(value) >= 0,
      {
        message:
          "Price must be a valid non-negative number.",
      },
    )
    .transform((value) => Number(value)),

  effective_from: z
    .string()
    .trim()
    .min(
      1,
      "Effective date and time are required.",
    ),

  location_id: optionalLocationField,

  status: z
    .enum(["", "Active", "Inactive"])
    .transform((value) =>
      value === "" ? undefined : value,
    ),
});

export type FuelPriceFormInput = z.input<
  typeof fuelPriceSchema
>;

export type FuelPriceFormValues = z.output<
  typeof fuelPriceSchema
>;