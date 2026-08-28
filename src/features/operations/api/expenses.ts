import { apiClient } from "@/lib/api";
import type {
  CreateExpensePayload,
  UpdateExpensePayload,
  OperationsExpense,
} from "../types";
export async function getExpenses(params?: Record<string, unknown>) {
  const { data } = await apiClient.get("/operations/expenses", { params });
  return data;
}
export async function getExpenseStats() {
  const { data } = await apiClient.get("/operations/expenses/stats");
  return data;
}
export async function getExpense(id: number) {
  const { data } = await apiClient.get<OperationsExpense>(
    `/operations/expenses/${id}`,
  );
  return data;
}
export async function createExpense(payload: CreateExpensePayload) {
  const { data } = await apiClient.post<OperationsExpense>(
    "/operations/expenses",
    payload,
  );
  return data;
}
export async function updateExpense(id: number, payload: UpdateExpensePayload) {
  const { data } = await apiClient.patch<OperationsExpense>(
    `/operations/expenses/${id}`,
    payload,
  );
  return data;
}
export async function deleteExpense(id: number) {
  await apiClient.delete(`/operations/expenses/${id}`);
}
export async function restoreExpense(id: number) {
  const { data } = await apiClient.patch<OperationsExpense>(
    `/operations/expenses/${id}/restore`,
  );
  return data;
}
