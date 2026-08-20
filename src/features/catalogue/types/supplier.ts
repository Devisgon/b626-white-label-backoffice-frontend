export type SupplierStatus =
  | "Active"
  | "Inactive";

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: SupplierStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierPayload {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: SupplierStatus;
}

export interface UpdateSupplierPayload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: SupplierStatus;
}

export interface SupplierFilters {
  search?: string;
  status?: SupplierStatus | "all";
  page?: number;
  cursor?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface SupplierStats {
  total: number;
  active: number;
  inactive: number;
}