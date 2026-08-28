import {
  BadgeDollarSign,
  Boxes,
  CircleDollarSign,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

import { USER_ROLES, type UserRole } from "@/types/role";

export type LotteryModuleColor = "green" | "blue" | "purple" | "orange";

export interface LotteryModule {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: LotteryModuleColor;
  allowedRoles: UserRole[];
}

const LOTTERY_ROLES: UserRole[] = [
  USER_ROLES.OWNER_ADMIN,
  USER_ROLES.STORE_MANAGER,
];

export const lotteryModules: LotteryModule[] = [
  {
    title: "Lottery Games",
    description: "Manage lottery games, ticket prices and pack sizes",
    href: "/lottery/games",
    icon: Gamepad2,
    color: "purple",
    allowedRoles: LOTTERY_ROLES,
  },
  {
    title: "Lottery Packs",
    description: "Manage ticket packs, number ranges and activation",
    href: "/lottery/packs",
    icon: Boxes,
    color: "blue",
    allowedRoles: LOTTERY_ROLES,
  },
  {
    title: "Lottery Sales",
    description: "Track sold tickets, payouts and sale amounts",
    href: "/lottery/sales",
    icon: BadgeDollarSign,
    color: "green",
    allowedRoles: LOTTERY_ROLES,
  },
  {
    title: "Lottery Settlements",
    description: "Manage daily lottery sales and payout settlements",
    href: "/lottery/settlements",
    icon: CircleDollarSign,
    color: "orange",
    allowedRoles: LOTTERY_ROLES,
  },
];
