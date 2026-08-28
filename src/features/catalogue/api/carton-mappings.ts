import { apiClient } from "@/lib/api";

import type {
  CartonMapping,
  CartonMappingFilters,
  CreateCartonMappingPayload,
  UpdateCartonMappingPayload,
} from "@/features/catalogue/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CartonMappingsPagination {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface CartonMappingsListResponse {
  success: boolean;
  pagination: CartonMappingsPagination;
  data: CartonMapping[];
}

export interface DeleteCartonMappingResponse {
  success: boolean;
  message: string;
}

const CARTON_MAPPINGS_ENDPOINT = "/catalogue/carton-mappings";

export async function getCartonMappings(
  filters?: CartonMappingFilters,
): Promise<CartonMappingsListResponse> {
  const response = await apiClient.get<CartonMappingsListResponse>(
    CARTON_MAPPINGS_ENDPOINT,
    {
      params: {
        carton_product_id: filters?.carton_product_id,
        page: filters?.page,
        limit: filters?.limit,
      },
    },
  );

  return response.data;
}

export async function getCartonMapping(id: number): Promise<CartonMapping> {
  const response = await apiClient.get<ApiResponse<CartonMapping>>(
    `${CARTON_MAPPINGS_ENDPOINT}/${id}`,
  );

  return response.data.data;
}

export async function createCartonMapping(
  payload: CreateCartonMappingPayload,
): Promise<CartonMapping> {
  const response = await apiClient.post<ApiResponse<CartonMapping>>(
    CARTON_MAPPINGS_ENDPOINT,
    payload,
  );

  return response.data.data;
}

export async function updateCartonMapping(
  id: number,
  payload: UpdateCartonMappingPayload,
): Promise<CartonMapping> {
  const response = await apiClient.patch<ApiResponse<CartonMapping>>(
    `${CARTON_MAPPINGS_ENDPOINT}/${id}`,
    payload,
  );

  return response.data.data;
}

export async function deleteCartonMapping(
  id: number,
): Promise<DeleteCartonMappingResponse> {
  const response = await apiClient.delete<DeleteCartonMappingResponse>(
    `${CARTON_MAPPINGS_ENDPOINT}/${id}`,
  );

  return response.data;
}
