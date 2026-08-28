import { apiClient } from "@/lib/api";
import type {
  CreateMaintenanceLogPayload,
  UpdateMaintenanceLogPayload,
  OperationsMaintenanceLog,
} from "../types";
export async function getMaintenanceLogs(params?: Record<string, unknown>) {
  const { data } = await apiClient.get("/operations/maintenance-logs", {
    params,
  });
  return data;
}
export async function getMaintenanceLogStats() {
  const { data } = await apiClient.get("/operations/maintenance-logs/stats");
  return data;
}
export async function getMaintenanceLog(id: number) {
  const { data } = await apiClient.get<OperationsMaintenanceLog>(
    `/operations/maintenance-logs/${id}`,
  );
  return data;
}
export async function createMaintenanceLog(
  payload: CreateMaintenanceLogPayload,
) {
  const { data } = await apiClient.post<OperationsMaintenanceLog>(
    "/operations/maintenance-logs",
    payload,
  );
  return data;
}
export async function updateMaintenanceLog(
  id: number,
  payload: UpdateMaintenanceLogPayload,
) {
  const { data } = await apiClient.patch<OperationsMaintenanceLog>(
    `/operations/maintenance-logs/${id}`,
    payload,
  );
  return data;
}
export async function deleteMaintenanceLog(id: number) {
  await apiClient.delete(`/operations/maintenance-logs/${id}`);
}
export async function restoreMaintenanceLog(id: number) {
  const { data } = await apiClient.patch<OperationsMaintenanceLog>(
    `/operations/maintenance-logs/${id}/restore`,
  );
  return data;
}
