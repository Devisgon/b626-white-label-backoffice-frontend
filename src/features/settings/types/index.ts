export interface StoreProfile {
  storeName: string;
  logoUrl: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  timezone: string;
  currency: string;
}

export type UpdateStoreProfilePayload = Omit<
  StoreProfile,
  "logoUrl" | "contactEmail" | "contactPhone"
> & {
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
};

export interface TaxRule {
  id: string;
  name: string;
  ratePercent: number;
  locationId: string | null;
  locationName: string;
  isActive: boolean;
}

export interface CreateTaxRulePayload {
  name: string;
  ratePercent: number;
  locationId?: string;
}

export interface UpdateTaxRulePayload {
  name?: string;
  ratePercent?: number;
  isActive?: boolean;
}

export type PaymentMethodName = "CASH" | "CARD" | "WALLET" | "BANK_TRANSFER";
export interface PaymentMethodConfig {
  id: string;
  method: PaymentMethodName;
  isEnabled: boolean;
}
export interface ReceiptSettings {
  footerText: string;
  showLogo: boolean;
  invoicePrefix: string;
}
export type NotificationEvent =
  "LOW_STOCK" | "PAYROLL_RUN" | "LOGIN_ALERT" | "LEAVE_REQUEST";
export type NotificationChannel = "EMAIL" | "SMS";
export interface NotificationPreference {
  id: string;
  event: NotificationEvent;
  channel: NotificationChannel;
  isEnabled: boolean;
}
export interface SecurityPolicy {
  minPasswordLength: number;
  sessionTimeoutMinutes: number;
  require2FA: boolean;
}
export interface ApiIntegration {
  id: string;
  provider: string;
  isActive: boolean;
  createdAt: string;
}
export interface ActivityEntry {
  source: "AUTH" | "BANKING" | "CATALOGUE";
  action: string;
  performedBy: string | null;
  createdAt: string;
  details?: string | null;
}
