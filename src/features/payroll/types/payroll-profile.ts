export type PayType = "HOURLY" | "SALARY";

export interface PayrollProfile {
  id: string;
  userId: string;
  employeeName: string;
  payType: PayType;
  baseRate: number;
  overtimeRate: number | null;
  bankAccountId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertPayrollProfilePayload {
  payType: PayType;
  baseRate: number;
  overtimeRate?: number;
  bankAccountId?: string;
}
