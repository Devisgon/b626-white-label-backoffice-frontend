import { z } from "zod";

const payeeTypeInput = z
  .union([
    z.literal(""),
    z.enum([
      "vendor",
      "supplier",
      "individual",
      "utility",
      "other",
    ]),
  ])
  .transform((value, context) => {
    if (value === "") {
      context.addIssue({
        code: "custom",
        message: "Please select a payee type.",
      });

      return z.NEVER;
    }

    return value;
  });

const optionalEmail = z
  .union([
    z.literal(""),
    z.string().email(
      "Please enter a valid email address.",
    ),
  ])
  .optional();

const optionalUuid = z
  .union([
    z.literal(""),
    z
      .string()
      .uuid(
        "Please select a valid bank account.",
      ),
  ])
  .optional();

export const payeeSchema = z.object({
  payeeName: z
    .string()
    .trim()
    .min(2, "Payee name is required.")
    .max(
      120,
      "Payee name cannot exceed 120 characters.",
    ),

  payeeType: payeeTypeInput,

  email: optionalEmail,

  phone: z
    .string()
    .trim()
    .max(
      30,
      "Phone number cannot exceed 30 characters.",
    )
    .optional(),

  addressLine1: z
    .string()
    .trim()
    .max(
      150,
      "Address cannot exceed 150 characters.",
    )
    .optional(),

  addressLine2: z
    .string()
    .trim()
    .max(
      150,
      "Address cannot exceed 150 characters.",
    )
    .optional(),

  city: z
    .string()
    .trim()
    .max(
      80,
      "City cannot exceed 80 characters.",
    )
    .optional(),

  state: z
    .string()
    .trim()
    .max(
      80,
      "State cannot exceed 80 characters.",
    )
    .optional(),

  postalCode: z
    .string()
    .trim()
    .max(
      20,
      "Postal code cannot exceed 20 characters.",
    )
    .optional(),

  country: z
    .string()
    .trim()
    .max(
      80,
      "Country cannot exceed 80 characters.",
    )
    .optional(),

  taxId: z
    .string()
    .trim()
    .max(
      50,
      "Tax ID cannot exceed 50 characters.",
    )
    .optional(),

  defaultAccountId: optionalUuid,

  notes: z
    .string()
    .trim()
    .max(
      500,
      "Notes cannot exceed 500 characters.",
    )
    .optional(),

  status: z.enum([
    "active",
    "inactive",
  ]),
});

export type PayeeFormInput = z.input<
  typeof payeeSchema
>;

export type PayeeFormValues = z.output<
  typeof payeeSchema
>;