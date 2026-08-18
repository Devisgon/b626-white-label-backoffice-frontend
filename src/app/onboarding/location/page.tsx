"use client";
import { OnboardingGuard } from "@/components/shared";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowRight,
  MapPin,
  Store,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/components/ui";
import { createOnboardingLocation } from "@/features/auth/api";
import {
  createLocationSchema,
  type CreateLocationFormValues,
} from "@/features/auth/schemas";
import type { ApiErrorResponse } from "@/lib/api";
import { useAuthStore } from "@/store";

export default function OnboardingLocationPage() {
  const router = useRouter();

  const updateTokens = useAuthStore(
    (state) => state.updateTokens,
  );

  const setActiveLocation = useAuthStore(
    (state) => state.setActiveLocation,
  );

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateLocationFormValues>({
    resolver: zodResolver(createLocationSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  async function onSubmit(
    values: CreateLocationFormValues,
  ) {
    setServerError("");

    try {
      const response = await createOnboardingLocation({
        name: values.name,
        address: values.address || undefined,
      });

      updateTokens(
        response.accessToken,
        response.refreshToken,
      );

      setActiveLocation(response.location);

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
            "Unable to create your store. Please check the details.",
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
     <OnboardingGuard>
    <main
      className="
        relative flex min-h-screen items-center justify-center
        overflow-hidden bg-background px-5 py-10
      "
    >
      <div
        className="
          absolute -left-40 -top-40 size-[420px]
          rounded-full bg-primary/10 blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-48 -right-40 size-[480px]
          rounded-full bg-blue-200/30 blur-3xl
        "
      />

      <section
        className="
          relative z-10 w-full max-w-[540px]
          rounded-3xl border border-border bg-white
          p-6 shadow-[var(--shadow-lg)]
          sm:p-9
        "
      >
        <div className="flex items-center justify-between">
          <div
            className="
              flex size-11 items-center justify-center rounded-xl
              bg-gradient-to-br from-emerald-500 to-primary
              text-xs font-bold text-white
            "
          >
            TS
          </div>

          <span
            className="
              rounded-full bg-primary-light px-3 py-1.5
              text-[10px] font-bold uppercase
              tracking-wider text-primary
            "
          >
            Final step
          </span>
        </div>

        <div className="mt-8">
          <div
            className="
              flex size-12 items-center justify-center
              rounded-2xl bg-primary-light text-primary
            "
          >
            <Store className="size-6" />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            Set up your first store
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted">
            Add your main store location to complete account
            setup and access your backoffice dashboard.
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
            id="storeName"
            type="text"
            label="Store name"
            placeholder="e.g. Phoenix Store"
            autoComplete="organization"
            required
            leftIcon={<Store className="size-4" />}
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            id="storeAddress"
            type="text"
            label="Store address"
            placeholder="e.g. Okara, Punjab"
            autoComplete="street-address"
            leftIcon={<MapPin className="size-4" />}
            helperText="You can update this information later."
            error={errors.address?.message}
            {...register("address")}
          />

          <Button
            type="submit"
            size="lg"
            loading={isSubmitting}
            rightIcon={<ArrowRight className="size-4" />}
            className="w-full"
          >
            Complete setup
          </Button>
        </form>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />

          <p className="text-[10px] text-muted">
            Your data is securely isolated
          </p>

          <span className="h-px flex-1 bg-border" />
        </div>
      </section>
    </main>
  </OnboardingGuard>
);
}