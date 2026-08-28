import { apiClient } from "@/lib/api";

import type {
  CreateInventoryLocationPayload,
  InventoryLocation,
  InventoryLocationFilters,
  UpdateInventoryLocationPayload,
} from "@/features/catalogue/types";

export interface InventoryLocationsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InventoryLocationsListResponse {
  data: InventoryLocation[];
  pagination: InventoryLocationsPagination;
}

export interface InventoryLocationStats {
  totalLocations: number;
  activeLocations: number;
}

const INVENTORY_LOCATIONS_ENDPOINT = "/catalogue/inventory-locations";

export async function getInventoryLocations(
  filters?: InventoryLocationFilters,
): Promise<InventoryLocationsListResponse> {
  const response = await apiClient.get<InventoryLocationsListResponse>(
    INVENTORY_LOCATIONS_ENDPOINT,
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

export async function getInventoryLocationStats(): Promise<InventoryLocationStats> {
  const response = await apiClient.get<InventoryLocationStats>(
    `${INVENTORY_LOCATIONS_ENDPOINT}/stats`,
  );

  return response.data;
}

export async function getInventoryLocation(
  id: number,
): Promise<InventoryLocation> {
  const response = await apiClient.get<InventoryLocation>(
    `${INVENTORY_LOCATIONS_ENDPOINT}/${id}`,
  );

  return response.data;
}

export async function createInventoryLocation(
  payload: CreateInventoryLocationPayload,
): Promise<InventoryLocation> {
  const response = await apiClient.post<InventoryLocation>(
    INVENTORY_LOCATIONS_ENDPOINT,
    payload,
  );

  return response.data;
}

export async function updateInventoryLocation(
  id: number,
  payload: UpdateInventoryLocationPayload,
): Promise<InventoryLocation> {
  const response = await apiClient.patch<InventoryLocation>(
    `${INVENTORY_LOCATIONS_ENDPOINT}/${id}`,
    payload,
  );

  return response.data;
}

export async function deleteInventoryLocation(
  id: number,
): Promise<InventoryLocation> {
  const response = await apiClient.delete<InventoryLocation>(
    `${INVENTORY_LOCATIONS_ENDPOINT}/${id}`,
  );

  return response.data;
}

export async function restoreInventoryLocation(
  id: number,
): Promise<InventoryLocation> {
  const response = await apiClient.patch<InventoryLocation>(
    `${INVENTORY_LOCATIONS_ENDPOINT}/${id}/restore`,
  );

  return response.data;
}
