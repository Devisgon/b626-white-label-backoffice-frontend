export type AuditJsonValue =
  | string
  | number
  | boolean
  | null
  | AuditJsonValue[]
  | {
      [key: string]: AuditJsonValue;
    };

export interface BankingAuditLog {
  id: string;
  tenantId: string;
  locationId: string;

  entityType: string;
  entityId: string;
  action: string;

  performedBy: string | null;

  beforeData: AuditJsonValue | null;
  afterData: AuditJsonValue | null;

  notes: string | null;
  createdAt: string;
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;

  entityType?: string;
  entityId?: string;
  action?: string;

  dateFrom?: string;
  dateTo?: string;
}

export interface AuditLogsResponse {
  data: BankingAuditLog[];
  total: number;
  page: number;
  limit: number;
}