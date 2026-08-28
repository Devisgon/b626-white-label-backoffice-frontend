export type DeductionType = "TAX" | "INSURANCE" | "LOAN" | "OTHER";

export interface PayrollDeduction {
  id: string;
  userId: string;
  employeeName: string;
  type: DeductionType;
  amount: number;
  isRecurring: boolean;
  isActive: boolean;
  note: string | null;
  createdAt: string;
}

export interface CreateDeductionPayload {
  userId: string;
  type: DeductionType;
  amount: number;
  isRecurring?: boolean;
  note?: string;
}

export type UpdateDeductionPayload = Partial<
  Omit<CreateDeductionPayload, "userId">
>;
