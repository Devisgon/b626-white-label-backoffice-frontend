import { apiClient } from "@/lib/api";
import type {
  CreateDeductionPayload,
  PayrollDeduction,
  UpdateDeductionPayload,
} from "../types";

export async function getDeductions() {
  const { data } = await apiClient.get<PayrollDeduction[]>(
    "/payroll/deductions",
  );
  return data;
}
export async function createDeduction(payload: CreateDeductionPayload) {
  const { data } = await apiClient.post<PayrollDeduction>(
    "/payroll/deductions",
    payload,
  );
  return data;
}
export async function updateDeduction(
  id: string,
  payload: UpdateDeductionPayload,
) {
  const { data } = await apiClient.patch<PayrollDeduction>(
    `/payroll/deductions/${id}`,
    payload,
  );
  return data;
}
export async function deleteDeduction(id: string) {
  await apiClient.delete(`/payroll/deductions/${id}`);
}
