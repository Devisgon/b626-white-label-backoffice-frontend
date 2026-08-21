export interface ProductInventoryProduct {
  id: number;
  name: string;
  sku: string;
  barcode?: string | null;
}

export interface ProductInventoryLocation {
  id: number;
  name: string;
  code: string;
  address?: string | null;
  status?: string;
}

export interface ProductInventory {
  id: number;
  product_id: number;
  location_id: number;
  on_hand_quantity: number;
  reserved_quantity: number;
  available_quantity?: number;
  reorder_level?: number | null;
  minimum_stock?: number | null;
  maximum_stock?: number | null;
  product?: ProductInventoryProduct;
  location?: ProductInventoryLocation;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface CreateProductInventoryPayload {
  product_id: number;
  location_id: number;
  on_hand_quantity?: number;
  reserved_quantity?: number;
  reorder_level?: number;
  minimum_stock?: number;
  maximum_stock?: number;
}

export type UpdateProductInventoryPayload =
  Partial<CreateProductInventoryPayload>;

export interface ProductInventoryFilters {
  page?: number;
  limit?: number;
  search?: string;
}