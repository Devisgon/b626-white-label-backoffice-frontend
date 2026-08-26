import type {
  CreateLotteryGamePayload,
  LotteryGame,
  LotteryGameFilters,
  LotteryGameStats,
  UpdateLotteryGamePayload,
} from "@/features/lottery/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000";

function createQueryString(
  filters?: LotteryGameFilters,
) {
  const parameters = new URLSearchParams();

  if (filters?.search) {
    parameters.set(
      "search",
      filters.search,
    );
  }

  if (
    filters?.status &&
    filters.status !== "all"
  ) {
    parameters.set(
      "status",
      filters.status,
    );
  }

  if (filters?.page) {
    parameters.set(
      "page",
      String(filters.page),
    );
  }

  if (filters?.limit) {
    parameters.set(
      "limit",
      String(filters.limit),
    );
  }

  const query = parameters.toString();

  return query ? `?${query}` : "";
}

export async function getLotteryGames(
  filters?: LotteryGameFilters,
): Promise<LotteryGame[]> {
  const response = await fetch(
    `${API_URL}/lottery/games${createQueryString(
      filters,
    )}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load lottery games.",
    );
  }

  return response.json();
}

export async function getLotteryGame(
  id: number,
): Promise<LotteryGame> {
  const response = await fetch(
    `${API_URL}/lottery/games/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load the lottery game.",
    );
  }

  return response.json();
}

export async function getLotteryGameStats(): Promise<LotteryGameStats> {
  const response = await fetch(
    `${API_URL}/lottery/games/stats`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load lottery game statistics.",
    );
  }

  return response.json();
}

export async function createLotteryGame(
  payload: CreateLotteryGamePayload,
): Promise<LotteryGame> {
  const response = await fetch(
    `${API_URL}/lottery/games`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(
      "Unable to create the lottery game.",
    );
  }

  return response.json();
}

export async function updateLotteryGame(
  id: number,
  payload: UpdateLotteryGamePayload,
): Promise<LotteryGame> {
  const response = await fetch(
    `${API_URL}/lottery/games/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(
      "Unable to update the lottery game.",
    );
  }

  return response.json();
}

export async function deleteLotteryGame(
  id: number,
): Promise<void> {
  const response = await fetch(
    `${API_URL}/lottery/games/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error(
      "Unable to delete the lottery game.",
    );
  }
}

export async function restoreLotteryGame(
  id: number,
): Promise<LotteryGame> {
  const response = await fetch(
    `${API_URL}/lottery/games/${id}/restore`,
    {
      method: "PATCH",
    },
  );

  if (!response.ok) {
    throw new Error(
      "Unable to restore the lottery game.",
    );
  }

  return response.json();
}