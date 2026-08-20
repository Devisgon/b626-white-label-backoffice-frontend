export type UnitStatus =
  | "Active"
  | "Inactive";

export interface Unit {
  id: number;
  name: string;
  shortName: string;
  status: UnitStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUnitPayload {
  name: string;
  short_name?: string;
  status?: UnitStatus;
}

export type UpdateUnitPayload =
  Partial<CreateUnitPayload>;

export interface UnitFilters {
  search?: string;
  status?: UnitStatus | "all";
  page?: number;
  cursor?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface UnitStats {
  total: number;
  active: number;
  inactive: number;
}