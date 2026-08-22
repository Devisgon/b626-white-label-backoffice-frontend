import { apiClient } from "@/lib/api";

import type {
  CreatePayeePayload,
  Payee,
  PayeeFilters,
  UpdatePayeePayload,
} from "@/features/banking/types";

export interface PayeesResponse {
  data: Payee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getPayees(
  filters: PayeeFilters = {},
) {
  const response =
    await apiClient.get<PayeesResponse>(
      "/bank/payees",
      {
        params: {
          page: filters.page,
          limit: filters.limit,
          status: filters.status || undefined,
          type: filters.type || undefined,
          search: filters.search || undefined,
        },
      },
    );

  return response.data;
}

export async function getPayee(
  payeeId: string,
) {
  const response = await apiClient.get<Payee>(
    `/bank/payees/${payeeId}`,
  );

  return response.data;
}

export async function createPayee(
  payload: CreatePayeePayload,
) {
  const response = await apiClient.post<Payee>(
    "/bank/payees",
    payload,
  );

  return response.data;
}

export async function updatePayee(
  payeeId: string,
  payload: UpdatePayeePayload,
) {
  const response = await apiClient.patch<Payee>(
    `/bank/payees/${payeeId}`,
    payload,
  );

  return response.data;
}

export async function deactivatePayee(
  payeeId: string,
) {
  const response = await apiClient.delete<Payee>(
    `/bank/payees/${payeeId}`,
  );

  return response.data;
}