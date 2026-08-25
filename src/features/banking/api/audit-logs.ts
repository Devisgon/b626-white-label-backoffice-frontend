import { apiClient } from "@/lib/api";

import type {
  AuditLogFilters,
  AuditLogsResponse,
} from "@/features/banking/types";

const AUDIT_LOGS_ENDPOINT = "/audit-logs";

export async function getAuditLogs(
  filters: AuditLogFilters = {},
): Promise<AuditLogsResponse> {
  const response =
    await apiClient.get<AuditLogsResponse>(
      AUDIT_LOGS_ENDPOINT,
      {
        params: filters,
      },
    );

  return response.data;
}