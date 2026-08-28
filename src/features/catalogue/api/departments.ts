import { apiClient } from "@/lib/api";

import type {
  CreateDepartmentPayload,
  Department,
  DepartmentFilters,
  DepartmentStats,
  UpdateDepartmentPayload,
} from "@/features/catalogue/types";

interface BackendDepartment {
  id: number;
  name: string;
  description: string | null;
  default_tax_rate: number | null;
  default_margin: number | null;
  age_restriction: boolean | null;
  nacs_code: string | null;
  pos_department_number: number | null;
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

interface DepartmentResponse {
  success: boolean;
  message?: string;
  data: BackendDepartment;
}

interface DepartmentsResponse {
  success: boolean;
  data: BackendDepartment[];

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

interface DepartmentStatsResponse {
  success: boolean;

  data: {
    totalDepartments: number;
    activeDepartments: number;
    inactiveDepartments: number;
  };
}

export interface DepartmentsResult {
  departments: Department[];
  pagination: DepartmentsResponse["pagination"];
}

function mapDepartment(department: BackendDepartment): Department {
  return {
    id: Number(department.id),
    name: department.name,
    description: department.description ?? "",
    defaultTaxRate: department.default_tax_rate ?? null,
    defaultMargin: department.default_margin ?? null,
    ageRestriction: department.age_restriction ?? false,
    nacsCode: department.nacs_code ?? "",
    posDepartmentNumber: department.pos_department_number ?? null,
    status: department.status,
    createdAt: department.created_at,
    updatedAt: department.updated_at,
  };
}

export async function getDepartments(
  filters: DepartmentFilters = {},
): Promise<DepartmentsResult> {
  const response = await apiClient.get<DepartmentsResponse>(
    "/catalogue/departments",
    {
      params: {
        search: filters.search || undefined,

        status: filters.status === "all" ? undefined : filters.status,

        page: filters.page,
        cursor: filters.cursor,
        limit: filters.limit ?? 10,
        sortBy: filters.sortBy,
        order: filters.order ?? "asc",
      },
    },
  );

  return {
    departments: response.data.data.map(mapDepartment),

    pagination: response.data.pagination,
  };
}

export async function getDepartment(id: number): Promise<Department> {
  const response = await apiClient.get<DepartmentResponse>(
    `/catalogue/departments/${id}`,
  );

  return mapDepartment(response.data.data);
}

export async function getDepartmentStats(): Promise<DepartmentStats> {
  const response = await apiClient.get<DepartmentStatsResponse>(
    "/catalogue/departments/stats",
  );

  return {
    total: response.data.data.totalDepartments,

    active: response.data.data.activeDepartments,

    inactive: response.data.data.inactiveDepartments,
  };
}

export async function createDepartment(
  payload: CreateDepartmentPayload,
): Promise<Department> {
  const response = await apiClient.post<DepartmentResponse>(
    "/catalogue/departments",
    payload,
  );

  return mapDepartment(response.data.data);
}

export async function updateDepartment(
  id: number,
  payload: UpdateDepartmentPayload,
): Promise<Department> {
  const response = await apiClient.patch<DepartmentResponse>(
    `/catalogue/departments/${id}`,
    payload,
  );

  return mapDepartment(response.data.data);
}

export async function deleteDepartment(id: number): Promise<Department> {
  const response = await apiClient.delete<DepartmentResponse>(
    `/catalogue/departments/${id}`,
  );

  return mapDepartment(response.data.data);
}

export async function restoreDepartment(id: number): Promise<Department> {
  const response = await apiClient.patch<DepartmentResponse>(
    `/catalogue/departments/${id}/restore`,
  );

  return mapDepartment(response.data.data);
}
