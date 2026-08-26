import { z } from "zod";

const positiveNumber = (message: string) =>
  z.string().trim().min(1, message).refine((value) => Number(value) > 0, message);

export const fuelDeliverySchema = z.object({
  tank_id: positiveNumber("Please select a tank."),
  supplier_name: z.string().trim().max(120).optional(),
  quantity: positiveNumber("Quantity must be greater than zero."),
  invoice_number: z.string().trim().max(80).optional(),
  delivery_date: z.string().min(1, "Delivery date is required."),
  status: z.enum(["Received", "Pending", "Cancelled"]),
});

export type FuelDeliveryFormInput = z.input<typeof fuelDeliverySchema>;
export type FuelDeliveryFormValues = z.output<typeof fuelDeliverySchema>;

