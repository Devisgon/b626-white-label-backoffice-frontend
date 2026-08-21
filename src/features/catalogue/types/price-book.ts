export type PriceBookStatus =
  | "Active"
  | "Inactive";

export interface PriceBookProduct {
  id: number;
  name: string;
  sku: string;
  barcode?: string;
}

export interface PriceBookItem {
  id: number;
  priceBookId: number;
  productId: number;
  sellingPrice: number;
  product: PriceBookProduct;
  createdAt?: string;
  updatedAt?: string;
}

export interface PriceBook {
  id: number;
  name: string;
  description: string;
  status: PriceBookStatus;
  itemCount: number;
  items?: PriceBookItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePriceBookPayload {
  name: string;
  description?: string;
  status?: PriceBookStatus;
}

export type UpdatePriceBookPayload =
  Partial<CreatePriceBookPayload>;

export interface AddPriceBookItemPayload {
  product_id: number;
  selling_price: number;
}

export interface UpdatePriceBookItemPayload {
  selling_price?: number;
}

export interface PriceBookFilters {
  search?: string;
  status?: PriceBookStatus | "all";
  page?: number;
  cursor?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}