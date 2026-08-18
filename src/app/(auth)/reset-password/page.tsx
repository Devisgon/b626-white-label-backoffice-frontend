"use client";

import {
  Suspense,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import axios from "axios";
import {
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/components/ui";
import { resetPassword } from "@/features/auth/api";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas";
import type { ApiErrorResponse } from "@/lib/api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromUrl = searchParams.get("email") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromUrl,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    reset({
      email: emailFromUrl,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [emailFromUrl, reset]);

  async function onSubmit(
    values: ResetPasswordFormValues,
  ) {
    setServerError("");

    try {
      await resetPassword({
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword,
      });

      router.push("/login?passwordReset=true");
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
            "Unable to reset your password. Please check the code.",
          );
        }

        return;
      }

      setServerError(
        "Something went wrong. Please try again.",
      );
    }
  }

  const passwordToggle = (
    <button
      type="button"
      onClick={() =>
        setShowPassword((previous) => !previous)
      }
      aria-label={
        showPassword
          ? "Hide passwords"
          : "Show passwords"
      }
      className="
        flex size-8 items-center justify-center
        rounded-lg text-muted transition-colors
        hover:bg-surface-secondary hover:text-foreground
      "
    >
      {showPassword ? (
        <EyeOff className="size-4" />
      ) : (
        <Eye className="size-4" />
      )}
    </button>
  );

  return (
    <div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Secure your account
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Reset your password
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Enter the 6-digit code sent to your email and
          choose a new password.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-4"
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
          readOnly={Boolean(emailFromUrl)}
          required
          leftIcon={<Mail className="size-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          label="Reset code"
          placeholder="000000"
          autoComplete="one-time-code"
          maxLength={6}
          required
          leftIcon={<KeyRound className="size-4" />}
          error={errors.otp?.message}
          className="tracking-[0.3em]"
          {...register("otp")}
        />

        <Input
          id="newPassword"
          type={showPassword ? "text" : "password"}
          label="New password"
          placeholder="Minimum 8 characters"
          autoComplete="new-password"
          required
          leftIcon={<LockKeyhole className="size-4" />}
          rightElement={passwordToggle}
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          label="Confirm new password"
          placeholder="Enter your password again"
          autoComplete="new-password"
          required
          leftIcon={<LockKeyhole className="size-4" />}
          rightElement={passwordToggle}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Reset password
        </Button>
      </form>

      <p className="mt-7 text-center text-xs text-muted">
        Return to{" "}
        <Link
          href="/login"
          className="
            font-semibold text-primary
            hover:text-primary-hover
          "
        >
          sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-muted">
          Loading password reset...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}