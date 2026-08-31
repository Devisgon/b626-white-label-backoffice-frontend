export type PayRunStatus = "DRAFT" | "PROCESSED" | "PAID";

export interface PayRunItem {
  id: string;
  userId: string;
  employeeName: string;
  regularHours: number;
  overtimeHours: number;
  grossPay: number;
  totalDeductions: number;
  netPay: number;
}

export interface PayRun {
  id: string;
  locationId: string;
  locationName: string;
  periodStart: string;
  periodEnd: string;
  status: PayRunStatus;
  runAt: string | null;
  createdAt: string;
  items: PayRunItem[];
}

export interface CreatePayRunPayload {
  locationId: string;
  periodStart: string;
  periodEnd: string;
}

export interface PayrollSummary {
  grossPay: number;
  deductions: number;
  netPay: number;
  employeeCount: number;
}
