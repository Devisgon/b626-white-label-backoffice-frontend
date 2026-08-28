export type FuelTankStatus = "Active" | "Inactive";

export type FuelTankSortField =
  | "id"
  | "name"
  | "fuel_type"
  | "capacity"
  | "current_stock"
  | "status"
  | "created_at"
  | "updated_at";

export interface FuelTank {
  id: number;

  name: string;
  fuel_type: string;

  capacity: number | string;
  current_stock: number | string;

  location_id: string | null;
  status: FuelTankStatus | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  tenant_id: string | null;
}

export interface CreateFuelTankPayload {
  name: string;
  fuel_type: string;
  capacity: number;

  current_stock?: number;
  location_id?: string;
  status?: FuelTankStatus;
}

export type UpdateFuelTankPayload = Partial<CreateFuelTankPayload>;

export interface FuelTankFilters {
  search?: string;
  status?: FuelTankStatus;

  page?: number;
  cursor?: number;
  limit?: number;

  sortBy?: FuelTankSortField;
  order?: "asc" | "desc";
}

export interface OffsetPagination {
  type: "offset";
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface CursorPagination {
  type: "cursor";
  limit: number;
  nextCursor: number | null;
  hasMore: boolean;
}

export interface FuelTanksResponse {
  success: boolean;
  pagination: OffsetPagination | CursorPagination;
  data: FuelTank[];
}

export interface FuelTankResponse {
  success: boolean;
  data: FuelTank;
  message?: string;
}

export interface FuelTankStats {
  total: number;
  active: number;
  inactive: number;
}

export interface FuelTankStatsResponse {
  success: boolean;
  data: FuelTankStats;
}
