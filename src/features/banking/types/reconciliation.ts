import type {
  BankTransaction,
} from "./transaction";

export type ReconciliationStatus =
  | "in_progress"
  | "completed"
  | "cancelled";

export interface BankReconciliation {
  id: string;
  tenantId: string;
  locationId: string;

  bankAccountId: string;

  statementStartDate: string;
  statementEndDate: string;

  statementEndingBalance: number | string;

  systemBalanceAtCompletion:
    | number
    | string
    | null;

  status: ReconciliationStatus;

  completedAt: string | null;

  createdAt: string;
  updatedAt: string;

  createdBy: string | null;
  updatedBy: string | null;
}

export interface ReconciliationLine {
  id: string;
  reconciliationId: string;
  transactionId: string;

  cleared: boolean;
  statementReference: string | null;

  createdAt: string;

  transaction?: BankTransaction;
}

export interface ReconciliationDetails
  extends BankReconciliation {
  lines: ReconciliationLine[];
}

export interface CreateReconciliationPayload {
  bankAccountId: string;
  statementStartDate: string;
  statementEndDate: string;
  statementEndingBalance: number;
}

export interface MatchReconciliationLinePayload {
  transactionId: string;
  cleared?: boolean;
  statementReference?: string;
}

export interface ReconciliationFilters {
  page?: number;
  limit?: number;
  bankAccountId?: string;
  status?: ReconciliationStatus;
}

export interface ReconciliationsResponse {
  data: BankReconciliation[];
  total: number;
  page: number;
  limit: number;
}

export interface UnmatchReconciliationResponse {
  unmatched: boolean;
}