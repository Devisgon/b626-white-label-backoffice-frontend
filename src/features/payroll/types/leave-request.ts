export type LeaveType = "SICK" | "CASUAL" | "PAID" | "UNPAID";
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface LeaveRequest {
  id: string;
  userId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string | null;
  status: LeaveStatus;
  approvedBy: string | null;
  approvedAt: string | null;
  createdAt: string;
}

export interface CreateLeaveRequestPayload {
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason?: string;
}

export interface LeaveDecisionPayload {
  notes?: string;
}
