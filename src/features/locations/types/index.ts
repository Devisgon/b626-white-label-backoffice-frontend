export interface AccessibleLocation {
  id: string;
  tenantId: string;
  name: string;
  address: string | null;
}

export interface SetActiveLocationPayload {
  locationId: string;
}

export interface SetActiveLocationResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}
