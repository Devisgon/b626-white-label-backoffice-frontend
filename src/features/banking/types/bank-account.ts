export type BankAccountType = "checking" | "savings" | "cash" | "credit";

export type BankAccountStatus = "active" | "inactive" | "closed";

export interface BankAccount {
  id: string;
  tenantId?: string;
  locationId?: string;
  accountName: string;
  institution: string;
  accountType: BankAccountType;
  lastFour: string;
  openingBalance: number | string;
  currentBalance: number | string;
  openingDate: string;
  status: BankAccountStatus;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export interface CreateBankAccountPayload {
  accountName: string;
  institution: string;
  accountType: BankAccountType;
  lastFour: string;
  openingBalance: number;
  openingDate: string;
}

export interface UpdateBankAccountPayload {
  accountName?: string;
  institution?: string;
  accountType?: BankAccountType;
  lastFour?: string;
  openingBalance?: number;
  openingDate?: string;
  status?: BankAccountStatus;
}

export interface BankAccountFilters {
  page?: number;
  limit?: number;
  status?: BankAccountStatus;
  type?: BankAccountType;
  search?: string;
}

export interface BankAccountStatementPeriod {
  dateFrom: string;
  dateTo: string;
}

export interface BankAccountStatementTransaction {
  id: string;
  transactionDate: string;
  direction: "inflow" | "outflow";
  amount: number | string;
  description?: string | null;
  status: string;
}

export interface BankAccountStatement {
  bankAccountId: string;
  accountName: string;
  institution: string;
  statementPeriod: BankAccountStatementPeriod;
  openingBalance: number;
  closingBalance: number;
  totalInflow: number;
  totalOutflow: number;
  transactionCount: number;
  transactions: BankAccountStatementTransaction[];
}
