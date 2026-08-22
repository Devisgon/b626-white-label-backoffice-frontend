import {
  Banknote,
  BookOpen,
  ShoppingCart,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

import { USER_ROLES, type UserRole } from "@/types/role";

export type ModuleColor =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red"
  | "cyan"
  | "slate";

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

const {
  OWNER_ADMIN,
  STORE_MANAGER,
  INVENTORY_USER,
  FINANCE_USER,
} = USER_ROLES;

export const dashboardModules: DashboardModule[] = [
  {
    title: "Sales",
    description: "Manage sales, receipts and refunds",
    href: "/sales",
    icon: ShoppingCart,
    color: "green",
    allowedRoles: [
      OWNER_ADMIN,
      STORE_MANAGER,
      INVENTORY_USER,
      FINANCE_USER,
    ],
    actionCount: 5,
  },
  {
    title: "Products",
    description: "Manage products and inventory",
    href: "/products",
    icon: Warehouse,
    color: "blue",
    allowedRoles: [
      OWNER_ADMIN,
      STORE_MANAGER,
      INVENTORY_USER,
    ],
    actionCount: 5,
  },
  {
    title: "Bank",
    description: "Manage accounts and transactions",
    href: "/bank",
    icon: Banknote,
    color: "red",
    allowedRoles: [
      OWNER_ADMIN,
      FINANCE_USER,
    ],
    actionCount: 7,
  },
  {
    title: "Catalog",
    description: "Manage categories, brands and suppliers",
    href: "/catalog",
    icon: BookOpen,
    color: "orange",
    allowedRoles: [
      OWNER_ADMIN,
      STORE_MANAGER,
      INVENTORY_USER,
    ],
    actionCount: 10,
  },
];