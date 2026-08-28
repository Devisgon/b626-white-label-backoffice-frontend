import type { FuelSale, FuelSalePayload } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function getFuelSales(): Promise<FuelSale[]> {
  const response = await fetch(`${API_URL}/fuel/sales`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load fuel sales.");
  return response.json();
}

export async function createFuelSale(payload: FuelSalePayload) {
  const response = await fetch(`${API_URL}/fuel/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Unable to create fuel sale.");
  return response.json();
}

export async function updateFuelSale(
  id: number,
  payload: Partial<FuelSalePayload>,
) {
  const response = await fetch(`${API_URL}/fuel/sales/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Unable to update fuel sale.");
  return response.json();
}
