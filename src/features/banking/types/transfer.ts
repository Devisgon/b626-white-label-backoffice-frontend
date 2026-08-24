export type TransferStatus =
  | "posted"
  | "voided";

export interface FundTransfer {
  id: string;
  tenantId: string;
  locationId: string;

  sourceAccountId: string;
  destinationAccountId: string;

  amount: number | string;
  transferDate: string;
  memo: string | null;

  sourceTransactionId: string;
  destinationTransactionId: string;

  status: TransferStatus;

  voidedAt: string | null;
  voidReason: string | null;

  createdAt: string;
  updatedAt: string;

  createdBy: string | null;
  updatedBy: string | null;
}

export interface CreateTransferPayload {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  transferDate: string;
  memo?: string;
  transferClearingAccountId: string;
}

export interface VoidTransferPayload {
  voidReason: string;
}

export interface TransferFilters {
  page?: number;
  limit?: number;
  status?: TransferStatus;
}

export interface TransfersResponse {
  data: FundTransfer[];
  total: number;
  page: number;
  limit: number;
}