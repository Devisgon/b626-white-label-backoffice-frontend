import { z } from "zod";

const requiredUuidField = (message: string) =>
  z.string().trim().min(1, message).uuid("Please select a valid account.");

export const transferSchema = z
  .object({
    sourceAccountId: requiredUuidField("Please select a source bank account."),

    destinationAccountId: requiredUuidField(
      "Please select a destination bank account.",
    ),

    amount: z
      .string()
      .trim()
      .min(1, "Transfer amount is required.")
      .refine((value) => Number.isFinite(Number(value)) && Number(value) > 0, {
        message: "Transfer amount must be greater than zero.",
      })
      .transform((value) => Number(value)),

    transferDate: z.string().trim().min(1, "Transfer date is required."),

    transferClearingAccountId: requiredUuidField(
      "Please select a transfer clearing account.",
    ),

    memo: z
      .string()
      .trim()
      .max(500, "Memo cannot exceed 500 characters.")
      .optional(),
  })
  .superRefine((values, context) => {
    if (
      values.sourceAccountId &&
      values.destinationAccountId &&
      values.sourceAccountId === values.destinationAccountId
    ) {
      context.addIssue({
        code: "custom",
        path: ["destinationAccountId"],
        message:
          "Destination account must be different from the source account.",
      });
    }
  });

export const voidTransferSchema = z.object({
  voidReason: z
    .string()
    .trim()
    .min(1, "Void reason is required.")
    .min(3, "Void reason must contain at least 3 characters.")
    .max(500, "Void reason cannot exceed 500 characters."),
});

export type TransferFormInput = z.input<typeof transferSchema>;

export type TransferFormValues = z.output<typeof transferSchema>;

export type VoidTransferFormValues = z.infer<typeof voidTransferSchema>;
