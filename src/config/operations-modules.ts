import { ClipboardCheck, Receipt, Settings2, Timer, type LucideIcon } from "lucide-react";
import { USER_ROLES, type UserRole } from "@/types/role";
export interface OperationsModule { title: string; description: string; href: string; icon: LucideIcon; color: "green" | "blue" | "orange" | "purple"; allowedRoles: UserRole[]; }
const roles = [USER_ROLES.OWNER_ADMIN, USER_ROLES.STORE_MANAGER, USER_ROLES.INVENTORY_USER, USER_ROLES.FINANCE_USER];
export const operationsModules: OperationsModule[] = [{ title: "Checklists", description: "Opening, closing and routine tasks", href: "/operations/checklists", icon: ClipboardCheck, color: "green", allowedRoles: roles }, { title: "Expenses", description: "Operating costs and payment records", href: "/operations/expenses", icon: Receipt, color: "orange", allowedRoles: roles }, { title: "Maintenance Logs", description: "Equipment issues and repair progress", href: "/operations/maintenance-logs", icon: Settings2, color: "purple", allowedRoles: roles }, { title: "Shifts", description: "Staff shifts, floats and closing cash", href: "/operations/shifts", icon: Timer, color: "blue", allowedRoles: roles }];

