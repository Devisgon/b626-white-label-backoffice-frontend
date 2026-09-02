import { apiClient } from "@/lib/api";

import type {
  SendToPosBatch,
  SendToPosBatchStatus,
  SendToPosPayload,
  SendToPosPreview,
} from "../types";

export async function getSendToPosPreview() {
  const { data } = await apiClient.get<SendToPosPreview>(
    "/send-to-pos/preview",
  );

  return data;
}

export async function sendToPosNow(payload: SendToPosPayload = {}) {
  const { data } = await apiClient.post<SendToPosBatch>(
    "/send-to-pos/send",
    payload,
  );

  return data;
}

export async function getSendToPosHistory(status?: SendToPosBatchStatus) {
  const { data } = await apiClient.get<SendToPosBatch[]>(
    "/send-to-pos/history",
    {
      params: status ? { status } : undefined,
    },
  );

  return data;
}

export async function getSendToPosBatch(id: string) {
  const { data } = await apiClient.get<SendToPosBatch>(
    `/pos-integration/outbound/batches/${id}`,
  );

  return data;
}
