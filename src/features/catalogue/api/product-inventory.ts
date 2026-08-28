import { apiClient } from "@/lib/api";

import type {
  CreateProductInventoryPayload,
  ProductInventory,
  ProductInventoryFilters,
  UpdateProductInventoryPayload,
} from "@/features/catalogue/types";

export interface ProductInventoryPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductInventoryListResponse {
  data: ProductInventory[];
  pagination: ProductInventoryPagination;
}

export interface ProductInventoryStats {
  totalProductInventory: number;
  lowStockItems: number;
}

const PRODUCT_INVENTORY_ENDPOINT = "/catalogue/product-inventory";

export async function getProductInventoryRecords(
  filters?: ProductInventoryFilters,
): Promise<ProductInventoryListResponse> {
  const response = await apiClient.get<ProductInventoryListResponse>(
    PRODUCT_INVENTORY_ENDPOINT,
    {
      params: {
        page: filters?.page,
        limit: filters?.limit,
        search: filters?.search,
      },
    },
  );

  return response.data;
}

export async function getProductInventoryStats(): Promise<ProductInventoryStats> {
  const response = await apiClient.get<ProductInventoryStats>(
    `${PRODUCT_INVENTORY_ENDPOINT}/stats`,
  );

  return response.data;
}

export async function getProductInventoryRecord(
  id: number,
): Promise<ProductInventory> {
  const response = await apiClient.get<ProductInventory>(
    `${PRODUCT_INVENTORY_ENDPOINT}/${id}`,
  );

  return response.data;
}

export async function createProductInventory(
  payload: CreateProductInventoryPayload,
): Promise<ProductInventory> {
  const response = await apiClient.post<ProductInventory>(
    PRODUCT_INVENTORY_ENDPOINT,
    payload,
  );

  return response.data;
}

export async function updateProductInventory(
  id: number,
  payload: UpdateProductInventoryPayload,
): Promise<ProductInventory> {
  const response = await apiClient.patch<ProductInventory>(
    `${PRODUCT_INVENTORY_ENDPOINT}/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteProductInventory(
  id: number,
): Promise<ProductInventory> {
  const response = await apiClient.delete<ProductInventory>(
    `${PRODUCT_INVENTORY_ENDPOINT}/${id}`,
  );

  return response.data;
}

export async function restoreProductInventory(
  id: number,
): Promise<ProductInventory> {
  const response = await apiClient.patch<ProductInventory>(
    `${PRODUCT_INVENTORY_ENDPOINT}/${id}/restore`,
  );

  return response.data;
}
