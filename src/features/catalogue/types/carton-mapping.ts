export interface CartonMappingProduct {
  id: number;
  name: string;
  sku: string;
}

export interface CartonMapping {
  id: number;
  carton_product_id: number;
  child_product_id: number;
  quantity: number;
  carton: CartonMappingProduct;
  child: CartonMappingProduct;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCartonMappingPayload {
  carton_product_id: number;
  child_product_id: number;
  quantity: number;
}

export interface UpdateCartonMappingPayload {
  quantity: number;
}

export interface CartonMappingFilters {
  carton_product_id?: number;
  page?: number;
  limit?: number;
}