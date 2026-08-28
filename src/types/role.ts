export const USER_ROLES = {
  OWNER_ADMIN: "OWNER_ADMIN",
  STORE_MANAGER: "STORE_MANAGER",
  INVENTORY_USER: "INVENTORY_USER",
  FINANCE_USER: "FINANCE_USER",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  OWNER_ADMIN: "Owner / Admin",
  STORE_MANAGER: "Store Manager",
  INVENTORY_USER: "Inventory User",
  FINANCE_USER: "Finance User",
};
