"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Save, Warehouse } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  inventoryLocationSchema,
  type InventoryLocationFormValues,
} from "@/features/catalogue/schemas";

interface InventoryLocationFormProps {
  mode?: "create" | "edit";
  inventoryLocationId?: number;
  initialValues?: Partial<InventoryLocationFormValues>;
}

export function InventoryLocationForm({
  mode = "create",
  inventoryLocationId,
  initialValues,
}: InventoryLocationFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InventoryLocationFormValues>({
    resolver: zodResolver(inventoryLocationSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
      address: initialValues?.address ?? "",
      status: initialValues?.status ?? "Active",
    },
  });

  async function onSubmit(values: InventoryLocationFormValues): Promise<void> {
    setServerError("");
    setSuccessMessage("");

    try {
      // Temporary delay until backend is connected.
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 700);
      });

      console.log({
        mode,
        inventoryLocationId,
        values,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Inventory location updated successfully."
          : "Inventory location created successfully.",
      );

      setTimeout(() => {
        router.push("/catalog/inventory-locations");
        router.refresh();
      }, 800);
    } catch {
      setServerError(
        "Unable to save the inventory location. Please try again.",
      );
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
            flex size-10 items-center
            justify-center rounded-xl
            bg-primary-light text-primary
          "
        >
          <Warehouse className="size-4" />
        </span>

        <div>
          <h2 className="text-lg font-bold">Location information</h2>

          <p className="mt-1 text-xs text-muted">
            Enter the inventory storage location details.
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

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Location name <span className="text-danger">*</span>
          </label>

          <input
            id="name"
            type="text"
            placeholder="For example: Main Warehouse"
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
          <label htmlFor="code" className="text-sm font-semibold">
            Location code <span className="text-danger">*</span>
          </label>

          <input
            id="code"
            type="text"
            placeholder="For example: WH-001"
            {...register("code")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm uppercase
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.code ? "border-red-300" : "border-border"}
            `}
          />

          {errors.code?.message && (
            <p className="mt-1.5 text-xs text-danger">{errors.code.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="text-sm font-semibold">
            Address
          </label>

          <div className="relative mt-2">
            <MapPin
              className="
                pointer-events-none absolute
                left-4 top-3.5 size-4 text-muted
              "
            />

            <textarea
              id="address"
              rows={4}
              placeholder="Enter the complete location address..."
              {...register("address")}
              className={`
                w-full resize-none rounded-xl
                border bg-white py-3 pl-11 pr-4
                text-sm outline-none transition
                focus:border-primary
                focus:ring-4 focus:ring-primary/10
                ${errors.address ? "border-red-300" : "border-border"}
              `}
            />
          </div>

          {errors.address?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="status" className="text-sm font-semibold">
            Status <span className="text-danger">*</span>
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
              ? "Update location"
              : "Create location"}
        </button>
      </div>
    </form>
  );
}
