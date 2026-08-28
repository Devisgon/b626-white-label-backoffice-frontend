export type PayeeType =
  "vendor" | "supplier" | "individual" | "utility" | "other";

export type PayeeStatus = "active" | "inactive";

export interface Payee {
  id: string;
  payeeName: string;
  payeeType: PayeeType;
  email?: string | null;
  phone?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  taxId?: string | null;
  defaultAccountId?: string | null;
  notes?: string | null;
  status: PayeeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePayeePayload {
  payeeName: string;
  payeeType: PayeeType;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  taxId?: string;
  defaultAccountId?: string;
  notes?: string;
}

export interface UpdatePayeePayload extends Partial<CreatePayeePayload> {
  status?: PayeeStatus;
}

export interface PayeeFilters {
  page?: number;
  limit?: number;
  status?: PayeeStatus | "";
  type?: PayeeType | "";
  search?: string;
}
