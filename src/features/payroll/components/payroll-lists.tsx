"use client";

import { useState } from "react";
import { Clock3 } from "lucide-react";

import {
  demoDeductions,
  demoLeaveRequests,
  demoPayrollProfiles,
  demoTimesheets,
} from "../demo-data";

import { PayrollTable, StatusPill } from "./payroll-table";

const money = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

const date = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));

const dateTime = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));

export function PayrollProfilesList() {
  return (
    <PayrollTable
      title="Payroll profiles"
      description="Employee pay rates and payment settings."
      route="/payroll/profiles"
      singular="profile"
      records={demoPayrollProfiles}
      searchText={(item) => `${item.employeeName} ${item.payType}`}
      actionMode="activate"
      columns={[
        {
          key: "employee",
          label: "Employee",
          render: (item) => (
            <span className="font-semibold">{item.employeeName}</span>
          ),
        },
        {
          key: "type",
          label: "Pay type",
          render: (item) => item.payType,
        },
        {
          key: "rate",
          label: "Base rate",
          render: (item) => money(item.baseRate),
        },
        {
          key: "overtime",
          label: "Overtime rate",
          render: (item) =>
            item.overtimeRate ? money(item.overtimeRate) : "—",
        },
        {
          key: "status",
          label: "Status",
          render: (item) => (
            <StatusPill value={item.isActive ? "ACTIVE" : "INACTIVE"} />
          ),
        },
      ]}
    />
  );
}

export function DeductionsList() {
  return (
    <PayrollTable
      title="Deductions"
      description="Recurring and one-time employee deductions."
      route="/payroll/deductions"
      singular="deduction"
      records={demoDeductions}
      searchText={(item) => `${item.employeeName} ${item.type} ${item.note}`}
      actionMode="delete"
      columns={[
        {
          key: "employee",
          label: "Employee",
          render: (item) => (
            <span className="font-semibold">{item.employeeName}</span>
          ),
        },
        {
          key: "type",
          label: "Type",
          render: (item) => item.type,
        },
        {
          key: "amount",
          label: "Amount",
          render: (item) => money(item.amount),
        },
        {
          key: "recurring",
          label: "Frequency",
          render: (item) => (item.isRecurring ? "Recurring" : "One-time"),
        },
        {
          key: "status",
          label: "Status",
          render: (item) => (
            <StatusPill value={item.isActive ? "ACTIVE" : "INACTIVE"} />
          ),
        },
      ]}
    />
  );
}

export function LeaveRequestsList() {
  return (
    <PayrollTable
      title="Leave requests"
      description="Employee leave submissions and manager decisions."
      route="/payroll/leave-requests"
      singular="request"
      records={demoLeaveRequests}
      searchText={(item) =>
        `${item.employeeName} ${item.leaveType} ${item.status}`
      }
      allowEdit={false}
      actionMode="decision"
      columns={[
        {
          key: "employee",
          label: "Employee",
          render: (item) => (
            <span className="font-semibold">{item.employeeName}</span>
          ),
        },
        {
          key: "type",
          label: "Leave type",
          render: (item) => item.leaveType,
        },
        {
          key: "start",
          label: "Start",
          render: (item) => date(item.startDate),
        },
        {
          key: "end",
          label: "End",
          render: (item) => date(item.endDate),
        },
        {
          key: "status",
          label: "Status",
          render: (item) => <StatusPill value={item.status} />,
        },
      ]}
    />
  );
}

export function TimesheetsList() {
  const [clockedIn, setClockedIn] = useState(false);

  function handleClockAction() {
    setClockedIn((current) => !current);
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={handleClockAction}
          className={`
            inline-flex h-11 items-center
            gap-2 rounded-xl px-5
            text-sm font-semibold
            text-white transition
            ${
              clockedIn
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary hover:bg-primary-hover"
            }
          `}
        >
          <Clock3 className="size-4" />

          {clockedIn ? "Clock Out" : "Clock In"}
        </button>
      </div>

      <PayrollTable
        title="Timesheets"
        description="Worked hours, clock activity and approval status."
        route="/payroll/timesheets"
        singular="timesheet"
        records={demoTimesheets}
        searchText={(item) =>
          `${item.employeeName} ${item.locationName} ${item.status}`
        }
        allowCreate={false}
        allowEdit={false}
        actionMode="timesheet"
        columns={[
          {
            key: "employee",
            label: "Employee",
            render: (item) => (
              <span className="font-semibold">{item.employeeName}</span>
            ),
          },
          {
            key: "location",
            label: "Location",
            render: (item) => item.locationName,
          },
          {
            key: "clockIn",
            label: "Clock in",
            render: (item) => dateTime(item.clockIn),
          },
          {
            key: "hours",
            label: "Hours",
            render: (item) =>
              item.regularHours === null
                ? "In progress"
                : `${item.regularHours}h + ${item.overtimeHours ?? 0} OT`,
          },
          {
            key: "status",
            label: "Status",
            render: (item) => <StatusPill value={item.status} />,
          },
        ]}
      />
    </div>
  );
}
