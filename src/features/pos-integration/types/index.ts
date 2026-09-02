export type ConnectionMode = "file_xml" | "api" | "sftp";
export type MappingStatus = "unresolved" | "partial" | "mapped" | "blocked";
export type OutboundStatus = "pending" | "sent" | "failed";
export type InboundStatus = "pending_review" | "approved" | "rejected";

export interface PosConnection { id: string; provider: string; siteName: string; serviceId: string; externalSiteId: string; connectionMode: ConnectionMode; commanderRelease: string | null; notes: string | null; isEnabled: boolean; disabledReason: string | null; createdAt: string; updatedAt: string }
export type PosConnectionPayload = Pick<PosConnection, "siteName" | "serviceId" | "externalSiteId"> & Partial<Pick<PosConnection, "provider" | "connectionMode" | "commanderRelease" | "notes" | "isEnabled" | "disabledReason">>;
export interface PosMapping { id: string; internalEntityType: string; internalEntityId: string; externalEntityType: string; externalEntityKey: string; externalParentKey: string | null; externalDisplayName: string | null; status: MappingStatus; isRequired: boolean; createdAt: string; updatedAt: string }
export type PosMappingPayload = Omit<PosMapping, "id" | "status" | "createdAt" | "updatedAt" | "externalParentKey" | "externalDisplayName"> & { externalParentKey?: string; externalDisplayName?: string; status?: MappingStatus };
export interface PosOutboundBatch { id: string; status: OutboundStatus; itemCount: number; sentAt: string | null; errorMessage: string | null; createdAt: string; items?: Array<{ id: string; mappingId: string; payload: Record<string, unknown> }> }
export interface PosInboundBatch { id: string; status: InboundStatus; itemCount: number; reviewedBy: string | null; reviewedAt: string | null; createdAt: string }
export interface PosEvent { id: string; eventType: string; description: string | null; performedBy: string | null; createdAt: string }
