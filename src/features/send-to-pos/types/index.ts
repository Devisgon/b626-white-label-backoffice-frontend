export type SendToPosReadinessStatus = "ready" | "blocked";

export type SendToPosBatchStatus = "pending" | "sent" | "failed";

export interface SendToPosSourceGroup {
  group: string;
  candidates: number;
  eligible: number;
  blocked: number;
}

export interface SendToPosPreview {
  connectionId: string;
  outboundReadiness: SendToPosReadinessStatus;
  eligibleSourceRows: number;
  blockedSourceRows: number;
  requiredMappingBlockers: number;
  connectionMode: string;
  commanderRelease: string | null;
  lastOutboundSync: string | null;
  sourceGroups: SendToPosSourceGroup[];
}

export interface SendToPosMappingOption {
  id: string;
  internalEntityType: string;
  internalEntityId: string;
  externalEntityKey: string;
  externalDisplayName: string | null;
}

export interface SendToPosBatchItem {
  id: string;
  mappingId: string;
  payload: {
    internalEntityType?: string;
    internalEntityId?: string;
    externalEntityKey?: string;
    externalDisplayName?: string | null;
  };
}

export interface SendToPosBatch {
  id: string;
  status: SendToPosBatchStatus;
  itemCount: number;
  sentAt: string | null;
  errorMessage: string | null;
  createdAt: string;
  items?: SendToPosBatchItem[];
}

export interface SendToPosPayload {
  mappingIds?: string[];
}
