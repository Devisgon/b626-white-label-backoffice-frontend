import { apiClient } from "@/lib/api";

import type {
  CreateSupplierPayload,
  Supplier,
  SupplierFilters,
  SupplierStats,
  UpdateSupplierPayload,
} from "@/features/catalogue/types";

interface BackendSupplier {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

interface SupplierResponse {
  success: boolean;
  message?: string;
  data: BackendSupplier;
}

interface SuppliersResponse {
  success: boolean;
  data: BackendSupplier[];

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

interface SupplierStatsResponse {
  success: boolean;

  data: {
    totalSuppliers: number;
    activeSuppliers: number;
    inactiveSuppliers: number;
  };
}

export interface SuppliersResult {
  suppliers: Supplier[];
  pagination: SuppliersResponse["pagination"];
}

function mapSupplier(
  supplier: BackendSupplier,
): Supplier {
  return {
    id: Number(supplier.id),
    name: supplier.name,
    email: supplier.email ?? "",
    phone: supplier.phone ?? "",
    address: supplier.address ?? "",
    status: supplier.status,
    createdAt: supplier.created_at,
    updatedAt: supplier.updated_at,
  };
}

export async function getSuppliers(
  filters: SupplierFilters = {},
): Promise<SuppliersResult> {
  const response =
    await apiClient.get<SuppliersResponse>(
      "/catalogue/suppliers",
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
    suppliers:
      response.data.data.map(mapSupplier),

    pagination: response.data.pagination,
  };
}

export async function getSupplier(
  id: number,
): Promise<Supplier> {
  const response =
    await apiClient.get<SupplierResponse>(
      `/catalogue/suppliers/${id}`,
    );

  return mapSupplier(response.data.data);
}

export async function getSupplierStats(): Promise<SupplierStats> {
  const response =
    await apiClient.get<SupplierStatsResponse>(
      "/catalogue/suppliers/stats",
    );

  return {
    total:
      response.data.data.totalSuppliers,

    active:
      response.data.data.activeSuppliers,

    inactive:
      response.data.data.inactiveSuppliers,
  };
}

export async function createSupplier(
  payload: CreateSupplierPayload,
): Promise<Supplier> {
  const response =
    await apiClient.post<SupplierResponse>(
      "/catalogue/suppliers",
      payload,
    );

  return mapSupplier(response.data.data);
}

export async function updateSupplier(
  id: number,
  payload: UpdateSupplierPayload,
): Promise<Supplier> {
  const response =
    await apiClient.patch<SupplierResponse>(
      `/catalogue/suppliers/${id}`,
      payload,
    );

  return mapSupplier(response.data.data);
}

export async function deleteSupplier(
  id: number,
): Promise<Supplier> {
  const response =
    await apiClient.delete<SupplierResponse>(
      `/catalogue/suppliers/${id}`,
    );

  return mapSupplier(response.data.data);
}

export async function restoreSupplier(
  id: number,
): Promise<Supplier> {
  const response =
    await apiClient.patch<SupplierResponse>(
      `/catalogue/suppliers/${id}/restore`,
    );

  return mapSupplier(response.data.data);
}