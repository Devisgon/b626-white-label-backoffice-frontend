import { apiClient } from "@/lib/api";
import type {
  CreateLeaveRequestPayload,
  LeaveDecisionPayload,
  LeaveRequest,
} from "../types";

export async function createLeaveRequest(payload: CreateLeaveRequestPayload) {
  const { data } = await apiClient.post<LeaveRequest>(
    "/payroll/leave-requests",
    payload,
  );
  return data;
}
export async function getMyLeaveRequests() {
  const { data } = await apiClient.get<LeaveRequest[]>(
    "/payroll/leave-requests/mine",
  );
  return data;
}
export async function getLeaveRequests(params?: Record<string, unknown>) {
  const { data } = await apiClient.get<LeaveRequest[]>(
    "/payroll/leave-requests",
    { params },
  );
  return data;
}
export async function approveLeaveRequest(
  id: string,
  payload: LeaveDecisionPayload = {},
) {
  const { data } = await apiClient.patch<LeaveRequest>(
    `/payroll/leave-requests/${id}/approve`,
    payload,
  );
  return data;
}
export async function rejectLeaveRequest(
  id: string,
  payload: LeaveDecisionPayload = {},
) {
  const { data } = await apiClient.patch<LeaveRequest>(
    `/payroll/leave-requests/${id}/reject`,
    payload,
  );
  return data;
}
