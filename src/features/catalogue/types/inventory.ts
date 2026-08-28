export type InventoryStatus = "Active" | "Inactive";

export interface InventoryProduct {
  id: number;
  name: string;
  sku: string;
  barcode?: string | null;
}

export interface InventoryLog {
  id: number;
  inventory_id: number;
  product_id: number;
  action: string;
  previous_quantity: number;
  new_quantity: number;
  reason?: string | null;
  created_at?: string;
}

export interface Inventory {
  id: number;
  product_id: number;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  minimum_stock?: number | null;
  maximum_stock?: number | null;
  reorder_level?: number | null;
  warehouse: string;
  status: InventoryStatus;
  products?: InventoryProduct;
  inventory_logs?: InventoryLog[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface CreateInventoryPayload {
  product_id: number;
  quantity: number;
  reserved_quantity?: number;
  minimum_stock?: number;
  maximum_stock?: number;
  reorder_level?: number;
  warehouse: string;
  status?: InventoryStatus;
}

export type UpdateInventoryPayload = Partial<CreateInventoryPayload>;

export interface InventoryFilters {
  page?: number;
  limit?: number;
  search?: string;
}
