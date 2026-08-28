"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/components/ui";
import { registerUser } from "@/features/auth/api";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas";
import type { ApiErrorResponse } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setServerError("");

    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      const email = encodeURIComponent(values.email);

      router.push(`/verify-email?email=${email}`);
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
          setServerError(message[0]);
        } else if (typeof message === "string") {
          setServerError(message);
        } else if (!error.response) {
          setServerError("Unable to connect to the server. Please try again.");
        } else {
          setServerError("Registration failed. Please check your details.");
        }

        return;
      }

      setServerError("Something went wrong. Please try again.");
    }
  }

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((previous) => !previous)}
      aria-label={showPassword ? "Hide passwords" : "Show passwords"}
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
          Get started
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Create your organisation and start managing your store from one
          workspace.
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
          id="name"
          type="text"
          label="Full name"
          placeholder="Enter your full name"
          autoComplete="name"
          required
          leftIcon={<UserRound className="size-4" />}
          error={errors.name?.message}
          {...register("name")}
        />

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
          placeholder="Minimum 8 characters"
          autoComplete="new-password"
          required
          leftIcon={<LockKeyhole className="size-4" />}
          rightElement={passwordToggle}
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          label="Confirm password"
          placeholder="Enter your password again"
          autoComplete="new-password"
          required
          leftIcon={<LockKeyhole className="size-4" />}
          rightElement={passwordToggle}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <label className="flex items-start gap-2.5 text-xs leading-5 text-muted">
          <input
            type="checkbox"
            required
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />

          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-semibold text-primary hover:text-primary-hover"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-semibold text-primary hover:text-primary-hover"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          className="w-full"
        >
          Create account
        </Button>
      </form>

      <p className="mt-7 text-center text-xs text-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
