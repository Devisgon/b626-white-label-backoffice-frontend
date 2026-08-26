export type FuelDeliveryStatus = "Received" | "Pending" | "Cancelled";

export interface FuelDelivery {
  id: number;
  tank_id: number;
  tank_name: string;
  supplier_name?: string;
  quantity: number;
  invoice_number?: string;
  delivery_date: string;
  status: FuelDeliveryStatus;
}

export interface FuelDeliveryPayload {
  tank_id: number;
  supplier_name?: string;
  quantity: number;
  invoice_number?: string;
  delivery_date: string;
  status?: FuelDeliveryStatus;
}

