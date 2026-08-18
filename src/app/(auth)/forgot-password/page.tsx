"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowLeft,
  Mail,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/components/ui";
import { forgotPassword } from "@/features/auth/api";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schemas";
import type { ApiErrorResponse } from "@/lib/api";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(
    values: ForgotPasswordFormValues,
  ) {
    setServerError("");

    try {
      await forgotPassword(values);

      const email = encodeURIComponent(values.email);

      router.push(`/reset-password?email=${email}`);
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
          setServerError(message[0]);
        } else if (typeof message === "string") {
          setServerError(message);
        } else if (!error.response) {
          setServerError(
            "Unable to connect to the server. Please try again.",
          );
        } else {
          setServerError(
            "Unable to process your request.",
          );
        }

        return;
      }

      setServerError(
        "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div>
      <Link
        href="/login"
        className="
          mb-8 inline-flex items-center gap-2
          text-xs font-semibold text-muted
          transition-colors hover:text-primary
        "
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Password recovery
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Forgot your password?
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Enter your account email and we&apos;ll send you
          a 6-digit password reset code.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
        {serverError && (
          <div
            role="alert"
            className="
              rounded-xl border border-red-200 bg-red-50
              px-4 py-3 text-xs font-medium text-danger
            "
          >
            {serverError}
          </div>
        )}

        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="name@company.com"
          autoComplete="email"
          required
          leftIcon={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Send reset code
        </Button>
      </form>

      <p className="mt-7 text-center text-xs text-muted">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="
            font-semibold text-primary
            hover:text-primary-hover
          "
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}