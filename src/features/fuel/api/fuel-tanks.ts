import { apiClient } from "@/lib/api";

import type {
  CreateFuelTankPayload,
  FuelTankFilters,
  FuelTankResponse,
  FuelTankStatsResponse,
  FuelTanksResponse,
  UpdateFuelTankPayload,
} from "@/features/fuel/types";

const FUEL_TANKS_ENDPOINT = "/fuel/tanks";

export async function getFuelTanks(
  filters: FuelTankFilters = {},
): Promise<FuelTanksResponse> {
  const response = await apiClient.get<FuelTanksResponse>(FUEL_TANKS_ENDPOINT, {
    params: filters,
  });

  return response.data;
}

export async function getFuelTankById(
  tankId: number,
): Promise<FuelTankResponse> {
  const response = await apiClient.get<FuelTankResponse>(
    `${FUEL_TANKS_ENDPOINT}/${tankId}`,
  );

  return response.data;
}

export async function getFuelTankStats(): Promise<FuelTankStatsResponse> {
  const response = await apiClient.get<FuelTankStatsResponse>(
    `${FUEL_TANKS_ENDPOINT}/stats`,
  );

  return response.data;
}

export async function createFuelTank(
  payload: CreateFuelTankPayload,
): Promise<FuelTankResponse> {
  const response = await apiClient.post<FuelTankResponse>(
    FUEL_TANKS_ENDPOINT,
    payload,
  );

  return response.data;
}

export async function updateFuelTank(
  tankId: number,
  payload: UpdateFuelTankPayload,
): Promise<FuelTankResponse> {
  const response = await apiClient.patch<FuelTankResponse>(
    `${FUEL_TANKS_ENDPOINT}/${tankId}`,
    payload,
  );

  return response.data;
}

export async function deleteFuelTank(
  tankId: number,
): Promise<FuelTankResponse> {
  const response = await apiClient.delete<FuelTankResponse>(
    `${FUEL_TANKS_ENDPOINT}/${tankId}`,
  );

  return response.data;
}

export async function restoreFuelTank(
  tankId: number,
): Promise<FuelTankResponse> {
  const response = await apiClient.patch<FuelTankResponse>(
    `${FUEL_TANKS_ENDPOINT}/${tankId}/restore`,
  );

  return response.data;
}
