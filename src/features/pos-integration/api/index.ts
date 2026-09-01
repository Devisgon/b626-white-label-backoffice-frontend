import { apiClient } from "@/lib/api";
import type {
  InboundStatus,
  MappingStatus,
  PosConnection,
  PosConnectionPayload,
  PosEvent,
  PosInboundBatch,
  PosMapping,
  PosMappingPayload,
  PosOutboundBatch,
  OutboundStatus,
} from "../types";

export const getPosWorkspaceSummary = () =>
  apiClient.get("/pos-integration/connection/summary");
export async function getPosConnection() {
  const { data } = await apiClient.get<PosConnection>(
    "/pos-integration/connection",
  );
  return data;
}
export async function createPosConnection(payload: PosConnectionPayload) {
  const { data } = await apiClient.post<PosConnection>(
    "/pos-integration/connection",
    payload,
  );
  return data;
}
export async function updatePosConnection(
  payload: Partial<PosConnectionPayload>,
) {
  const { data } = await apiClient.patch<PosConnection>(
    "/pos-integration/connection",
    payload,
  );
  return data;
}
export async function getPosMappings(params?: {
  status?: MappingStatus;
  internalEntityType?: string;
}) {
  const { data } = await apiClient.get<PosMapping[]>(
    "/pos-integration/mappings",
    { params },
  );
  return data;
}
export const getPosMappingOverview = () =>
  apiClient.get("/pos-integration/mappings/overview");
export async function getPosMapping(id: string) {
  const { data } = await apiClient.get<PosMapping>(
    `/pos-integration/mappings/${id}`,
  );
  return data;
}
export async function createPosMapping(payload: PosMappingPayload) {
  const { data } = await apiClient.post<PosMapping>(
    "/pos-integration/mappings",
    payload,
  );
  return data;
}
export async function updatePosMapping(
  id: string,
  payload: Partial<PosMappingPayload>,
) {
  const { data } = await apiClient.patch<PosMapping>(
    `/pos-integration/mappings/${id}`,
    payload,
  );
  return data;
}
export const deletePosMapping = (id: string) =>
  apiClient.delete(`/pos-integration/mappings/${id}`);
export const getOutboundReadiness = () =>
  apiClient.get("/pos-integration/outbound/readiness");
export async function getOutboundBatches(status?: OutboundStatus) {
  const { data } = await apiClient.get<PosOutboundBatch[]>(
    "/pos-integration/outbound/batches",
    { params: { status } },
  );
  return data;
}
export async function getOutboundBatch(id: string) {
  const { data } = await apiClient.get<PosOutboundBatch>(
    `/pos-integration/outbound/batches/${id}`,
  );
  return data;
}
export const createOutboundBatch = (mappingIds?: string[]) =>
  apiClient.post("/pos-integration/outbound/batches", { mappingIds });
export const sendOutboundBatch = (id: string) =>
  apiClient.post(`/pos-integration/outbound/batches/${id}/send`);
export async function getInboundBatches(status?: InboundStatus) {
  const { data } = await apiClient.get<PosInboundBatch[]>(
    "/pos-integration/inbound/batches",
    { params: { status } },
  );
  return data;
}
export async function getInboundBatch(id: string) {
  const { data } = await apiClient.get<PosInboundBatch>(
    `/pos-integration/inbound/batches/${id}`,
  );
  return data;
}
export const createInboundBatch = (items: Record<string, unknown>[]) =>
  apiClient.post("/pos-integration/inbound/batches", { items });
export const reviewInboundBatch = (
  id: string,
  decision: "approved" | "rejected",
  reason?: string,
) =>
  apiClient.post(`/pos-integration/inbound/batches/${id}/review`, {
    decision,
    reason,
  });
export async function getPosEvents(params?: {
  eventType?: string;
  limit?: number;
  offset?: number;
}) {
  const { data } = await apiClient.get<{ data: PosEvent[]; total: number }>(
    "/pos-integration/events",
    { params },
  );
  return data;
}
export const getPosEventSummary = () =>
  apiClient.get("/pos-integration/events/summary");
