import { z } from "zod";

const requiredTransactionType = z
  .union([z.literal(""), z.enum(["deposit", "payment", "adjustment"])])
  .transform((value, context) => {
    if (value === "") {
      context.addIssue({
        code: "custom",
        message: "Please select a transaction type.",
      });

      return z.NEVER;
    }

    return value;
  });

const requiredDirection = z
  .union([z.literal(""), z.enum(["inflow", "outflow"])])
  .transform((value, context) => {
    if (value === "") {
      context.addIssue({
        code: "custom",
        message: "Please select a direction.",
      });

      return z.NEVER;
    }

    return value;
  });

const requiredLineType = z
  .union([z.literal(""), z.enum(["debit", "credit"])])
  .transform((value, context) => {
    if (value === "") {
      context.addIssue({
        code: "custom",
        message: "Please select debit or credit.",
      });

      return z.NEVER;
    }

    return value;
  });

const requiredUuid = (message: string) =>
  z
    .union([z.literal(""), z.string().uuid(message)])
    .transform((value, context) => {
      if (value === "") {
        context.addIssue({
          code: "custom",
          message,
        });

        return z.NEVER;
      }

      return value;
    });

const optionalUuid = z
  .union([z.literal(""), z.string().uuid("Please select a valid payee.")])
  .optional();

const positiveAmount = z
  .string()
  .trim()
  .min(1, "Amount is required.")
  .refine((value) => Number.isFinite(Number(value)) && Number(value) >= 0.01, {
    message: "Amount must be greater than zero.",
  })
  .transform(Number);

export const transactionLineSchema = z.object({
  accountId: requiredUuid("Please select a ledger account."),

  lineType: requiredLineType,

  amount: positiveAmount,

  description: z
    .string()
    .trim()
    .max(250, "Description cannot exceed 250 characters.")
    .optional(),
});

export const transactionSchema = z
  .object({
    transactionType: requiredTransactionType,

    direction: requiredDirection,

    transactionDate: z.string().min(1, "Transaction date is required."),

    bankAccountId: requiredUuid("Please select a bank account."),

    payeeId: optionalUuid,

    referenceNumber: z
      .string()
      .trim()
      .max(80, "Reference number cannot exceed 80 characters.")
      .optional(),

    memo: z
      .string()
      .trim()
      .max(500, "Memo cannot exceed 500 characters.")
      .optional(),

    amount: positiveAmount,

    lines: z
      .array(transactionLineSchema)
      .min(1, "At least one ledger line is required."),
  })
  .superRefine((values, context) => {
    const totalDebits = values.lines
      .filter((line) => line.lineType === "debit")
      .reduce((total, line) => total + line.amount, 0);

    const totalCredits = values.lines
      .filter((line) => line.lineType === "credit")
      .reduce((total, line) => total + line.amount, 0);

    if (Math.abs(totalDebits - totalCredits) > 0.001) {
      context.addIssue({
        code: "custom",
        path: ["lines"],
        message:
          "Ledger lines must be balanced. Total debits must equal total credits.",
      });
    }
  });

export const voidTransactionSchema = z.object({
  voidReason: z
    .string()
    .trim()
    .min(3, "Please enter a reason for voiding this transaction.")
    .max(500, "Void reason cannot exceed 500 characters."),
});

export type TransactionFormInput = z.input<typeof transactionSchema>;

export type TransactionFormValues = z.output<typeof transactionSchema>;

export type VoidTransactionFormValues = z.infer<typeof voidTransactionSchema>;
