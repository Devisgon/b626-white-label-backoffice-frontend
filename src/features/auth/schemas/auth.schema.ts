import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email address is required")
  .email("Enter a valid email address");

const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must contain at least 8 characters");

const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter the 6-digit verification code");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .min(2, "Name must contain at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),

    email: emailSchema,

    password: passwordSchema,

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export const verifyEmailSchema = z.object({
  email: emailSchema,
  otp: otpSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    otp: otpSchema,
    newPassword: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export const createLocationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Store name is required")
    .min(2, "Store name must contain at least 2 characters")
    .max(100, "Store name cannot exceed 100 characters"),

  address: z
    .string()
    .trim()
    .max(250, "Address cannot exceed 250 characters")
    .optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type RegisterFormValues = z.infer<
  typeof registerSchema
>;

export type VerifyEmailFormValues = z.infer<
  typeof verifyEmailSchema
>;

export type ForgotPasswordFormValues = z.infer<
  typeof forgotPasswordSchema
>;

export type ResetPasswordFormValues = z.infer<
  typeof resetPasswordSchema
>;

export type CreateLocationFormValues = z.infer<
  typeof createLocationSchema
>;