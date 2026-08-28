export type CategoryStatus = "Active" | "Inactive";

export interface Category {
  id: number;
  name: string;
  description: string;
  status: CategoryStatus;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  status?: CategoryStatus;
}

export interface UpdateCategoryPayload {
  name?: string;
  description?: string;
  status?: CategoryStatus;
}

export interface CategoryFilters {
  search?: string;
  status?: CategoryStatus | "all";
  page?: number;
  limit?: number;
  sortBy?: keyof Category;
  order?: "asc" | "desc";
}

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
}
