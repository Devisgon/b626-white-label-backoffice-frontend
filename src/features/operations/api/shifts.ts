import { apiClient } from "@/lib/api";
import type { CreateShiftPayload, UpdateShiftPayload, OperationsShift } from "../types";
export async function getShifts(params?: Record<string, unknown>) { const { data } = await apiClient.get("/operations/shifts", { params }); return data; }
export async function getShiftStats() { const { data } = await apiClient.get("/operations/shifts/stats"); return data; }
export async function getShift(id: number) { const { data } = await apiClient.get<OperationsShift>(`/operations/shifts/${id}`); return data; }
export async function createShift(payload: CreateShiftPayload) { const { data } = await apiClient.post<OperationsShift>("/operations/shifts", payload); return data; }
export async function updateShift(id: number, payload: UpdateShiftPayload) { const { data } = await apiClient.patch<OperationsShift>(`/operations/shifts/${id}`, payload); return data; }
export async function deleteShift(id: number) { await apiClient.delete(`/operations/shifts/${id}`); }
export async function restoreShift(id: number) { const { data } = await apiClient.patch<OperationsShift>(`/operations/shifts/${id}/restore`); return data; }

