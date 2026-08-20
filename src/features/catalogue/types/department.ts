export type DepartmentStatus =
  | "Active"
  | "Inactive";

export interface Department {
  id: number;
  name: string;
  description: string;
  defaultTaxRate: number | null;
  defaultMargin: number | null;
  ageRestriction: boolean;
  nacsCode: string;
  posDepartmentNumber: number | null;
  status: DepartmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentPayload {
  name: string;
  description?: string;
  default_tax_rate?: number;
  default_margin?: number;
  age_restriction?: boolean;
  nacs_code?: string;
  pos_department_number?: number;
  status?: DepartmentStatus;
}

export type UpdateDepartmentPayload =
  Partial<CreateDepartmentPayload>;

export interface DepartmentFilters {
  search?: string;
  status?: DepartmentStatus | "all";
  page?: number;
  cursor?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface DepartmentStats {
  total: number;
  active: number;
  inactive: number;
}