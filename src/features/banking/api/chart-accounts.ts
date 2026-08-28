import { apiClient } from "@/lib/api";

import type {
  ChartAccount,
  ChartAccountFilters,
  CreateChartAccountPayload,
  UpdateChartAccountPayload,
} from "@/features/banking/types";

export interface ChartAccountsResponse {
  data: ChartAccount[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getChartAccounts(filters: ChartAccountFilters = {}) {
  const response = await apiClient.get<ChartAccountsResponse>(
    "/bank/chart-of-accounts",
    {
      params: {
        page: filters.page,
        limit: filters.limit,
        status: filters.status || undefined,
        category: filters.category || undefined,
        search: filters.search || undefined,
      },
    },
  );

  return response.data;
}

export async function getChartAccount(accountId: string) {
  const response = await apiClient.get<ChartAccount>(
    `/bank/chart-of-accounts/${accountId}`,
  );

  return response.data;
}

export async function createChartAccount(payload: CreateChartAccountPayload) {
  const response = await apiClient.post<ChartAccount>(
    "/bank/chart-of-accounts",
    payload,
  );

  return response.data;
}

export async function updateChartAccount(
  accountId: string,
  payload: UpdateChartAccountPayload,
) {
  const response = await apiClient.patch<ChartAccount>(
    `/bank/chart-of-accounts/${accountId}`,
    payload,
  );

  return response.data;
}

export async function deactivateChartAccount(accountId: string) {
  const response = await apiClient.delete<ChartAccount>(
    `/bank/chart-of-accounts/${accountId}`,
  );

  return response.data;
}
