import { z } from "zod";

const requiredNumber = (message: string) =>
  z.string().trim().min(1, message).refine((value) => Number(value) >= 0, message);

export const fuelSaleSchema = z
  .object({
    pump_id: z.string().min(1, "Please select a pump."),
    tank_id: z.string().min(1, "Please select a tank."),
    opening_reading: requiredNumber("Opening reading is required."),
    closing_reading: requiredNumber("Closing reading is required."),
    price_per_liter: requiredNumber("Price per liter is required."),
    payment_method: z.string().trim().optional(),
    shift: z.string().trim().optional(),
    sale_date: z.string().min(1, "Sale date is required."),
    status: z.enum(["Completed", "Pending", "Cancelled"]),
  })
  .refine(
    (values) => Number(values.closing_reading) >= Number(values.opening_reading),
    { path: ["closing_reading"], message: "Closing reading cannot be lower than opening reading." },
  );

export type FuelSaleFormInput = z.input<typeof fuelSaleSchema>;
export type FuelSaleFormValues = z.output<typeof fuelSaleSchema>;

