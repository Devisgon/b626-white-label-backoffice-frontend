import { z } from "zod";

const requiredUuidField = (message: string) =>
  z
    .string()
    .trim()
    .min(1, message)
    .uuid("Please select a valid bank account.");

export const reconciliationSchema = z
  .object({
    bankAccountId: requiredUuidField(
      "Please select a bank account.",
    ),

    statementStartDate: z
      .string()
      .trim()
      .min(
        1,
        "Statement start date is required.",
      ),

    statementEndDate: z
      .string()
      .trim()
      .min(
        1,
        "Statement end date is required.",
      ),

    statementEndingBalance: z
      .string()
      .trim()
      .min(
        1,
        "Statement ending balance is required.",
      )
      .refine(
        (value) => {
          const amount = Number(value);

          return (
            value !== "" &&
            Number.isFinite(amount)
          );
        },
        {
          message:
            "Please enter a valid statement balance.",
        },
      )
      .transform((value) => Number(value)),
  })
  .superRefine((values, context) => {
    if (
      values.statementStartDate &&
      values.statementEndDate
    ) {
      const startDate = new Date(
        values.statementStartDate,
      );

      const endDate = new Date(
        values.statementEndDate,
      );

      if (endDate < startDate) {
        context.addIssue({
          code: "custom",
          path: ["statementEndDate"],
          message:
            "Statement end date cannot be before the start date.",
        });
      }
    }
  });

export const matchReconciliationLineSchema =
  z.object({
    transactionId: z
      .string()
      .trim()
      .min(
        1,
        "Please select a transaction.",
      )
      .uuid(
        "Please select a valid transaction.",
      ),

    cleared: z.boolean().default(true),

    statementReference: z
      .string()
      .trim()
      .max(
        100,
        "Statement reference cannot exceed 100 characters.",
      )
      .optional(),
  });

export type ReconciliationFormInput = z.input<
  typeof reconciliationSchema
>;

export type ReconciliationFormValues = z.output<
  typeof reconciliationSchema
>;

export type MatchReconciliationLineInput =
  z.input<
    typeof matchReconciliationLineSchema
  >;

export type MatchReconciliationLineValues =
  z.output<
    typeof matchReconciliationLineSchema
  >;