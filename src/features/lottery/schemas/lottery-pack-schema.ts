import { z } from "zod";

export const lotteryPackSchema = z
  .object({
    game_id: z.string().trim().min(1, "Please select a lottery game."),

    pack_number: z
      .string()
      .trim()
      .min(1, "Pack number is required.")
      .max(80, "Pack number cannot exceed 80 characters."),

    start_ticket_no: z
      .string()
      .trim()
      .min(1, "Starting ticket number is required.")
      .refine(
        (value) => Number.isInteger(Number(value)) && Number(value) >= 0,
        {
          message: "Starting ticket number must be zero or greater.",
        },
      ),

    end_ticket_no: z
      .string()
      .trim()
      .min(1, "Ending ticket number is required.")
      .refine(
        (value) => Number.isInteger(Number(value)) && Number(value) >= 0,
        {
          message: "Ending ticket number must be zero or greater.",
        },
      ),

    activated_at: z.string(),

    location_id: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || z.string().uuid().safeParse(value).success,
        {
          message: "Please select a valid location.",
        },
      ),

    status: z
      .enum(["", "In Stock", "Active", "Completed", "Inactive"])
      .refine((value) => value !== "", {
        message: "Please select a status.",
      }),
  })
  .refine(
    (values) => Number(values.end_ticket_no) >= Number(values.start_ticket_no),
    {
      path: ["end_ticket_no"],
      message:
        "Ending ticket number cannot be lower than starting ticket number.",
    },
  );

export type LotteryPackFormInput = z.input<typeof lotteryPackSchema>;

export type LotteryPackFormOutput = z.output<typeof lotteryPackSchema>;
