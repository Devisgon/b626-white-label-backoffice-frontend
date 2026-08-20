import { apiClient } from "@/lib/api";

import type {
  CreateUnitPayload,
  Unit,
  UnitFilters,
  UnitStats,
  UpdateUnitPayload,
} from "@/features/catalogue/types";

interface BackendUnit {
  id: number;
  name: string;
  short_name: string | null;
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

interface UnitResponse {
  success: boolean;
  message?: string;
  data: BackendUnit;
}

interface UnitsResponse {
  success: boolean;
  data: BackendUnit[];

  pagination: {
    type: "offset" | "cursor";
    page?: number;
    limit: number;
    totalRecords?: number;
    totalPages?: number;
    nextCursor?: number | null;
    hasMore?: boolean;
  };
}

interface UnitStatsResponse {
  success: boolean;

  data: {
    totalUnits: number;
    activeUnits: number;
    inactiveUnits: number;
  };
}

export interface UnitsResult {
  units: Unit[];
  pagination: UnitsResponse["pagination"];
}

function mapUnit(
  unit: BackendUnit,
): Unit {
  return {
    id: Number(unit.id),
    name: unit.name,
    shortName: unit.short_name ?? "",
    status: unit.status,
    createdAt: unit.created_at,
    updatedAt: unit.updated_at,
  };
}

export async function getUnits(
  filters: UnitFilters = {},
): Promise<UnitsResult> {
  const response =
    await apiClient.get<UnitsResponse>(
      "/catalogue/units",
      {
        params: {
          search: filters.search || undefined,

          status:
            filters.status === "all"
              ? undefined
              : filters.status,

          page: filters.page,
          cursor: filters.cursor,
          limit: filters.limit ?? 10,
          sortBy: filters.sortBy,
          order: filters.order ?? "asc",
        },
      },
    );

  return {
    units: response.data.data.map(mapUnit),
    pagination: response.data.pagination,
  };
}

export async function getUnit(
  id: number,
): Promise<Unit> {
  const response =
    await apiClient.get<UnitResponse>(
      `/catalogue/units/${id}`,
    );

  return mapUnit(response.data.data);
}

export async function getUnitStats(): Promise<UnitStats> {
  const response =
    await apiClient.get<UnitStatsResponse>(
      "/catalogue/units/stats",
    );

  return {
    total: response.data.data.totalUnits,
    active: response.data.data.activeUnits,
    inactive: response.data.data.inactiveUnits,
  };
}

export async function createUnit(
  payload: CreateUnitPayload,
): Promise<Unit> {
  const response =
    await apiClient.post<UnitResponse>(
      "/catalogue/units",
      payload,
    );

  return mapUnit(response.data.data);
}

export async function updateUnit(
  id: number,
  payload: UpdateUnitPayload,
): Promise<Unit> {
  const response =
    await apiClient.patch<UnitResponse>(
      `/catalogue/units/${id}`,
      payload,
    );

  return mapUnit(response.data.data);
}

export async function deleteUnit(
  id: number,
): Promise<Unit> {
  const response =
    await apiClient.delete<UnitResponse>(
      `/catalogue/units/${id}`,
    );

  return mapUnit(response.data.data);
}

export async function restoreUnit(
  id: number,
): Promise<Unit> {
  const response =
    await apiClient.patch<UnitResponse>(
      `/catalogue/units/${id}/restore`,
    );

  return mapUnit(response.data.data);
}