export type TimesheetStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface PayrollTimesheet {
  id: string;
  userId: string;
  employeeName: string;
  locationId: string;
  locationName: string;
  clockIn: string;
  clockOut: string | null;
  regularHours: number | null;
  overtimeHours: number | null;
  status: TimesheetStatus;
  approvedBy: string | null;
  approvedAt: string | null;
  notes: string | null;
}

export interface TimesheetNotePayload {
  notes?: string;
}
