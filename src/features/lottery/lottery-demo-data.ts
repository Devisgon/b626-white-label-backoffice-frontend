import type {
  LotteryGame,
} from "@/features/lottery/types";

export const demoLotteryGames: LotteryGame[] = [
  {
    id: 1,
    name: "Lucky 7 Scratch",
    game_number: "LG-1007",
    ticket_price: 5,
    tickets_per_pack: 100,
    status: "Active",
    created_at:
      "2026-08-25T09:00:00.000Z",
    updated_at:
      "2026-08-25T09:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 2,
    name: "Golden Cash",
    game_number: "GC-2045",
    ticket_price: 10,
    tickets_per_pack: 50,
    status: "Active",
    created_at:
      "2026-08-24T10:00:00.000Z",
    updated_at:
      "2026-08-24T10:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 3,
    name: "Mega Winner",
    game_number: "MW-3012",
    ticket_price: 20,
    tickets_per_pack: 40,
    status: "Inactive",
    created_at:
      "2026-08-23T11:00:00.000Z",
    updated_at:
      "2026-08-23T11:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 4,
    name: "Quick Fortune",
    game_number: "QF-4020",
    ticket_price: 5,
    tickets_per_pack: 100,
    status: "Active",
    created_at:
      "2026-08-22T12:00:00.000Z",
    updated_at:
      "2026-08-22T12:00:00.000Z",
    deleted_at: null,
  },
];

export function findDemoLotteryGame(
  id: number,
) {
  return demoLotteryGames.find(
    (game) => game.id === id,
  );
}