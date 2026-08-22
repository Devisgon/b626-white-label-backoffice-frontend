import { z } from "zod";

const accountCategoryInput = z
  .union([
    z.literal(""),
    z.enum([
      "asset",
      "liability",
      "equity",
      "revenue",
      "expense",
    ]),
  ])
  .transform((value, context) => {
    if (value === "") {
      context.addIssue({
        code: "custom",
        message:
          "Please select an account category.",
      });

      return z.NEVER;
    }

    return value;
  });

const normalBalanceInput = z
  .union([
    z.literal(""),
    z.enum([
      "debit",
      "credit",
    ]),
  ])
  .transform((value, context) => {
    if (value === "") {
      context.addIssue({
        code: "custom",
        message:
          "Please select the normal balance.",
      });

      return z.NEVER;
    }

    return value;
  });

export const chartAccountSchema = z.object({
  accountCode: z
    .string()
    .trim()
    .min(1, "Account code is required.")
    .max(
      30,
      "Account code cannot exceed 30 characters.",
    ),

  accountName: z
    .string()
    .trim()
    .min(
      2,
      "Account name must contain at least 2 characters.",
    )
    .max(
      100,
      "Account name cannot exceed 100 characters.",
    ),

  accountCategory: accountCategoryInput,

  normalBalance: normalBalanceInput,

  parentAccountId: z
    .union([
      z.literal(""),
      z
        .string()
        .uuid(
          "Please select a valid parent account.",
        ),
    ])
    .optional(),

  description: z
    .string()
    .trim()
    .max(
      500,
      "Description cannot exceed 500 characters.",
    )
    .optional(),

  status: z.enum([
    "active",
    "inactive",
  ]),
});

export type ChartAccountFormInput = z.input<
  typeof chartAccountSchema
>;

export type ChartAccountFormValues = z.output<
  typeof chartAccountSchema
>;