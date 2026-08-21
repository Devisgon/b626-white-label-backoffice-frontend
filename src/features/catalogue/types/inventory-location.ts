export type InventoryLocationStatus =
  | "Active"
  | "Inactive";

export interface InventoryLocation {
  id: number;
  name: string;
  code: string;
  address?: string;
  status: InventoryLocationStatus;
  created_at?: string;
  updated_at?: string;
}

export interface CreateInventoryLocationPayload {
  name: string;
  code: string;
  address?: string;
  status: InventoryLocationStatus;
}

export type UpdateInventoryLocationPayload =
  Partial<CreateInventoryLocationPayload>;

export interface InventoryLocationFilters {
  search?: string;
  status?: InventoryLocationStatus;
  page?: number;
  cursor?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}