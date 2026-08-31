import { apiClient } from "@/lib/api";
import type {
  ActivityEntry,
  ApiIntegration,
  CreateTaxRulePayload,
  NotificationChannel,
  NotificationEvent,
  NotificationPreference,
  PaymentMethodConfig,
  PaymentMethodName,
  ReceiptSettings,
  SecurityPolicy,
  StoreProfile,
  TaxRule,
  UpdateStoreProfilePayload,
  UpdateTaxRulePayload,
} from "../types";

export async function getStoreProfile() {
  const { data } = await apiClient.get<StoreProfile>("/settings/store-profile");
  return data;
}

export async function updateStoreProfile(payload: UpdateStoreProfilePayload) {
  const { data } = await apiClient.put<StoreProfile>(
    "/settings/store-profile",
    payload,
  );
  return data;
}

export async function getTaxRules(locationId?: string) {
  const { data } = await apiClient.get<TaxRule[]>("/settings/tax-rules", {
    params: { locationId },
  });
  return data;
}

export async function createTaxRule(payload: CreateTaxRulePayload) {
  const { data } = await apiClient.post<TaxRule>(
    "/settings/tax-rules",
    payload,
  );
  return data;
}

export async function updateTaxRule(id: string, payload: UpdateTaxRulePayload) {
  const { data } = await apiClient.patch<TaxRule>(
    `/settings/tax-rules/${id}`,
    payload,
  );
  return data;
}

export async function deleteTaxRule(id: string) {
  await apiClient.delete(`/settings/tax-rules/${id}`);
}

export async function getPaymentMethods() {
  const { data } = await apiClient.get<PaymentMethodConfig[]>(
    "/settings/payment-methods",
  );
  return data;
}
export async function setPaymentMethodEnabled(
  method: PaymentMethodName,
  isEnabled: boolean,
) {
  const { data } = await apiClient.patch<PaymentMethodConfig>(
    `/settings/payment-methods/${method}`,
    { isEnabled },
  );
  return data;
}
export async function getReceiptSettings() {
  const { data } = await apiClient.get<ReceiptSettings>("/settings/receipt");
  return data;
}
export async function updateReceiptSettings(payload: Partial<ReceiptSettings>) {
  const { data } = await apiClient.put<ReceiptSettings>(
    "/settings/receipt",
    payload,
  );
  return data;
}
export async function getMyNotificationPreferences() {
  const { data } = await apiClient.get<NotificationPreference[]>(
    "/settings/notifications/mine",
  );
  return data;
}
export async function setNotificationPreference(
  event: NotificationEvent,
  channel: NotificationChannel,
  isEnabled: boolean,
) {
  const { data } = await apiClient.patch<NotificationPreference>(
    `/settings/notifications/mine/${event}/${channel}`,
    { isEnabled },
  );
  return data;
}
export async function getSecurityPolicy() {
  const { data } = await apiClient.get<SecurityPolicy>("/settings/security");
  return data;
}
export async function updateSecurityPolicy(payload: Partial<SecurityPolicy>) {
  const { data } = await apiClient.put<SecurityPolicy>(
    "/settings/security",
    payload,
  );
  return data;
}
export async function getIntegrations() {
  const { data } = await apiClient.get<ApiIntegration[]>(
    "/settings/integrations",
  );
  return data;
}
export async function createIntegration(payload: {
  provider: string;
  apiKey: string;
}) {
  const { data } = await apiClient.post<ApiIntegration>(
    "/settings/integrations",
    payload,
  );
  return data;
}
export const deactivateIntegration = (id: string) =>
  apiClient.patch(`/settings/integrations/${id}/deactivate`);
export const reactivateIntegration = (id: string) =>
  apiClient.patch(`/settings/integrations/${id}/reactivate`);
export const deleteIntegration = (id: string) =>
  apiClient.delete(`/settings/integrations/${id}`);
export async function getActivityLog(params?: {
  dateFrom?: string;
  dateTo?: string;
  source?: string;
  limit?: number;
}) {
  const { data } = await apiClient.get<ActivityEntry[]>(
    "/settings/activity-log",
    { params },
  );
  return data;
}
