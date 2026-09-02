import {
  Banknote,
  BadgeDollarSign,
  BookOpen,
  Fuel,
  ShoppingCart,
  Ticket,
  Workflow,
  Warehouse,
  Users,
  Settings,
  PlugZap,
  Send,
  type LucideIcon,
} from "lucide-react";

import { USER_ROLES, type UserRole } from "@/types/role";

export type ModuleColor =
  "green" | "blue" | "purple" | "orange" | "red" | "cyan" | "slate";

export interface DashboardModule {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: ModuleColor;
  allowedRoles: UserRole[];
  actionCount: number;
  comingSoon?: boolean;
}

const { OWNER_ADMIN, STORE_MANAGER, INVENTORY_USER, FINANCE_USER } = USER_ROLES;

export const dashboardModules: DashboardModule[] = [
  {
    title: "Sales",
    description: "Manage sales, receipts and refunds",
    href: "/sales",
    icon: ShoppingCart,
    color: "green",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER, INVENTORY_USER, FINANCE_USER],
    actionCount: 5,
  },
  {
    title: "Products",
    description: "Manage products and inventory",
    href: "/products",
    icon: Warehouse,
    color: "blue",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER, INVENTORY_USER],
    actionCount: 5,
  },
  {
    title: "Bank",
    description: "Manage accounts and transactions",
    href: "/bank",
    icon: Banknote,
    color: "red",
    allowedRoles: [OWNER_ADMIN, FINANCE_USER],
    actionCount: 8,
  },
  {
    title: "Catalog",
    description: "Manage categories, brands and suppliers",
    href: "/catalog",
    icon: BookOpen,
    color: "orange",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER, INVENTORY_USER],
    actionCount: 10,
  },
  {
    title: "Fuel",
    description: "Manage tanks, pumps, prices, deliveries and sales",
    href: "/fuel",
    icon: Fuel,
    color: "blue",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER, INVENTORY_USER, FINANCE_USER],
    actionCount: 5,
  },
  {
    title: "Lottery",
    description: "Manage lottery games, packs, sales and settlements",
    href: "/lottery",
    icon: Ticket,
    color: "purple",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER],
    actionCount: 4,
  },
  {
    title: "Operations",
    description: "Manage checklists, expenses, maintenance and shifts",
    href: "/operations",
    icon: Workflow,
    color: "cyan",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER, INVENTORY_USER, FINANCE_USER],
    actionCount: 4,
  },
  {
    title: "Payroll",
    description: "Manage employee pay, deductions, leave and timesheets",
    href: "/payroll",
    icon: BadgeDollarSign,
    color: "green",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER, FINANCE_USER],
    actionCount: 7,
  },
  {
    title: "Users & Access",
    description: "Manage staff roles, status and permissions",
    href: "/users",
    icon: Users,
    color: "slate",
    allowedRoles: [OWNER_ADMIN],
    actionCount: 2,
  },
  {
    title: "Settings",
    description: "Configure store, tax, payments, security and integrations",
    href: "/settings",
    icon: Settings,
    color: "slate",
    allowedRoles: [OWNER_ADMIN],
    actionCount: 8,
  },
  {
    title: "POS Integration",
    description: "Manage POS connection, mappings and data batches",
    href: "/pos-integration",
    icon: PlugZap,
    color: "cyan",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER, INVENTORY_USER],
    actionCount: 5,
  },
  {
    title: "Send to POS",
    description: "Preview, send and review POS publishing batches",
    href: "/send-to-pos",
    icon: Send,
    color: "cyan",
    allowedRoles: [OWNER_ADMIN, STORE_MANAGER, INVENTORY_USER],
    actionCount: 3,
  },
];
