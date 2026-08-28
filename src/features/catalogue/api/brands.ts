import { apiClient } from "@/lib/api";

import type {
  Brand,
  BrandFilters,
  BrandStats,
  CreateBrandPayload,
  UpdateBrandPayload,
} from "@/features/catalogue/types";

interface BackendBrand {
  id: number;
  name: string;
  description: string | null;
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

interface BrandResponse {
  success: boolean;
  message?: string;
  data: BackendBrand;
}

interface BrandsResponse {
  success: boolean;
  data: BackendBrand[];

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

interface BrandStatsResponse {
  success: boolean;

  data: {
    totalBrands: number;
    activeBrands: number;
    inactiveBrands: number;
  };
}

export interface BrandsResult {
  brands: Brand[];
  pagination: BrandsResponse["pagination"];
}

function mapBrand(brand: BackendBrand): Brand {
  return {
    id: Number(brand.id),
    name: brand.name,
    description: brand.description ?? "",
    status: brand.status,
    createdAt: brand.created_at,
    updatedAt: brand.updated_at,
  };
}

export async function getBrands(
  filters: BrandFilters = {},
): Promise<BrandsResult> {
  const response = await apiClient.get<BrandsResponse>("/catalogue/brands", {
    params: {
      search: filters.search || undefined,

      status: filters.status === "all" ? undefined : filters.status,

      page: filters.page,
      cursor: filters.cursor,
      limit: filters.limit ?? 10,
      sortBy: filters.sortBy,
      order: filters.order ?? "asc",
    },
  });

  return {
    brands: response.data.data.map(mapBrand),
    pagination: response.data.pagination,
  };
}

export async function getBrand(id: number): Promise<Brand> {
  const response = await apiClient.get<BrandResponse>(
    `/catalogue/brands/${id}`,
  );

  return mapBrand(response.data.data);
}

export async function getBrandStats(): Promise<BrandStats> {
  const response = await apiClient.get<BrandStatsResponse>(
    "/catalogue/brands/stats",
  );

  return {
    total: response.data.data.totalBrands,
    active: response.data.data.activeBrands,
    inactive: response.data.data.inactiveBrands,
  };
}

export async function createBrand(payload: CreateBrandPayload): Promise<Brand> {
  const response = await apiClient.post<BrandResponse>(
    "/catalogue/brands",
    payload,
  );

  return mapBrand(response.data.data);
}

export async function updateBrand(
  id: number,
  payload: UpdateBrandPayload,
): Promise<Brand> {
  const response = await apiClient.patch<BrandResponse>(
    `/catalogue/brands/${id}`,
    payload,
  );

  return mapBrand(response.data.data);
}

export async function deleteBrand(id: number): Promise<Brand> {
  const response = await apiClient.delete<BrandResponse>(
    `/catalogue/brands/${id}`,
  );

  return mapBrand(response.data.data);
}

export async function restoreBrand(id: number): Promise<Brand> {
  const response = await apiClient.patch<BrandResponse>(
    `/catalogue/brands/${id}/restore`,
  );

  return mapBrand(response.data.data);
}
