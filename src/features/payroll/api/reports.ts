import { apiClient } from "@/lib/api";
import type { PayrollSummary } from "../types";

export interface PayrollReportFilters {
  locationId?: string;
  periodStart?: string;
  periodEnd?: string;
}

export async function getPayrollSummary(params?: PayrollReportFilters) {
  const { data } = await apiClient.get<PayrollSummary>(
    "/payroll/reports/summary",
    { params },
  );
  return data;
}

export async function getPayrollByLocation(
  params?: Omit<PayrollReportFilters, "locationId">,
) {
  const { data } = await apiClient.get<
    Array<PayrollSummary & { locationId: string; locationName: string }>
  >("/payroll/reports/by-location", { params });
  return data;
}
