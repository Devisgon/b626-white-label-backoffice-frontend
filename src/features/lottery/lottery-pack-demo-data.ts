import type {
  LotteryPack,
} from "@/features/lottery/types";

export const demoLotteryPacks: LotteryPack[] = [
  {
    id: 1,
    game_id: 1,
    game_name: "Lucky 7 Scratch",
    pack_number: "PK-000123",
    start_ticket_no: 1,
    end_ticket_no: 100,
    activated_at:
      "2026-08-25T09:00:00.000Z",
    location_id:
      "b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d",
    status: "Active",
    created_at:
      "2026-08-25T08:30:00.000Z",
    updated_at:
      "2026-08-25T09:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 2,
    game_id: 2,
    game_name: "Golden Cash",
    pack_number: "PK-000124",
    start_ticket_no: 1,
    end_ticket_no: 50,
    activated_at: null,
    location_id:
      "b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d",
    status: "In Stock",
    created_at:
      "2026-08-24T10:00:00.000Z",
    updated_at:
      "2026-08-24T10:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 3,
    game_id: 3,
    game_name: "Mega Winner",
    pack_number: "PK-000125",
    start_ticket_no: 101,
    end_ticket_no: 140,
    activated_at:
      "2026-08-23T11:00:00.000Z",
    location_id:
      "d4f2a3b1-4321-4c5d-8e7f-1a2b3c4d5e6f",
    status: "Completed",
    created_at:
      "2026-08-23T10:00:00.000Z",
    updated_at:
      "2026-08-25T12:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 4,
    game_id: 4,
    game_name: "Quick Fortune",
    pack_number: "PK-000126",
    start_ticket_no: 1,
    end_ticket_no: 100,
    activated_at: null,
    location_id: null,
    status: "Inactive",
    created_at:
      "2026-08-22T12:00:00.000Z",
    updated_at:
      "2026-08-22T12:00:00.000Z",
    deleted_at: null,
  },
];

export function findDemoLotteryPack(
  id: number,
) {
  return demoLotteryPacks.find(
    (pack) => pack.id === id,
  );
}