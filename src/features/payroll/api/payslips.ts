import { apiClient } from "@/lib/api";
import type { PayRunItem } from "../types";

export async function getMyPayslips() {
  const { data } = await apiClient.get<PayRunItem[]>("/payroll/payslips/mine");
  return data;
}

export async function getEmployeePayslips(userId: string) {
  const { data } = await apiClient.get<PayRunItem[]>(
    `/payroll/payslips/${userId}`,
  );
  return data;
}
