import { apiClient } from "@/lib/api";
import type { CreateChecklistPayload, UpdateChecklistPayload, OperationsChecklist } from "../types";
export async function getChecklists(params?: Record<string, unknown>) { const { data } = await apiClient.get("/operations/checklists", { params }); return data; }
export async function getChecklistStats() { const { data } = await apiClient.get("/operations/checklists/stats"); return data; }
export async function getChecklist(id: number) { const { data } = await apiClient.get<OperationsChecklist>(`/operations/checklists/${id}`); return data; }
export async function createChecklist(payload: CreateChecklistPayload) { const { data } = await apiClient.post<OperationsChecklist>("/operations/checklists", payload); return data; }
export async function updateChecklist(id: number, payload: UpdateChecklistPayload) { const { data } = await apiClient.patch<OperationsChecklist>(`/operations/checklists/${id}`, payload); return data; }
export async function deleteChecklist(id: number) { await apiClient.delete(`/operations/checklists/${id}`); }
export async function restoreChecklist(id: number) { const { data } = await apiClient.patch<OperationsChecklist>(`/operations/checklists/${id}/restore`); return data; }

