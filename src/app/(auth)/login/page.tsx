"use client";
import { useAuthStore } from "@/store";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button, Input } from "@/components/ui";
import { loginUser } from "@/features/auth/api";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas";
import type { ApiErrorResponse } from "@/lib/api";

export default function LoginPage() {

  const router = useRouter();

  const setSession = useAuthStore(
  (state) => state.setSession,
);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError("");

    try {
      const response = await loginUser(values);

 setSession({
  user: response.user,
  accessToken: response.accessToken,
  refreshToken: response.refreshToken,
});

      if (response.onboardingComplete === false) {
        router.push("/onboarding/location");
        return;
      }

      router.push("/");
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
            "Login failed. Please check your details.",
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
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Welcome back
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Enter your account details to access the Total
          Store backoffice.
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

        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          leftIcon={<LockKeyhole className="size-4" />}
          error={errors.password?.message}
          rightElement={
            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              className="
                flex size-8 items-center justify-center
                rounded-lg text-muted
                transition-colors
                hover:bg-surface-secondary
                hover:text-foreground
              "
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          }
          {...register("password")}
        />

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              className="
                size-4 rounded border-border
                accent-primary
              "
            />

            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="
              text-xs font-semibold text-primary
              transition-colors hover:text-primary-hover
            "
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Sign in
        </Button>
      </form>

      <p className="mt-7 text-center text-xs text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="
            font-semibold text-primary
            hover:text-primary-hover
          "
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}