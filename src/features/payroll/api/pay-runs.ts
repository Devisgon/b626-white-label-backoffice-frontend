import { apiClient } from "@/lib/api";
import type { CreatePayRunPayload, PayRun } from "../types";

export async function getPayRuns(params?: {
  locationId?: string;
  status?: string;
}) {
  const { data } = await apiClient.get<PayRun[]>("/payroll/pay-runs", {
    params,
  });
  return data;
}

export async function getPayRun(id: string) {
  const { data } = await apiClient.get<PayRun>(`/payroll/pay-runs/${id}`);
  return data;
}

export async function createPayRun(payload: CreatePayRunPayload) {
  const { data } = await apiClient.post<PayRun>("/payroll/pay-runs", payload);
  return data;
}

export async function processPayRun(id: string) {
  const { data } = await apiClient.patch<PayRun>(
    `/payroll/pay-runs/${id}/process`,
  );
  return data;
}

export async function markPayRunPaid(id: string) {
  const { data } = await apiClient.patch<PayRun>(
    `/payroll/pay-runs/${id}/mark-paid`,
  );
  return data;
}
