import { apiClient } from "@/lib/api";

import type {
  CreateFuelPumpPayload,
  FuelPumpFilters,
  FuelPumpResponse,
  FuelPumpStatsResponse,
  FuelPumpsResponse,
  UpdateFuelPumpPayload,
} from "@/features/fuel/types";

const FUEL_PUMPS_ENDPOINT = "/fuel/pumps";

export async function getFuelPumps(
  filters: FuelPumpFilters = {},
): Promise<FuelPumpsResponse> {
  const response = await apiClient.get<FuelPumpsResponse>(FUEL_PUMPS_ENDPOINT, {
    params: filters,
  });

  return response.data;
}

export async function getFuelPumpById(
  pumpId: number,
): Promise<FuelPumpResponse> {
  const response = await apiClient.get<FuelPumpResponse>(
    `${FUEL_PUMPS_ENDPOINT}/${pumpId}`,
  );

  return response.data;
}

export async function getFuelPumpStats(): Promise<FuelPumpStatsResponse> {
  const response = await apiClient.get<FuelPumpStatsResponse>(
    `${FUEL_PUMPS_ENDPOINT}/stats`,
  );

  return response.data;
}

export async function createFuelPump(
  payload: CreateFuelPumpPayload,
): Promise<FuelPumpResponse> {
  const response = await apiClient.post<FuelPumpResponse>(
    FUEL_PUMPS_ENDPOINT,
    payload,
  );

  return response.data;
}

export async function updateFuelPump(
  pumpId: number,
  payload: UpdateFuelPumpPayload,
): Promise<FuelPumpResponse> {
  const response = await apiClient.patch<FuelPumpResponse>(
    `${FUEL_PUMPS_ENDPOINT}/${pumpId}`,
    payload,
  );

  return response.data;
}

export async function deleteFuelPump(
  pumpId: number,
): Promise<FuelPumpResponse> {
  const response = await apiClient.delete<FuelPumpResponse>(
    `${FUEL_PUMPS_ENDPOINT}/${pumpId}`,
  );

  return response.data;
}

export async function restoreFuelPump(
  pumpId: number,
): Promise<FuelPumpResponse> {
  const response = await apiClient.patch<FuelPumpResponse>(
    `${FUEL_PUMPS_ENDPOINT}/${pumpId}/restore`,
  );

  return response.data;
}
