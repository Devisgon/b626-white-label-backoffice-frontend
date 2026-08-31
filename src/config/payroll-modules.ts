import {
  BadgeDollarSign,
  CalendarOff,
  Clock3,
  FileText,
  PlayCircle,
  BarChart3,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import type { ModuleColor } from "./dashboard-modules";

export interface PayrollModuleCard {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: ModuleColor;
}

export const payrollModules: PayrollModuleCard[] = [
  {
    title: "Payroll Profiles",
    description: "Employee pay types, rates and direct-deposit accounts",
    href: "/payroll/profiles",
    icon: BadgeDollarSign,
    color: "green",
  },
  {
    title: "Deductions",
    description: "Recurring and one-time employee deductions",
    href: "/payroll/deductions",
    icon: ReceiptText,
    color: "orange",
  },
  {
    title: "Leave Requests",
    description: "Submit, review, approve and reject staff leave",
    href: "/payroll/leave-requests",
    icon: CalendarOff,
    color: "purple",
  },
  {
    title: "Timesheets",
    description: "Clock in, clock out and approve worked hours",
    href: "/payroll/timesheets",
    icon: Clock3,
    color: "blue",
  },
  {
    title: "Pay Runs",
    description: "Create, calculate and complete payroll periods",
    href: "/payroll/pay-runs",
    icon: PlayCircle,
    color: "orange",
  },
  {
    title: "Payslips",
    description: "Employee gross pay, deductions and net pay statements",
    href: "/payroll/payslips",
    icon: FileText,
    color: "purple",
  },
  {
    title: "Reports",
    description: "Payroll summaries and location-wise cost reporting",
    href: "/payroll/reports",
    icon: BarChart3,
    color: "cyan",
  },
];
