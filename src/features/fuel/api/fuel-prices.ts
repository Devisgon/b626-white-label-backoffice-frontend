import { apiClient } from "@/lib/api";

import type {
  CreateFuelPricePayload,
  FuelPriceFilters,
  FuelPriceResponse,
  FuelPriceStatsResponse,
  FuelPricesResponse,
  UpdateFuelPricePayload,
} from "@/features/fuel/types";

const FUEL_PRICES_ENDPOINT = "/fuel/prices";

export async function getFuelPrices(
  filters: FuelPriceFilters = {},
): Promise<FuelPricesResponse> {
  const response = await apiClient.get<FuelPricesResponse>(
    FUEL_PRICES_ENDPOINT,
    {
      params: filters,
    },
  );

  return response.data;
}

export async function getFuelPriceById(
  priceId: number,
): Promise<FuelPriceResponse> {
  const response = await apiClient.get<FuelPriceResponse>(
    `${FUEL_PRICES_ENDPOINT}/${priceId}`,
  );

  return response.data;
}

export async function getFuelPriceStats(): Promise<FuelPriceStatsResponse> {
  const response = await apiClient.get<FuelPriceStatsResponse>(
    `${FUEL_PRICES_ENDPOINT}/stats`,
  );

  return response.data;
}

export async function createFuelPrice(
  payload: CreateFuelPricePayload,
): Promise<FuelPriceResponse> {
  const response = await apiClient.post<FuelPriceResponse>(
    FUEL_PRICES_ENDPOINT,
    payload,
  );

  return response.data;
}

export async function updateFuelPrice(
  priceId: number,
  payload: UpdateFuelPricePayload,
): Promise<FuelPriceResponse> {
  const response = await apiClient.patch<FuelPriceResponse>(
    `${FUEL_PRICES_ENDPOINT}/${priceId}`,
    payload,
  );

  return response.data;
}

export async function deleteFuelPrice(
  priceId: number,
): Promise<FuelPriceResponse> {
  const response = await apiClient.delete<FuelPriceResponse>(
    `${FUEL_PRICES_ENDPOINT}/${priceId}`,
  );

  return response.data;
}

export async function restoreFuelPrice(
  priceId: number,
): Promise<FuelPriceResponse> {
  const response = await apiClient.patch<FuelPriceResponse>(
    `${FUEL_PRICES_ENDPOINT}/${priceId}/restore`,
  );

  return response.data;
}
