import { apiClient } from "@/lib/api";
import type { UserRole } from "@/types/role";
import type {
  AccessModule,
  Permission,
  PermissionAction,
  SetUserPermissionPayload,
} from "../types";

export const activateUser = (id: string) =>
  apiClient.patch(`/users/${id}/activate`);
export const deactivateUser = (id: string) =>
  apiClient.patch(`/users/${id}/deactivate`);
export const assignUserRole = (id: string, role: UserRole) =>
  apiClient.patch(`/users/${id}/role`, { role });
export async function getPermissions() {
  const { data } = await apiClient.get<Permission[]>("/permissions");
  return data;
}
export async function getRolePermissions(role: UserRole) {
  const { data } = await apiClient.get<Permission[]>(
    `/permissions/roles/${role}`,
  );
  return data;
}
export async function getUserPermissions(userId: string) {
  const { data } = await apiClient.get(`/permissions/users/${userId}`);
  return data;
}
export const setUserPermission = (
  userId: string,
  payload: SetUserPermissionPayload,
) => apiClient.patch(`/permissions/users/${userId}`, payload);
export const clearUserPermissionOverride = (
  userId: string,
  module: AccessModule,
  action: PermissionAction,
) =>
  apiClient.delete(`/permissions/users/${userId}/override`, {
    params: { module, action },
  });
export const getLocationModules = (locationId: string) =>
  apiClient.get(`/permissions/locations/${locationId}/modules`);
export const setLocationModule = (
  locationId: string,
  module: AccessModule,
  enabled: boolean,
) =>
  apiClient.patch(`/permissions/locations/${locationId}/modules`, {
    module,
    enabled,
  });
