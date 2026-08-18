"use client";
import { useAuthStore } from "@/store";

import {
  Suspense,
  useEffect,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {
  KeyRound,
  Mail,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/components/ui";
import {
  resendOtp,
  verifyEmail,
} from "@/features/auth/api";
import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "@/features/auth/schemas";
import type { ApiErrorResponse } from "@/lib/api";

function VerifyEmailForm() {
  const router = useRouter();
  const setSession = useAuthStore(
  (state) => state.setSession,
);
  const searchParams = useSearchParams();

  const emailFromUrl = searchParams.get("email") ?? "";

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: emailFromUrl,
      otp: "",
    },
  });

  useEffect(() => {
    reset({
      email: emailFromUrl,
      otp: "",
    });
  }, [emailFromUrl, reset]);

  async function onSubmit(
    values: VerifyEmailFormValues,
  ) {
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await verifyEmail(values);

   setSession({
  user: response.user,
  accessToken: response.accessToken,
  refreshToken: response.refreshToken,
});

      router.push("/onboarding/location");
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
            "Verification failed. Please check your code.",
          );
        }

        return;
      }

      setServerError(
        "Something went wrong. Please try again.",
      );
    }
  }

  async function handleResendOtp() {
    if (!emailFromUrl) {
      setServerError(
        "Email address is missing. Please register again.",
      );
      return;
    }

    setServerError("");
    setSuccessMessage("");
    setIsResending(true);

    try {
      const response = await resendOtp({
        email: emailFromUrl,
        purpose: "EMAIL_VERIFICATION",
      });

      setSuccessMessage(response.message);
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const message = error.response?.data?.message;

        setServerError(
          typeof message === "string"
            ? message
            : "Unable to resend the code.",
        );
      } else {
        setServerError(
          "Something went wrong. Please try again.",
        );
      }
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Check your inbox
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Verify your email
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Enter the 6-digit verification code sent to your
          email address.
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

        {successMessage && (
          <div
            role="status"
            className="
              rounded-xl border border-emerald-200
              bg-emerald-50 px-4 py-3
              text-xs font-medium text-success
            "
          >
            {successMessage}
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
          label="Verification code"
          placeholder="000000"
          autoComplete="one-time-code"
          maxLength={6}
          required
          leftIcon={<KeyRound className="size-4" />}
          error={errors.otp?.message}
          className="tracking-[0.3em]"
          {...register("otp")}
        />

        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Verify email
        </Button>
      </form>

      <div className="mt-7 text-center">
        <p className="text-xs text-muted">
          Didn&apos;t receive the code?
        </p>

        <button
          type="button"
          disabled={isResending}
          onClick={handleResendOtp}
          className="
            mt-2 text-xs font-semibold text-primary
            transition-colors hover:text-primary-hover
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          {isResending
            ? "Sending code..."
            : "Resend verification code"}
        </button>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-muted">
          Loading verification page...
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}