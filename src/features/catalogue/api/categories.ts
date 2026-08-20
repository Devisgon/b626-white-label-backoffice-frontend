import { apiClient } from "@/lib/api";

import type {
  Category,
  CategoryFilters,
  CategoryStats,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/features/catalogue/types";

interface BackendCategory {
  id: number;
  name: string;
  description: string | null;
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

interface CategoryResponse {
  success: boolean;
  message?: string;
  data: BackendCategory;
}

interface CategoriesResponse {
  success: boolean;
  data: BackendCategory[];
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

interface CategoryStatsResponse {
  success: boolean;
  data: {
    totalCategories: number;
    activeCategories: number;
    inactiveCategories: number;
  };
}

export interface CategoriesResult {
  categories: Category[];
  pagination: CategoriesResponse["pagination"];
}

function mapCategory(
  category: BackendCategory,
): Category {
  return {
    id: Number(category.id),
    name: category.name,
    description: category.description ?? "",
    status: category.status,
    productCount: 0,
    createdAt: category.created_at,
    updatedAt: category.updated_at,
  };
}

export async function getCategories(
  filters: CategoryFilters = {},
): Promise<CategoriesResult> {
  const response =
    await apiClient.get<CategoriesResponse>(
      "/catalogue/categories",
      {
        params: {
          search: filters.search || undefined,
          status:
            filters.status === "all"
              ? undefined
              : filters.status,
          page: filters.page,
          limit: filters.limit ?? 10,
          sortBy: filters.sortBy,
          order: filters.order ?? "asc",
        },
      },
    );

  return {
    categories: response.data.data.map(mapCategory),
    pagination: response.data.pagination,
  };
}

export async function getCategory(
  id: number,
): Promise<Category> {
  const response =
    await apiClient.get<CategoryResponse>(
      `/catalogue/categories/${id}`,
    );

  return mapCategory(response.data.data);
}

export async function getCategoryStats(): Promise<CategoryStats> {
  const response =
    await apiClient.get<CategoryStatsResponse>(
      "/catalogue/categories/stats",
    );

  return {
    total: response.data.data.totalCategories,
    active: response.data.data.activeCategories,
    inactive: response.data.data.inactiveCategories,
  };
}

export async function createCategory(
  payload: CreateCategoryPayload,
): Promise<Category> {
  const response =
    await apiClient.post<CategoryResponse>(
      "/catalogue/categories",
      payload,
    );

  return mapCategory(response.data.data);
}

export async function updateCategory(
  id: number,
  payload: UpdateCategoryPayload,
): Promise<Category> {
  const response =
    await apiClient.patch<CategoryResponse>(
      `/catalogue/categories/${id}`,
      payload,
    );

  return mapCategory(response.data.data);
}

export async function deleteCategory(
  id: number,
): Promise<Category> {
  const response =
    await apiClient.delete<CategoryResponse>(
      `/catalogue/categories/${id}`,
    );

  return mapCategory(response.data.data);
}

export async function restoreCategory(
  id: number,
): Promise<Category> {
  const response =
    await apiClient.patch<CategoryResponse>(
      `/catalogue/categories/${id}/restore`,
    );

  return mapCategory(response.data.data);
}