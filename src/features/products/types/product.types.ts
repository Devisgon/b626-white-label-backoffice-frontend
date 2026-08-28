export type ProductStatus = "Active" | "Inactive";

export type ProductSaleType = "Retail" | "Wholesale" | "Both";

export type ProductSortField =
  | "id"
  | "name"
  | "sku"
  | "item_code"
  | "barcode"
  | "status"
  | "created_at"
  | "updated_at";

export type SortOrder = "asc" | "desc";

export interface ProductRelation {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;

  sku?: string | null;
  item_code?: string | null;
  barcode?: string | null;
  plu_code?: string | null;

  retail_price?: number | null;
  wholesale_price?: number | null;
  cost?: number | null;
  tax?: number | null;

  description?: string | null;
  sale_type?: ProductSaleType | null;
  unit?: string | null;
  size?: string | null;

  is_multi_pack?: boolean;
  pack_size?: number | null;
  pack_type?: string | null;

  category_id?: number | null;
  supplier_id?: number | null;
  brand_id?: number | null;
  department_id?: number | null;

  categories?: ProductRelation | null;
  suppliers?: ProductRelation | null;
  brands?: ProductRelation | null;
  departments?: ProductRelation | null;

  inventory_tracking?: boolean;
  minimum_stock?: number | null;
  maximum_stock?: number | null;

  status: ProductStatus;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface CreateProductInput {
  name: string;

  sku?: string;
  item_code?: string;
  barcode?: string;
  plu_code?: string;

  retail_price?: number;
  wholesale_price?: number;
  cost?: number;
  tax?: number;

  description?: string;
  sale_type?: ProductSaleType;
  unit?: string;
  size?: string;

  is_multi_pack?: boolean;
  pack_size?: number;
  pack_type?: string;

  category_id?: number;
  supplier_id?: number;
  brand_id?: number;
  department_id?: number;

  inventory_tracking?: boolean;
  minimum_stock?: number;
  maximum_stock?: number;

  status?: ProductStatus;
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductQuery {
  search?: string;
  status?: ProductStatus;

  category_id?: number;
  brand_id?: number;
  supplier_id?: number;
  department_id?: number;

  sale_type?: ProductSaleType;
  inventory_tracking?: boolean;

  page?: number;
  cursor?: number;
  limit?: number;

  sortBy?: ProductSortField;
  order?: SortOrder;
}

export interface OffsetPagination {
  type: "offset";
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface CursorPagination {
  type: "cursor";
  limit: number;
  nextCursor: number | null;
  hasMore: boolean;
}

export interface ProductListResponse {
  success: boolean;
  pagination: OffsetPagination | CursorPagination;
  data: Product[];
}

export interface ProductResponse {
  success: boolean;
  message?: string;
  data: Product;
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
}

export interface ProductStatsResponse {
  success: boolean;
  data: ProductStats;
}

export interface ProductCategorySummary {
  id: number;
  name: string;
  products: number;
}

export interface ProductCategorySummaryResponse {
  success: boolean;
  data: ProductCategorySummary[];
}

export interface ProductAuditLog {
  id: number;
  product_id: number;
  action: string;
  description?: string | null;
  old_data?: Record<string, unknown> | null;
  new_data?: Record<string, unknown> | null;
  created_at: string;
}

export interface ProductHistoryResponse {
  success: boolean;
  data: ProductAuditLog[];
}

export interface ProductImportError {
  row?: number;
  message: string;
}

export interface ProductImportResponse {
  success: boolean;
  message: string;
  data?: {
    created: number;
    errors: ProductImportError[];
  };
}
