export type FuelSaleStatus = "Completed" | "Pending" | "Cancelled";

export interface FuelSale {
  id: number;
  pump_id: number;
  pump_name: string;
  tank_id: number;
  tank_name: string;
  opening_reading: number;
  closing_reading: number;
  liters_sold: number;
  price_per_liter: number;
  total_amount: number;
  payment_method?: string;
  shift?: string;
  sale_date: string;
  status: FuelSaleStatus;
}

export type FuelSalePayload = Omit<FuelSale, "id" | "pump_name" | "tank_name">;

