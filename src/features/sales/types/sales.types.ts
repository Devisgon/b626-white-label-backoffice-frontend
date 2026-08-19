export type SaleStatus =
  | "completed"
  | "cancelled"
  | "refunded"
  | "partially_refunded";

export type PaymentMethod =
  | "cash"
  | "card"
  | "bank_transfer"
  | "mobile_wallet";

export interface SaleProduct {
  id: number;
  name: string | null;
  sku: string | null;
  barcode: string | null;
  retail_price?: number | null;
}

export interface SaleItem {
  id: number;
  sale_id: string;
  product_id: number;
  quantity: number;
  unit_price: number;
  discount: number;
  tax: number;
  total: number;
  refunded_quantity: number;
  inventory_location_id: number | null;
  created_at: string;
  product: SaleProduct;
}

export interface Sale {
  id: string;
  sale_number: string;
  customer_name: string | null;
  customer_phone: string | null;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  refunded_amount: number;
  status: SaleStatus;
  payment_method: PaymentMethod;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  tenant_id: string | null;
  store_location_id: string | null;
  items: SaleItem[];
}

export interface SaleStats {
  total_sales: number;
  completed_sales: number;
  cancelled_sales: number;
  total_revenue: number;
  total_discount: number;
  total_tax: number;
  total_refunded: number;
  average_sale_value: number;
}

export interface SalesPagination {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface SalesQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  payment_method?: string;
}

export interface SalesListResponse {
  success: boolean;
  pagination: SalesPagination;
  data: Sale[];
}

export interface SaleResponse {
  success: boolean;
  message?: string;
  data: Sale;
}

export interface SaleStatsResponse {
  success: boolean;
  data: SaleStats;
}

export interface CreateSaleItem {
  product_id: number;
  quantity: number;
  discount?: number;
}

export interface CreateSaleRequest {
  customer_name?: string;
  customer_phone?: string;
  tax?: number;
  discount?: number;
  payment_method?: PaymentMethod;
  items: CreateSaleItem[];
}

export type UpdateSaleRequest =
  Partial<CreateSaleRequest>;

export interface RefundSaleItem {
  sale_item_id: number;
  quantity: number;
}

export interface RefundSaleRequest {
  items?: RefundSaleItem[];
  reason?: string;
}

export interface SaleActionResponse {
  success: boolean;
  message: string;
}
export interface SaleReceiptLineItem {
  product_name: string | null;
  sku: string | null;
  quantity: number;
  unit_price: number;
  discount: number;
  line_total: number;
  refunded_quantity: number;
}

export interface SaleReceipt {
  sale_number: string;
  issued_at: string;
  business_name: string | null;
  location_name: string | null;
  location_address: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  payment_method: PaymentMethod;
  status: SaleStatus;
  line_items: SaleReceiptLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  refunded_amount: number;
  net_total: number;
}

export interface SaleReceiptResponse {
  success: boolean;
  data: SaleReceipt;
}