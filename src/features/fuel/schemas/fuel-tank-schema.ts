import { z } from "zod";

const optionalNumberField = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" || (Number.isFinite(Number(value)) && Number(value) >= 0),
    {
      message: "Please enter a valid non-negative number.",
    },
  )
  .transform((value) => (value === "" ? undefined : Number(value)));

const optionalLocationField = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.string().uuid().safeParse(value).success,
    {
      message: "Please select a valid location.",
    },
  )
  .transform((value) => (value === "" ? undefined : value));

export const fuelTankSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Tank name is required.")
      .min(2, "Tank name must contain at least 2 characters.")
      .max(100, "Tank name cannot exceed 100 characters."),

    fuel_type: z
      .string()
      .trim()
      .min(1, "Please select a fuel type.")
      .max(50, "Fuel type cannot exceed 50 characters."),

    capacity: z
      .string()
      .trim()
      .min(1, "Tank capacity is required.")
      .refine((value) => Number.isFinite(Number(value)) && Number(value) >= 0, {
        message: "Capacity must be a valid non-negative number.",
      })
      .transform((value) => Number(value)),

    current_stock: optionalNumberField,

    location_id: optionalLocationField,

    status: z
      .enum(["", "Active", "Inactive"])
      .transform((value) => (value === "" ? undefined : value)),
  })
  .superRefine((values, context) => {
    if (
      values.current_stock !== undefined &&
      values.current_stock > values.capacity
    ) {
      context.addIssue({
        code: "custom",
        path: ["current_stock"],
        message: "Current stock cannot exceed tank capacity.",
      });
    }
  });

export type FuelTankFormInput = z.input<typeof fuelTankSchema>;

export type FuelTankFormValues = z.output<typeof fuelTankSchema>;
