"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Database, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  fuelTankSchema,
  type FuelTankFormInput,
  type FuelTankFormValues,
} from "@/features/fuel/schemas";

interface FuelTankFormProps {
  mode?: "create" | "edit";
  tankId?: number;
  initialValues?: Partial<FuelTankFormInput>;
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

export function FuelTankForm({
  mode = "create",
  tankId,
  initialValues,
}: FuelTankFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FuelTankFormInput, unknown, FuelTankFormValues>({
    resolver: zodResolver(fuelTankSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      fuel_type: initialValues?.fuel_type ?? "",
      capacity: initialValues?.capacity ?? "",
      current_stock: initialValues?.current_stock ?? "",
      location_id: initialValues?.location_id ?? "",
      status: initialValues?.status ?? "",
    },
  });

  const capacity = Number(watch("capacity") || 0);

  const currentStock = Number(watch("current_stock") || 0);

  const stockPercentage =
    capacity > 0 ? Math.min((currentStock / capacity) * 100, 100) : 0;

  async function onSubmit(values: FuelTankFormValues) {
    setServerError("");
    setSuccessMessage("");

    try {
      /*
       * Temporary frontend testing.
       *
       * Backend integration par:
       *
       * if (mode === "edit" && tankId) {
       *   await updateFuelTank(
       *     tankId,
       *     values,
       *   );
       * } else {
       *   await createFuelTank(values);
       * }
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        mode,
        tankId,
        values,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Fuel tank updated successfully."
          : "Fuel tank created successfully.",
      );

      window.setTimeout(() => {
        router.push("/fuel/tanks");
        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to save the fuel tank. Please try again.");
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="
        rounded-2xl border border-border
        bg-white p-5 shadow-[var(--shadow-sm)]
        sm:p-6
      "
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex size-11 shrink-0 items-center
            justify-center rounded-xl
            bg-primary-light text-primary
          "
        >
          <Database className="size-5" />
        </span>

        <div>
          <h2 className="text-lg font-bold">Tank information</h2>

          <p className="mt-1 text-xs text-muted">
            Enter the fuel type, capacity and current stock details.
          </p>
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="
            mt-6 rounded-xl border border-red-200
            bg-red-50 px-4 py-3 text-sm
            font-medium text-red-700
          "
        >
          {serverError}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="
            mt-6 rounded-xl border
            border-emerald-200 bg-emerald-50
            px-4 py-3 text-sm font-medium
            text-emerald-700
          "
        >
          {successMessage}
        </div>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Tank name <span className="text-danger">*</span>
          </label>

          <input
            id="name"
            type="text"
            placeholder="For example: Tank 1 - Premium"
            {...register("name")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.name ? "border-red-300" : "border-border"}
            `}
          />

          {errors.name?.message && (
            <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="fuel_type" className="text-sm font-semibold">
            Fuel type <span className="text-danger">*</span>
          </label>

          <select
            id="fuel_type"
            {...register("fuel_type")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.fuel_type ? "border-red-300" : "border-border"}
            `}
          >
            <option value="">Select fuel type</option>

            <option value="Petrol">Petrol</option>

            <option value="Diesel">Diesel</option>

            <option value="Premium Petrol">Premium Petrol</option>

            <option value="High Speed Diesel">High Speed Diesel</option>
          </select>

          {errors.fuel_type?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.fuel_type.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="capacity" className="text-sm font-semibold">
            Capacity <span className="text-danger">*</span>
          </label>

          <div className="relative mt-2">
            <input
              id="capacity"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              {...register("capacity")}
              className={`
                h-11 w-full rounded-xl border
                bg-white px-4 pr-16 text-sm
                text-foreground outline-none
                transition focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                ${errors.capacity ? "border-red-300" : "border-border"}
              `}
            />

            <span
              className="
                pointer-events-none absolute right-4
                top-1/2 -translate-y-1/2
                text-xs font-medium text-muted
              "
            >
              Litres
            </span>
          </div>

          {errors.capacity?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.capacity.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="current_stock" className="text-sm font-semibold">
            Current stock
          </label>

          <div className="relative mt-2">
            <input
              id="current_stock"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              {...register("current_stock")}
              className={`
                h-11 w-full rounded-xl border
                bg-white px-4 pr-16 text-sm
                text-foreground outline-none
                transition focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                ${errors.current_stock ? "border-red-300" : "border-border"}
              `}
            />

            <span
              className="
                pointer-events-none absolute right-4
                top-1/2 -translate-y-1/2
                text-xs font-medium text-muted
              "
            >
              Litres
            </span>
          </div>

          {errors.current_stock?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.current_stock.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="location_id" className="text-sm font-semibold">
            Location
          </label>

          <select
            id="location_id"
            {...register("location_id")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.location_id ? "border-red-300" : "border-border"}
            `}
          >
            <option value="">Select location</option>

            {locationOptions.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>

          {errors.location_id?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.location_id.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="text-sm font-semibold">
            Status
          </label>

          <select
            id="status"
            {...register("status")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.status ? "border-red-300" : "border-border"}
            `}
          >
            <option value="">Select status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>

          {errors.status?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      {(capacity > 0 || currentStock > 0) && (
        <section
          className="
            mt-6 rounded-xl border border-border
            bg-surface-secondary p-4
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Stock level</p>

              <p className="mt-1 text-xs text-muted">
                {currentStock.toLocaleString()} of {capacity.toLocaleString()}{" "}
                litres
              </p>
            </div>

            <p className="text-sm font-bold text-primary">
              {stockPercentage.toFixed(1)}%
            </p>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="
                h-full rounded-full bg-primary
                transition-all duration-300
              "
              style={{
                width: `${stockPercentage}%`,
              }}
            />
          </div>
        </section>
      )}

      <div
        className="
          mt-8 flex flex-col-reverse gap-3
          border-t border-border pt-5
          sm:flex-row sm:justify-end
        "
      >
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center
            justify-center rounded-xl border
            border-border bg-white px-5
            text-sm font-semibold text-muted
            transition hover:bg-surface-secondary
            hover:text-foreground
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center
            justify-center gap-2 rounded-xl
            bg-primary px-5 text-sm font-semibold
            text-white transition
            hover:bg-primary-hover
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Save className="size-4" />

          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Update fuel tank"
              : "Create fuel tank"}
        </button>
      </div>
    </form>
  );
}
