import { apiClient } from "@/lib/api";
import type {
  CreateLotterySalePayload,
  LotterySale,
  UpdateLotterySalePayload,
} from "../types";
export async function getLotterySales(params?: Record<string, unknown>) {
  const { data } = await apiClient.get("/lottery/sales", { params });
  return data;
}
export async function getLotterySaleStats() {
  const { data } = await apiClient.get("/lottery/sales/stats");
  return data;
}
export async function getLotterySale(id: number) {
  const { data } = await apiClient.get<LotterySale>(`/lottery/sales/${id}`);
  return data;
}
export async function createLotterySale(payload: CreateLotterySalePayload) {
  const { data } = await apiClient.post<LotterySale>("/lottery/sales", payload);
  return data;
}
export async function updateLotterySale(
  id: number,
  payload: UpdateLotterySalePayload,
) {
  const { data } = await apiClient.patch<LotterySale>(
    `/lottery/sales/${id}`,
    payload,
  );
  return data;
}
export async function deleteLotterySale(id: number) {
  await apiClient.delete(`/lottery/sales/${id}`);
}
export async function restoreLotterySale(id: number) {
  const { data } = await apiClient.patch<LotterySale>(
    `/lottery/sales/${id}/restore`,
  );
  return data;
}
