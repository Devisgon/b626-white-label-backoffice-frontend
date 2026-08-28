import type {
  CreateLotteryPackPayload,
  LotteryPack,
  LotteryPackFilters,
  LotteryPackStats,
  UpdateLotteryPackPayload,
} from "@/features/lottery/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function createLotteryPackQuery(filters?: LotteryPackFilters) {
  const parameters = new URLSearchParams();

  if (filters?.search) {
    parameters.set("search", filters.search);
  }

  if (filters?.game_id) {
    parameters.set("game_id", String(filters.game_id));
  }

  if (filters?.status && filters.status !== "all") {
    parameters.set("status", filters.status);
  }

  if (filters?.page) {
    parameters.set("page", String(filters.page));
  }

  if (filters?.limit) {
    parameters.set("limit", String(filters.limit));
  }

  const query = parameters.toString();

  return query ? `?${query}` : "";
}

export async function getLotteryPacks(
  filters?: LotteryPackFilters,
): Promise<LotteryPack[]> {
  const response = await fetch(
    `${API_URL}/lottery/packs${createLotteryPackQuery(filters)}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Unable to load lottery packs.");
  }

  return response.json();
}

export async function getLotteryPack(id: number): Promise<LotteryPack> {
  const response = await fetch(`${API_URL}/lottery/packs/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load the lottery pack.");
  }

  return response.json();
}

export async function getLotteryPackStats(): Promise<LotteryPackStats> {
  const response = await fetch(`${API_URL}/lottery/packs/stats`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load lottery pack statistics.");
  }

  return response.json();
}

export async function createLotteryPack(
  payload: CreateLotteryPackPayload,
): Promise<LotteryPack> {
  const response = await fetch(`${API_URL}/lottery/packs`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to create the lottery pack.");
  }

  return response.json();
}

export async function updateLotteryPack(
  id: number,
  payload: UpdateLotteryPackPayload,
): Promise<LotteryPack> {
  const response = await fetch(`${API_URL}/lottery/packs/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to update the lottery pack.");
  }

  return response.json();
}

export async function deleteLotteryPack(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/lottery/packs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete the lottery pack.");
  }
}

export async function restoreLotteryPack(id: number): Promise<LotteryPack> {
  const response = await fetch(`${API_URL}/lottery/packs/${id}/restore`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Unable to restore the lottery pack.");
  }

  return response.json();
}
