import type {
  CursorPagination,
  OffsetPagination,
} from "./fuel-tank";

export type FuelPumpStatus =
  | "Active"
  | "Inactive";

export type FuelPumpSortField =
  | "id"
  | "name"
  | "status"
  | "created_at"
  | "updated_at";

export interface FuelPump {
  id: number;

  name: string;
  tank_id: number;

  location_id: string | null;
  status: FuelPumpStatus | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  tenant_id: string | null;
}

export interface CreateFuelPumpPayload {
  name: string;
  tank_id: number;

  location_id?: string;
  status?: FuelPumpStatus;
}

export type UpdateFuelPumpPayload =
  Partial<CreateFuelPumpPayload>;

export interface FuelPumpFilters {
  search?: string;
  status?: FuelPumpStatus;

  page?: number;
  cursor?: number;
  limit?: number;

  sortBy?: FuelPumpSortField;
  order?: "asc" | "desc";
}

export interface FuelPumpsResponse {
  success: boolean;

  pagination:
    | OffsetPagination
    | CursorPagination;

  data: FuelPump[];
}

export interface FuelPumpResponse {
  success: boolean;
  data: FuelPump;
  message?: string;
}

export interface FuelPumpStats {
  total: number;
  active: number;
  inactive: number;
}

export interface FuelPumpStatsResponse {
  success: boolean;
  data: FuelPumpStats;
}