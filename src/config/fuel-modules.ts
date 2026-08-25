import {
  BadgeDollarSign,
  Database,
  Fuel,
  ReceiptText,
  Truck,
  type LucideIcon,
} from "lucide-react";

import {
  USER_ROLES,
  type UserRole,
} from "@/types/role";

export type FuelModuleColor =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red";

export interface FuelModule {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: FuelModuleColor;
  allowedRoles: UserRole[];
}

const FUEL_ROLES: UserRole[] = [
  USER_ROLES.OWNER_ADMIN,
  USER_ROLES.STORE_MANAGER,
  USER_ROLES.INVENTORY_USER,
  USER_ROLES.FINANCE_USER,
];

export const fuelModules: FuelModule[] = [
  {
    title: "Fuel Tanks",
    description:
      "Manage fuel tanks, capacity and current stock",
    href: "/fuel/tanks",
    icon: Database,
    color: "green",
    allowedRoles: FUEL_ROLES,
  },
  {
    title: "Fuel Pumps",
    description:
      "Manage pumps and their connected fuel tanks",
    href: "/fuel/pumps",
    icon: Fuel,
    color: "blue",
    allowedRoles: FUEL_ROLES,
  },
  {
    title: "Fuel Prices",
    description:
      "Manage fuel prices and effective dates",
    href: "/fuel/prices",
    icon: BadgeDollarSign,
    color: "purple",
    allowedRoles: FUEL_ROLES,
  },
  {
    title: "Fuel Deliveries",
    description:
      "Record supplier deliveries and received stock",
    href: "/fuel/deliveries",
    icon: Truck,
    color: "orange",
    allowedRoles: FUEL_ROLES,
  },
  {
    title: "Fuel Sales",
    description:
      "Manage pump readings and fuel sales",
    href: "/fuel/sales",
    icon: ReceiptText,
    color: "red",
    allowedRoles: FUEL_ROLES,
  },
];