export type ChartAccountCategory =
  | "asset"
  | "liability"
  | "equity"
  | "revenue"
  | "expense";

export type NormalBalance =
  | "debit"
  | "credit";

export type ChartAccountStatus =
  | "active"
  | "inactive";

export interface ChartAccount {
  id: string;
  accountCode: string;
  accountName: string;
  accountCategory: ChartAccountCategory;
  normalBalance: NormalBalance;
  parentAccountId?: string | null;
  isSystem: boolean;
  status: ChartAccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChartAccountPayload {
  accountCode: string;
  accountName: string;
  accountCategory: ChartAccountCategory;
  normalBalance: NormalBalance;
  parentAccountId?: string;
  description?: string;
}

export interface UpdateChartAccountPayload
  extends Partial<CreateChartAccountPayload> {
  status?: ChartAccountStatus;
}

export interface ChartAccountFilters {
  page?: number;
  limit?: number;
  status?: ChartAccountStatus | "";
  category?: ChartAccountCategory | "";
  search?: string;
}