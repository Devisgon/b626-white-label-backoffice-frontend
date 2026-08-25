"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeDollarSign,
  Save,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  fuelPriceSchema,
  type FuelPriceFormInput,
  type FuelPriceFormValues,
} from "@/features/fuel/schemas";

interface FuelPriceFormProps {
  mode?: "create" | "edit";
  priceId?: number;
  initialValues?: Partial<FuelPriceFormInput>;
}

const locationOptions = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Phoenix Store",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Central Fuel Station",
  },
];

export function FuelPriceForm({
  mode = "create",
  priceId,
  initialValues,
}: FuelPriceFormProps) {
  const router = useRouter();

  const [serverError, setServerError] =
    useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<
    FuelPriceFormInput,
    unknown,
    FuelPriceFormValues
  >({
    resolver: zodResolver(fuelPriceSchema),
    defaultValues: {
      fuel_type:
        initialValues?.fuel_type ?? "",
      price_per_liter:
        initialValues?.price_per_liter ?? "",
      effective_from:
        initialValues?.effective_from ?? "",
      location_id:
        initialValues?.location_id ?? "",
      status: initialValues?.status ?? "",
    },
  });

  async function onSubmit(
    values: FuelPriceFormValues,
  ) {
    setServerError("");
    setSuccessMessage("");

    try {
      const payload = {
        ...values,
        effective_from: new Date(
          values.effective_from,
        ).toISOString(),
      };

      /*
       * Backend integration:
       *
       * if (mode === "edit" && priceId) {
       *   await updateFuelPrice(
       *     priceId,
       *     payload,
       *   );
       * } else {
       *   await createFuelPrice(payload);
       * }
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        mode,
        priceId,
        payload,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Fuel price updated successfully."
          : "Fuel price created successfully.",
      );

      window.setTimeout(() => {
        router.push("/fuel/prices");
        router.refresh();
      }, 800);
    } catch {
      setServerError(
        "Unable to save the fuel price.",
      );
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary">
          <BadgeDollarSign className="size-5" />
        </span>

        <div>
          <h2 className="text-lg font-bold">
            Price information
          </h2>
          <p className="mt-1 text-xs text-muted">
            Enter the fuel price and effective date.
          </p>
        </div>
      </div>

      {serverError && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field>
          <label
            htmlFor="fuel_type"
            className="text-sm font-semibold"
          >
            Fuel type{" "}
            <span className="text-danger">*</span>
          </label>

          <select
            id="fuel_type"
            {...register("fuel_type")}
            className={inputClass(
              Boolean(errors.fuel_type),
            )}
          >
            <option value="">
              Select fuel type
            </option>
            <option value="Petrol">
              Petrol
            </option>
            <option value="Diesel">
              Diesel
            </option>
            <option value="Premium Petrol">
              Premium Petrol
            </option>
            <option value="High Speed Diesel">
              High Speed Diesel
            </option>
          </select>

          <ErrorMessage
            message={errors.fuel_type?.message}
          />
        </Field>

        <Field>
          <label
            htmlFor="price_per_liter"
            className="text-sm font-semibold"
          >
            Price per litre{" "}
            <span className="text-danger">*</span>
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted">
              PKR
            </span>

            <input
              id="price_per_liter"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              {...register("price_per_liter")}
              className={`${inputClass(
                Boolean(errors.price_per_liter),
              )} pl-14`}
            />
          </div>

          <ErrorMessage
            message={
              errors.price_per_liter?.message
            }
          />
        </Field>

        <Field>
          <label
            htmlFor="effective_from"
            className="text-sm font-semibold"
          >
            Effective from{" "}
            <span className="text-danger">*</span>
          </label>

          <input
            id="effective_from"
            type="datetime-local"
            {...register("effective_from")}
            className={inputClass(
              Boolean(errors.effective_from),
            )}
          />

          <ErrorMessage
            message={
              errors.effective_from?.message
            }
          />
        </Field>

        <Field>
          <label
            htmlFor="location_id"
            className="text-sm font-semibold"
          >
            Location
          </label>

          <select
            id="location_id"
            {...register("location_id")}
            className={inputClass(
              Boolean(errors.location_id),
            )}
          >
            <option value="">
              Select location
            </option>

            {locationOptions.map((location) => (
              <option
                key={location.id}
                value={location.id}
              >
                {location.name}
              </option>
            ))}
          </select>

          <ErrorMessage
            message={errors.location_id?.message}
          />
        </Field>

        <Field>
          <label
            htmlFor="status"
            className="text-sm font-semibold"
          >
            Status
          </label>

          <select
            id="status"
            {...register("status")}
            className={inputClass(
              Boolean(errors.status),
            )}
          >
            <option value="">
              Select status
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Inactive">
              Inactive
            </option>
          </select>

          <ErrorMessage
            message={errors.status?.message}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="h-11 rounded-xl border border-border bg-white px-5 text-sm font-semibold text-muted"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
        >
          <Save className="size-4" />

          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Update fuel price"
              : "Create fuel price"}
        </button>
      </div>
    </form>
  );
}

function Field({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      {children}
    </div>
  );
}

function ErrorMessage({
  message,
}: {
  message?: string;
}) {
  if (!message) return null;

  return (
    <p className="text-xs text-danger">
      {message}
    </p>
  );
}

function inputClass(hasError: boolean) {
  return `
    h-11 w-full rounded-xl border bg-white
    px-4 text-sm outline-none transition
    focus:border-primary
    focus:ring-4 focus:ring-primary/10
    ${
      hasError
        ? "border-red-300"
        : "border-border"
    }
  `;
}