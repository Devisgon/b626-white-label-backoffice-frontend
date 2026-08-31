import type { UserRole } from "@/types/role";
export type AccessModule =
  "AUTH" | "CATALOGUE" | "BANKING" | "SALES" | "PAYROLL" | "SETTINGS";
export type PermissionAction = "VIEW" | "MANAGE";
export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  locationName: string;
}
export interface Permission {
  id: string;
  module: AccessModule;
  action: PermissionAction;
  description?: string;
}
export interface SetUserPermissionPayload {
  module: AccessModule;
  action: PermissionAction;
  granted: boolean;
}
