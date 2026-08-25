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

export const fuelPumpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Pump name is required.")
    .min(
      2,
      "Pump name must contain at least 2 characters.",
    )
    .max(
      100,
      "Pump name cannot exceed 100 characters.",
    ),

  tank_id: z
    .string()
    .trim()
    .min(1, "Please select a fuel tank.")
    .refine(
      (value) =>
        Number.isInteger(Number(value)) &&
        Number(value) >= 1,
      {
        message:
          "Please select a valid fuel tank.",
      },
    )
    .transform((value) => Number(value)),

  location_id: optionalLocationField,

  status: z
    .enum(["", "Active", "Inactive"])
    .transform((value) =>
      value === "" ? undefined : value,
    ),
});

export type FuelPumpFormInput = z.input<
  typeof fuelPumpSchema
>;

export type FuelPumpFormValues = z.output<
  typeof fuelPumpSchema
>;