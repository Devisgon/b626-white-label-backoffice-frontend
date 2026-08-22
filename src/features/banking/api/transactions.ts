import { apiClient } from "@/lib/api";

import type {
  BankRegisterEntry,
  BankTransaction,
  CreateTransactionPayload,
  TransactionFilters,
  VoidTransactionPayload,
} from "@/features/banking/types";

export interface TransactionsResponse {
  data: BankTransaction[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

export interface BankRegisterResponse {
  bankAccountId: string;
  openingBalance: number;
  closingBalance: number;
  entries: BankRegisterEntry[];
}

export interface BankRegisterFilters {
  view: "posted" | "draft";
  dateFrom?: string;
  dateTo?: string;
}

export async function getTransactions(
  filters: TransactionFilters = {},
) {
  const response =
    await apiClient.get<TransactionsResponse>(
      "/bank/transactions",
      {
        params: {
          page: filters.page,
          limit: filters.limit,
          status: filters.status || undefined,

          bankAccountId:
            filters.bankAccountId || undefined,

          direction:
            filters.direction || undefined,

          dateFrom:
            filters.dateFrom || undefined,

          dateTo:
            filters.dateTo || undefined,
        },
      },
    );

  return response.data;
}

export async function getTransaction(
  transactionId: string,
) {
  const response =
    await apiClient.get<BankTransaction>(
      `/bank/transactions/${transactionId}`,
    );

  return response.data;
}

export async function createTransaction(
  payload: CreateTransactionPayload,
) {
  const response =
    await apiClient.post<BankTransaction>(
      "/bank/transactions",
      payload,
    );

  return response.data;
}

export async function postTransaction(
  transactionId: string,
) {
  const response =
    await apiClient.post<BankTransaction>(
      `/bank/transactions/${transactionId}/post`,
    );

  return response.data;
}

export async function voidTransaction(
  transactionId: string,
  payload: VoidTransactionPayload,
) {
  const response =
    await apiClient.post<BankTransaction>(
      `/bank/transactions/${transactionId}/void`,
      payload,
    );

  return response.data;
}

export async function getBankRegister(
  bankAccountId: string,
  filters: BankRegisterFilters,
) {
  const response =
    await apiClient.get<BankRegisterResponse>(
      `/bank/transactions/register/${bankAccountId}`,
      {
        params: {
          view: filters.view,

          dateFrom:
            filters.dateFrom || undefined,

          dateTo:
            filters.dateTo || undefined,
        },
      },
    );

  return response.data;
}