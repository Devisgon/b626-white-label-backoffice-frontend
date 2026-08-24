import { apiClient } from "@/lib/api";

import type {
  CreateTransferPayload,
  FundTransfer,
  TransferFilters,
  TransfersResponse,
  VoidTransferPayload,
} from "@/features/banking/types";

const TRANSFERS_ENDPOINT = "/bank/transfers";

export async function getTransfers(
  filters: TransferFilters = {},
): Promise<TransfersResponse> {
  const response =
    await apiClient.get<TransfersResponse>(
      TRANSFERS_ENDPOINT,
      {
        params: filters,
      },
    );

  return response.data;
}

export async function getTransferById(
  transferId: string,
): Promise<FundTransfer> {
  const response =
    await apiClient.get<FundTransfer>(
      `${TRANSFERS_ENDPOINT}/${transferId}`,
    );

  return response.data;
}

export async function createTransfer(
  payload: CreateTransferPayload,
): Promise<FundTransfer> {
  const response =
    await apiClient.post<FundTransfer>(
      TRANSFERS_ENDPOINT,
      payload,
    );

  return response.data;
}

export async function voidTransfer(
  transferId: string,
  payload: VoidTransferPayload,
): Promise<FundTransfer> {
  const response =
    await apiClient.post<FundTransfer>(
      `${TRANSFERS_ENDPOINT}/${transferId}/void`,
      payload,
    );

  return response.data;
}