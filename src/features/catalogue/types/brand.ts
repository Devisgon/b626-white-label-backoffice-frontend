export type BrandStatus = "Active" | "Inactive";

export interface Brand {
  id: number;
  name: string;
  description: string;
  status: BrandStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBrandPayload {
  name: string;
  description?: string;
  status?: BrandStatus;
}

export interface UpdateBrandPayload {
  name?: string;
  description?: string;
  status?: BrandStatus;
}

export interface BrandFilters {
  search?: string;
  status?: BrandStatus | "all";
  page?: number;
  cursor?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface BrandStats {
  total: number;
  active: number;
  inactive: number;
}
