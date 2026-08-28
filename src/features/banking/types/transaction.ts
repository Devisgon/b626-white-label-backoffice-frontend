export type TransactionType = "deposit" | "payment" | "adjustment";

export type TransactionDirection = "inflow" | "outflow";

export type TransactionStatus = "draft" | "posted" | "voided";

export type TransactionLineType = "debit" | "credit";

export interface TransactionLine {
  id?: string;
  accountId: string;
  lineType: TransactionLineType;
  amount: number;
  description?: string | null;
}

export interface BankTransaction {
  id: string;
  transactionType: TransactionType;
  direction: TransactionDirection;
  transactionDate: string;
  bankAccountId: string;
  payeeId?: string | null;
  referenceNumber?: string | null;
  memo?: string | null;
  amount: number;
  status: TransactionStatus;
  postedAt?: string | null;
  voidedAt?: string | null;
  voidReason?: string | null;
  createdAt: string;
  lines?: TransactionLine[];
}

export interface CreateTransactionPayload {
  transactionType: TransactionType;
  direction: TransactionDirection;
  transactionDate: string;
  bankAccountId: string;
  payeeId?: string;
  referenceNumber?: string;
  memo?: string;
  amount: number;
  lines: TransactionLine[];
}

export interface VoidTransactionPayload {
  voidReason: string;
}

export interface TransactionFilters {
  page?: number;
  limit?: number;
  status?: TransactionStatus | "";
  bankAccountId?: string;
  direction?: TransactionDirection | "";
  dateFrom?: string;
  dateTo?: string;
}

export interface BankRegisterEntry {
  id: string;
  transactionDate: string;
  transactionType: TransactionType;
  referenceNumber?: string | null;
  payeeName?: string | null;
  memo?: string | null;
  deposit?: number | null;
  payment?: number | null;
  runningBalance: number;
  status: TransactionStatus;
}
