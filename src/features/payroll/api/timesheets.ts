import { apiClient } from "@/lib/api";
import type { PayrollTimesheet, TimesheetNotePayload } from "../types";

export async function clockIn() {
  const { data } = await apiClient.post<PayrollTimesheet>(
    "/payroll/timesheets/clock-in",
  );
  return data;
}
export async function clockOut(id: string, payload: TimesheetNotePayload = {}) {
  const { data } = await apiClient.patch<PayrollTimesheet>(
    `/payroll/timesheets/${id}/clock-out`,
    payload,
  );
  return data;
}
export async function getMyTimesheets(params?: Record<string, unknown>) {
  const { data } = await apiClient.get<PayrollTimesheet[]>(
    "/payroll/timesheets/mine",
    { params },
  );
  return data;
}
export async function getTimesheets(params?: Record<string, unknown>) {
  const { data } = await apiClient.get<PayrollTimesheet[]>(
    "/payroll/timesheets",
    { params },
  );
  return data;
}
export async function approveTimesheet(
  id: string,
  payload: TimesheetNotePayload = {},
) {
  const { data } = await apiClient.patch<PayrollTimesheet>(
    `/payroll/timesheets/${id}/approve`,
    payload,
  );
  return data;
}
export async function rejectTimesheet(
  id: string,
  payload: TimesheetNotePayload = {},
) {
  const { data } = await apiClient.patch<PayrollTimesheet>(
    `/payroll/timesheets/${id}/reject`,
    payload,
  );
  return data;
}
