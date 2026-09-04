import { apiClient } from "@/lib/api";

import type {
  AccessibleLocation,
  SetActiveLocationPayload,
  SetActiveLocationResponse,
} from "../types";

const AUTH_ENDPOINT = "/api/auth";

export async function getAccessibleLocations() {
  const { data } = await apiClient.get<AccessibleLocation[]>(
    `${AUTH_ENDPOINT}/locations`,
  );

  return data;
}

export async function getAccessibleLocation(id: string) {
  const locations = await getAccessibleLocations();

  return locations.find((location) => location.id === id) ?? null;
}

export async function switchActiveLocation(
  payload: SetActiveLocationPayload,
) {
  const { data } = await apiClient.post<SetActiveLocationResponse>(
    `${AUTH_ENDPOINT}/active-location`,
    payload,
  );

  return data;
}
