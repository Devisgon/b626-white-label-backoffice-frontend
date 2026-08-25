import type {
  CursorPagination,
  OffsetPagination,
} from "./fuel-tank";

export type FuelPriceStatus =
  | "Active"
  | "Inactive";

export type FuelPriceSortField =
  | "id"
  | "fuel_type"
  | "price_per_liter"
  | "effective_from"
  | "status"
  | "created_at"
  | "updated_at";

export interface FuelPrice {
  id: number;

  fuel_type: string;
  price_per_liter: number | string;
  effective_from: string;

  location_id: string | null;
  status: FuelPriceStatus | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  tenant_id: string | null;
}

export interface CreateFuelPricePayload {
  fuel_type: string;
  price_per_liter: number;
  effective_from: string;

  location_id?: string;
  status?: FuelPriceStatus;
}

export type UpdateFuelPricePayload =
  Partial<CreateFuelPricePayload>;

export interface FuelPriceFilters {
  search?: string;
  status?: FuelPriceStatus;

  page?: number;
  cursor?: number;
  limit?: number;

  sortBy?: FuelPriceSortField;
  order?: "asc" | "desc";
}

export interface FuelPricesResponse {
  success: boolean;

  pagination:
    | OffsetPagination
    | CursorPagination;

  data: FuelPrice[];
}

export interface FuelPriceResponse {
  success: boolean;
  data: FuelPrice;
  message?: string;
}

export interface FuelPriceStats {
  total: number;
  active: number;
  inactive: number;
}

export interface FuelPriceStatsResponse {
  success: boolean;
  data: FuelPriceStats;
}