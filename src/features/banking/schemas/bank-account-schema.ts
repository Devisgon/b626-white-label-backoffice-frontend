import { z } from "zod";

export const bankAccountSchema = z.object({
  accountName: z
    .string()
    .trim()
    .min(2, "Account name must contain at least 2 characters.")
    .max(100, "Account name cannot exceed 100 characters."),

  institution: z
    .string()
    .trim()
    .min(2, "Institution name must contain at least 2 characters.")
    .max(100, "Institution name cannot exceed 100 characters."),

  accountType: z.enum(["checking", "savings", "cash", "credit"], {
    message: "Please select an account type.",
  }),

  lastFour: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Enter exactly 4 numeric digits."),

  openingBalance: z.coerce
    .number()
    .min(0, "Opening balance cannot be negative."),

  openingDate: z
    .string()
    .min(1, "Opening date is required.")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Please enter a valid opening date.",
    }),

  status: z.enum(["active", "inactive", "closed"]),
});

export type BankAccountFormValues = z.infer<typeof bankAccountSchema>;
