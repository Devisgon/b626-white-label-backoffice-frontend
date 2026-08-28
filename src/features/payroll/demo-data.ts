import type {
  LeaveRequest,
  PayrollDeduction,
  PayrollProfile,
  PayrollTimesheet,
} from "./types";

export const demoPayrollProfiles: PayrollProfile[] = [
  {
    id: "pp-001",
    userId: "11111111-1111-4111-8111-111111111111",
    employeeName: "Ayesha Khan",
    payType: "SALARY",
    baseRate: 85000,
    overtimeRate: null,
    bankAccountId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    isActive: true,
    createdAt: "2026-08-01T08:00:00Z",
    updatedAt: "2026-08-25T09:00:00Z",
  },
  {
    id: "pp-002",
    userId: "22222222-2222-4222-8222-222222222222",
    employeeName: "Bilal Ahmed",
    payType: "HOURLY",
    baseRate: 650,
    overtimeRate: 975,
    bankAccountId: null,
    isActive: true,
    createdAt: "2026-08-02T08:00:00Z",
    updatedAt: "2026-08-24T09:00:00Z",
  },
  {
    id: "pp-003",
    userId: "33333333-3333-4333-8333-333333333333",
    employeeName: "Sara Ali",
    payType: "HOURLY",
    baseRate: 550,
    overtimeRate: 825,
    bankAccountId: null,
    isActive: false,
    createdAt: "2026-08-03T08:00:00Z",
    updatedAt: "2026-08-23T09:00:00Z",
  },
];

export const demoDeductions: PayrollDeduction[] = [
  {
    id: "ded-001",
    userId: demoPayrollProfiles[0].userId,
    employeeName: "Ayesha Khan",
    type: "TAX",
    amount: 7500,
    isRecurring: true,
    isActive: true,
    note: "Monthly income tax",
    createdAt: "2026-08-05T08:00:00Z",
  },
  {
    id: "ded-002",
    userId: demoPayrollProfiles[1].userId,
    employeeName: "Bilal Ahmed",
    type: "INSURANCE",
    amount: 2500,
    isRecurring: true,
    isActive: true,
    note: "Health insurance premium",
    createdAt: "2026-08-06T08:00:00Z",
  },
  {
    id: "ded-003",
    userId: demoPayrollProfiles[2].userId,
    employeeName: "Sara Ali",
    type: "LOAN",
    amount: 5000,
    isRecurring: false,
    isActive: true,
    note: "One-time loan recovery",
    createdAt: "2026-08-07T08:00:00Z",
  },
];

export const demoLeaveRequests: LeaveRequest[] = [
  {
    id: "leave-001",
    userId: demoPayrollProfiles[0].userId,
    employeeName: "Ayesha Khan",
    leaveType: "CASUAL",
    startDate: "2026-08-29",
    endDate: "2026-08-30",
    reason: "Family event",
    status: "PENDING",
    approvedBy: null,
    approvedAt: null,
    createdAt: "2026-08-25T08:00:00Z",
  },
  {
    id: "leave-002",
    userId: demoPayrollProfiles[1].userId,
    employeeName: "Bilal Ahmed",
    leaveType: "SICK",
    startDate: "2026-08-20",
    endDate: "2026-08-21",
    reason: "Medical rest",
    status: "APPROVED",
    approvedBy: "Owner Admin",
    approvedAt: "2026-08-19T11:00:00Z",
    createdAt: "2026-08-19T08:00:00Z",
  },
  {
    id: "leave-003",
    userId: demoPayrollProfiles[2].userId,
    employeeName: "Sara Ali",
    leaveType: "UNPAID",
    startDate: "2026-09-02",
    endDate: "2026-09-04",
    reason: "Personal work",
    status: "REJECTED",
    approvedBy: "Store Manager",
    approvedAt: "2026-08-24T10:00:00Z",
    createdAt: "2026-08-23T08:00:00Z",
  },
];

export const demoTimesheets: PayrollTimesheet[] = [
  {
    id: "time-001",
    userId: demoPayrollProfiles[0].userId,
    employeeName: "Ayesha Khan",
    locationId: "loc-001",
    locationName: "Phoenix Store",
    clockIn: "2026-08-27T04:00:00Z",
    clockOut: "2026-08-27T13:15:00Z",
    regularHours: 8,
    overtimeHours: 1.25,
    status: "PENDING",
    approvedBy: null,
    approvedAt: null,
    notes: null,
  },
  {
    id: "time-002",
    userId: demoPayrollProfiles[1].userId,
    employeeName: "Bilal Ahmed",
    locationId: "loc-001",
    locationName: "Phoenix Store",
    clockIn: "2026-08-26T04:15:00Z",
    clockOut: "2026-08-26T12:15:00Z",
    regularHours: 8,
    overtimeHours: 0,
    status: "APPROVED",
    approvedBy: "Owner Admin",
    approvedAt: "2026-08-26T14:00:00Z",
    notes: "Approved after shift review",
  },
  {
    id: "time-003",
    userId: demoPayrollProfiles[2].userId,
    employeeName: "Sara Ali",
    locationId: "loc-002",
    locationName: "Main Warehouse",
    clockIn: "2026-08-28T03:55:00Z",
    clockOut: null,
    regularHours: null,
    overtimeHours: null,
    status: "PENDING",
    approvedBy: null,
    approvedAt: null,
    notes: null,
  },
];

export function findPayrollProfile(id: string) {
  return demoPayrollProfiles.find(
    (item) => item.id === id || item.userId === id,
  );
}
export function findDeduction(id: string) {
  return demoDeductions.find((item) => item.id === id);
}
export function findLeaveRequest(id: string) {
  return demoLeaveRequests.find((item) => item.id === id);
}
export function findTimesheet(id: string) {
  return demoTimesheets.find((item) => item.id === id);
}
