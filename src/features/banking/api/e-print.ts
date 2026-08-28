import { apiClient } from "@/lib/api";
import type {
  EligibleCheck,
  PrintBatch,
  PrintChecksPayload,
} from "../types/e-print";
export async function getEligibleChecks(onlyPayroll = false) {
  const { data } = await apiClient.get<EligibleCheck[]>(
    "/bank/e-print/checks",
    { params: { onlyPayroll } },
  );
  return data;
}
export async function printChecks(payload: PrintChecksPayload) {
  const { data } = await apiClient.post("/bank/e-print/checks/print", payload);
  return data;
}
export async function getPrintHistory() {
  const { data } = await apiClient.get<PrintBatch[]>(
    "/bank/e-print/print-history",
  );
  return data;
}
export async function getPrintBatch(id: string) {
  const { data } = await apiClient.get<PrintBatch>(
    `/bank/e-print/print-history/${id}`,
  );
  return data;
}
