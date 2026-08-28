"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fuel, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  fuelPumpSchema,
  type FuelPumpFormInput,
  type FuelPumpFormValues,
} from "@/features/fuel/schemas";

interface FuelPumpFormProps {
  mode?: "create" | "edit";
  pumpId?: number;
  initialValues?: Partial<FuelPumpFormInput>;
}

const tankOptions = [
  {
    id: 1,
    name: "Tank 1 - Premium",
    fuelType: "Premium Petrol",
  },
  {
    id: 2,
    name: "Tank 2 - Diesel",
    fuelType: "Diesel",
  },
  {
    id: 3,
    name: "Tank 3 - Regular",
    fuelType: "Petrol",
  },
];

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

export function FuelPumpForm({
  mode = "create",
  pumpId,
  initialValues,
}: FuelPumpFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FuelPumpFormInput, unknown, FuelPumpFormValues>({
    resolver: zodResolver(fuelPumpSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      tank_id: initialValues?.tank_id ?? "",
      location_id: initialValues?.location_id ?? "",
      status: initialValues?.status ?? "",
    },
  });

  async function onSubmit(values: FuelPumpFormValues) {
    setServerError("");
    setSuccessMessage("");

    try {
      /*
       * Backend integration:
       *
       * if (mode === "edit" && pumpId) {
       *   await updateFuelPump(pumpId, values);
       * } else {
       *   await createFuelPump(values);
       * }
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        mode,
        pumpId,
        values,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Fuel pump updated successfully."
          : "Fuel pump created successfully.",
      );

      window.setTimeout(() => {
        router.push("/fuel/pumps");
        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to save the fuel pump. Please try again.");
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
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Fuel className="size-5" />
        </span>

        <div>
          <h2 className="text-lg font-bold">Pump information</h2>

          <p className="mt-1 text-xs text-muted">
            Enter the pump, connected tank and location details.
          </p>
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {serverError}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        >
          {successMessage}
        </div>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Pump name <span className="text-danger">*</span>
          </label>

          <input
            id="name"
            type="text"
            placeholder="For example: Pump 1"
            {...register("name")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.name ? "border-red-300" : "border-border"}
            `}
          />

          {errors.name?.message && (
            <p className="mt-1.5 text-xs text-danger">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="tank_id" className="text-sm font-semibold">
            Connected fuel tank <span className="text-danger">*</span>
          </label>

          <select
            id="tank_id"
            {...register("tank_id")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.tank_id ? "border-red-300" : "border-border"}
            `}
          >
            <option value="">Select fuel tank</option>

            {tankOptions.map((tank) => (
              <option key={tank.id} value={String(tank.id)}>
                {tank.name} — {tank.fuelType}
              </option>
            ))}
          </select>

          {errors.tank_id?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.tank_id.message}
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
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
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
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
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
          className="
            inline-flex h-11 items-center
            justify-center gap-2 rounded-xl
            bg-primary px-5 text-sm font-semibold
            text-white transition
            hover:bg-primary-hover
            disabled:opacity-60
          "
        >
          <Save className="size-4" />

          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Update fuel pump"
              : "Create fuel pump"}
        </button>
      </div>
    </form>
  );
}
