import { apiClient } from "@/lib/api";

import type {
  BankAccount,
  BankAccountFilters,
  BankAccountStatement,
  CreateBankAccountPayload,
  UpdateBankAccountPayload,
} from "@/features/banking/types";

export interface BankAccountsResponse {
  data: BankAccount[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getBankAccounts(
  filters: BankAccountFilters = {},
) {
  const response =
    await apiClient.get<BankAccountsResponse>(
      "/bank/accounts",
      {
        params: {
          page: filters.page,
          limit: filters.limit,
          status: filters.status,
          type: filters.type,
          search: filters.search,
        },
      },
    );

  return response.data;
}

export async function getBankAccount(
  accountId: string,
) {
  const response = await apiClient.get<BankAccount>(
    `/bank/accounts/${accountId}`,
  );

  return response.data;
}

export async function createBankAccount(
  payload: CreateBankAccountPayload,
) {
  const response = await apiClient.post<BankAccount>(
    "/bank/accounts",
    payload,
  );

  return response.data;
}

export async function updateBankAccount(
  accountId: string,
  payload: UpdateBankAccountPayload,
) {
  const response = await apiClient.patch<BankAccount>(
    `/bank/accounts/${accountId}`,
    payload,
  );

  return response.data;
}

export async function closeBankAccount(
  accountId: string,
) {
  const response = await apiClient.delete<BankAccount>(
    `/bank/accounts/${accountId}`,
  );

  return response.data;
}

export async function getBankAccountStatement(
  accountId: string,
  dateFrom: string,
  dateTo: string,
) {
  const response =
    await apiClient.get<BankAccountStatement>(
      `/bank/accounts/${accountId}/statement`,
      {
        params: {
          dateFrom,
          dateTo,
        },
      },
    );

  return response.data;
}