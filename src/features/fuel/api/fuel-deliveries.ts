import type { FuelDelivery, FuelDeliveryPayload } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function getFuelDeliveries(): Promise<FuelDelivery[]> {
  const response = await fetch(`${API_URL}/fuel/deliveries`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load fuel deliveries.");
  return response.json();
}

export async function createFuelDelivery(payload: FuelDeliveryPayload) {
  const response = await fetch(`${API_URL}/fuel/deliveries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Unable to create fuel delivery.");
  return response.json();
}

export async function updateFuelDelivery(id: number, payload: Partial<FuelDeliveryPayload>) {
  const response = await fetch(`${API_URL}/fuel/deliveries/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Unable to update fuel delivery.");
  return response.json();
}

