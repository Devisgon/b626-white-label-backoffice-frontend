import {
  ArrowLeftRight,
  BookOpenCheck,
  Building2,
  ClipboardCheck,
  FileClock,
  ReceiptText,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import {
  USER_ROLES,
  type UserRole,
} from "@/types/role";

export type BankModuleColor =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red"
  | "cyan"
  | "slate";

export interface BankModule {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: BankModuleColor;
  allowedRoles: UserRole[];
}

const BANK_ROLES: UserRole[] = [
  USER_ROLES.OWNER_ADMIN,
  USER_ROLES.FINANCE_USER,
];

export const bankModules: BankModule[] = [
  {
    title: "Bank Accounts",
    description:
      "Manage company bank accounts and balances",
    href: "/bank/accounts",
    icon: Building2,
    color: "green",
    allowedRoles: BANK_ROLES,
  },
  {
    title: "Chart of Accounts",
    description:
      "Manage financial account categories and codes",
    href: "/bank/chart-of-accounts",
    icon: BookOpenCheck,
    color: "blue",
    allowedRoles: BANK_ROLES,
  },
  {
    title: "Payees",
    description:
      "Manage suppliers and payment recipients",
    href: "/bank/payees",
    icon: UsersRound,
    color: "purple",
    allowedRoles: BANK_ROLES,
  },
  {
    title: "Transactions",
    description:
      "View and manage bank transactions",
    href: "/bank/transactions",
    icon: ReceiptText,
    color: "orange",
    allowedRoles: BANK_ROLES,
  },
  {
    title: "Transfers",
    description:
      "Transfer funds between bank accounts",
    href: "/bank/transfers",
    icon: ArrowLeftRight,
    color: "cyan",
    allowedRoles: BANK_ROLES,
  },
  {
    title: "Reconciliation",
    description:
      "Match bank records and verify balances",
    href: "/bank/reconciliations",
    icon: ClipboardCheck,
    color: "red",
    allowedRoles: BANK_ROLES,
  },
  {
    title: "Audit",
    description:
      "Review financial activity and audit history",
    href: "/bank/audit",
    icon: FileClock,
    color: "slate",
    allowedRoles: BANK_ROLES,
  },
];