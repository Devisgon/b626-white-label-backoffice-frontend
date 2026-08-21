import { apiClient } from "@/lib/api";

import type {
  CreateInventoryPayload,
  Inventory,
  InventoryFilters,
  UpdateInventoryPayload,
} from "@/features/catalogue/types";

export interface InventoryPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InventoryListResponse {
  data: Inventory[];
  pagination: InventoryPagination;
}

export interface InventoryStats {
  totalInventoryItems: number;
  lowStockItems: number;
}

const INVENTORY_ENDPOINT =
  "/catalogue/inventory";

export async function getInventoryRecords(
  filters?: InventoryFilters,
): Promise<InventoryListResponse> {
  const response =
    await apiClient.get<InventoryListResponse>(
      INVENTORY_ENDPOINT,
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

export async function getInventoryStats(): Promise<InventoryStats> {
  const response =
    await apiClient.get<InventoryStats>(
      `${INVENTORY_ENDPOINT}/stats`,
    );

  return response.data;
}

export async function getInventoryRecord(
  id: number,
): Promise<Inventory> {
  const response =
    await apiClient.get<Inventory>(
      `${INVENTORY_ENDPOINT}/${id}`,
    );

  return response.data;
}

export async function createInventoryRecord(
  payload: CreateInventoryPayload,
): Promise<Inventory> {
  const response =
    await apiClient.post<Inventory>(
      INVENTORY_ENDPOINT,
      payload,
    );

  return response.data;
}

export async function updateInventoryRecord(
  id: number,
  payload: UpdateInventoryPayload,
): Promise<Inventory> {
  const response =
    await apiClient.patch<Inventory>(
      `${INVENTORY_ENDPOINT}/${id}`,
      payload,
    );

  return response.data;
}

export async function deleteInventoryRecord(
  id: number,
): Promise<Inventory> {
  const response =
    await apiClient.delete<Inventory>(
      `${INVENTORY_ENDPOINT}/${id}`,
    );

  return response.data;
}

export async function restoreInventoryRecord(
  id: number,
): Promise<Inventory> {
  const response =
    await apiClient.patch<Inventory>(
      `${INVENTORY_ENDPOINT}/${id}/restore`,
    );

  return response.data;
}