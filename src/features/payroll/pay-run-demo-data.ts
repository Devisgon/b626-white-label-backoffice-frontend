import type { PayRun } from "./types";

export const demoPayRuns: PayRun[] = [
  {
    id: "run-001",
    locationId: "loc-001",
    locationName: "Phoenix Store",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-15",
    status: "PAID",
    runAt: "2026-08-16T08:00:00Z",
    createdAt: "2026-08-15T08:00:00Z",
    items: [
      {
        id: "item-001",
        userId: "user-001",
        employeeName: "Ayesha Khan",
        regularHours: 80,
        overtimeHours: 5,
        grossPay: 45000,
        totalDeductions: 5000,
        netPay: 40000,
      },
      {
        id: "item-002",
        userId: "user-002",
        employeeName: "Bilal Ahmed",
        regularHours: 88,
        overtimeHours: 3,
        grossPay: 62000,
        totalDeductions: 7000,
        netPay: 55000,
      },
    ],
  },
  {
    id: "run-002",
    locationId: "loc-002",
    locationName: "Main Warehouse",
    periodStart: "2026-08-16",
    periodEnd: "2026-08-31",
    status: "PROCESSED",
    runAt: "2026-08-31T08:00:00Z",
    createdAt: "2026-08-30T08:00:00Z",
    items: [
      {
        id: "item-003",
        userId: "user-003",
        employeeName: "Sara Ali",
        regularHours: 82,
        overtimeHours: 2,
        grossPay: 48000,
        totalDeductions: 3000,
        netPay: 45000,
      },
    ],
  },
];
