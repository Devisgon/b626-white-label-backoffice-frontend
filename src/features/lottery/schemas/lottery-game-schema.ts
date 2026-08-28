import { z } from "zod";

export const lotteryGameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Game name must contain at least 2 characters.")
    .max(100, "Game name cannot exceed 100 characters."),

  game_number: z
    .string()
    .trim()
    .max(50, "Game number cannot exceed 50 characters."),

  ticket_price: z
    .string()
    .trim()
    .min(1, "Ticket price is required.")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
      message: "Ticket price must be zero or greater.",
    }),

  tickets_per_pack: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" || (Number.isInteger(Number(value)) && Number(value) >= 1),
      {
        message: "Tickets per pack must be a whole number greater than zero.",
      },
    ),

  status: z.enum(["", "Active", "Inactive"]).refine((value) => value !== "", {
    message: "Please select a status.",
  }),
});

export type LotteryGameFormValues = z.infer<typeof lotteryGameSchema>;
