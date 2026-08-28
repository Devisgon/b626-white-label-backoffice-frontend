import { apiClient } from "@/lib/api";
import type { PayrollProfile, UpsertPayrollProfilePayload } from "../types";

export async function getPayrollProfiles() {
  const { data } = await apiClient.get<PayrollProfile[]>("/payroll/profiles");
  return data;
}
export async function getPayrollProfile(userId: string) {
  const { data } = await apiClient.get<PayrollProfile>(
    `/payroll/profiles/${userId}`,
  );
  return data;
}
export async function upsertPayrollProfile(
  userId: string,
  payload: UpsertPayrollProfilePayload,
) {
  const { data } = await apiClient.put<PayrollProfile>(
    `/payroll/profiles/${userId}`,
    payload,
  );
  return data;
}
export async function deactivatePayrollProfile(userId: string) {
  const { data } = await apiClient.patch<PayrollProfile>(
    `/payroll/profiles/${userId}/deactivate`,
  );
  return data;
}
export async function reactivatePayrollProfile(userId: string) {
  const { data } = await apiClient.patch<PayrollProfile>(
    `/payroll/profiles/${userId}/reactivate`,
  );
  return data;
}
