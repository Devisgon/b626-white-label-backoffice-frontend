import { apiClient } from "@/lib/api";

import type {
  BankReconciliation,
  BankTransaction,
  CreateReconciliationPayload,
  MatchReconciliationLinePayload,
  ReconciliationDetails,
  ReconciliationFilters,
  ReconciliationLine,
  ReconciliationsResponse,
  UnmatchReconciliationResponse,
} from "@/features/banking/types";

const RECONCILIATIONS_ENDPOINT = "/bank/reconciliations";

export async function getReconciliations(
  filters: ReconciliationFilters = {},
): Promise<ReconciliationsResponse> {
  const response = await apiClient.get<ReconciliationsResponse>(
    RECONCILIATIONS_ENDPOINT,
    {
      params: filters,
    },
  );

  return response.data;
}

export async function getReconciliationById(
  reconciliationId: string,
): Promise<ReconciliationDetails> {
  const response = await apiClient.get<ReconciliationDetails>(
    `${RECONCILIATIONS_ENDPOINT}/${reconciliationId}`,
  );

  return response.data;
}

export async function createReconciliation(
  payload: CreateReconciliationPayload,
): Promise<BankReconciliation> {
  const response = await apiClient.post<BankReconciliation>(
    RECONCILIATIONS_ENDPOINT,
    payload,
  );

  return response.data;
}

export async function getUnmatchedTransactions(
  reconciliationId: string,
): Promise<BankTransaction[]> {
  const response = await apiClient.get<BankTransaction[]>(
    `${RECONCILIATIONS_ENDPOINT}/${reconciliationId}/unmatched-transactions`,
  );

  return response.data;
}

export async function matchReconciliationLine(
  reconciliationId: string,
  payload: MatchReconciliationLinePayload,
): Promise<ReconciliationLine> {
  const response = await apiClient.post<ReconciliationLine>(
    `${RECONCILIATIONS_ENDPOINT}/${reconciliationId}/match`,
    payload,
  );

  return response.data;
}

export async function unmatchReconciliationLine(
  reconciliationId: string,
  transactionId: string,
): Promise<UnmatchReconciliationResponse> {
  const response = await apiClient.delete<UnmatchReconciliationResponse>(
    `${RECONCILIATIONS_ENDPOINT}/${reconciliationId}/match/${transactionId}`,
  );

  return response.data;
}

export async function completeReconciliation(
  reconciliationId: string,
): Promise<ReconciliationDetails> {
  const response = await apiClient.post<ReconciliationDetails>(
    `${RECONCILIATIONS_ENDPOINT}/${reconciliationId}/complete`,
  );

  return response.data;
}
