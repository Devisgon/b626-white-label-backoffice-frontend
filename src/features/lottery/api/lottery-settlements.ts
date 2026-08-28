import { apiClient } from "@/lib/api";
import type {
  CreateLotterySettlementPayload,
  LotterySettlement,
  UpdateLotterySettlementPayload,
} from "../types";
export async function getLotterySettlements(params?: Record<string, unknown>) {
  const { data } = await apiClient.get("/lottery/settlements", { params });
  return data;
}
export async function getLotterySettlementStats() {
  const { data } = await apiClient.get("/lottery/settlements/stats");
  return data;
}
export async function getLotterySettlement(id: number) {
  const { data } = await apiClient.get<LotterySettlement>(
    `/lottery/settlements/${id}`,
  );
  return data;
}
export async function createLotterySettlement(
  payload: CreateLotterySettlementPayload,
) {
  const { data } = await apiClient.post<LotterySettlement>(
    "/lottery/settlements",
    payload,
  );
  return data;
}
export async function updateLotterySettlement(
  id: number,
  payload: UpdateLotterySettlementPayload,
) {
  const { data } = await apiClient.patch<LotterySettlement>(
    `/lottery/settlements/${id}`,
    payload,
  );
  return data;
}
export async function deleteLotterySettlement(id: number) {
  await apiClient.delete(`/lottery/settlements/${id}`);
}
export async function restoreLotterySettlement(id: number) {
  const { data } = await apiClient.patch<LotterySettlement>(
    `/lottery/settlements/${id}/restore`,
  );
  return data;
}
