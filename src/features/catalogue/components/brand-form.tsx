"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  brandSchema,
  type BrandFormValues,
} from "@/features/catalogue/schemas";

interface BrandFormProps {
  mode?: "create" | "edit";
  brandId?: number;
  initialValues?: BrandFormValues;
}

export function BrandForm({
  mode = "create",
  brandId,
  initialValues,
}: BrandFormProps) {
  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),

    defaultValues: initialValues ?? {
      name: "",
      description: "",
      status: "Active",
    },
  });

  async function onSubmit(values: BrandFormValues) {
    setSuccessMessage("");

    // Temporary delay for frontend testing.
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (mode === "edit") {
      console.log("Update brand:", {
        brandId,
        ...values,
      });

      setSuccessMessage("Brand updated successfully.");
    } else {
      console.log("Create brand:", values);

      setSuccessMessage("Brand created successfully.");
    }

    // Backend integration ke baad successful
    // API response par redirect hoga.
    setTimeout(() => {
      router.push("/catalog/brands");
    }, 600);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="
        overflow-hidden rounded-2xl
        border border-border bg-white
        shadow-[var(--shadow-sm)]
      "
    >
      <div className="border-b border-border p-5 sm:p-6">
        <h2 className="font-bold">Brand information</h2>

        <p className="mt-1 text-xs text-muted">
          Enter the brand name, description and current status.
        </p>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        {successMessage && (
          <div
            role="status"
            className="
              flex items-center gap-3 rounded-xl
              border border-emerald-200 bg-emerald-50
              px-4 py-3 text-sm font-medium
              text-emerald-700
            "
          >
            <CheckCircle2 className="size-4 shrink-0" />

            {successMessage}
          </div>
        )}

        <div>
          <label htmlFor="brand-name" className="text-sm font-semibold">
            Brand name <span className="text-danger">*</span>
          </label>

          <input
            id="brand-name"
            type="text"
            placeholder="For example: Nestle"
            autoComplete="off"
            {...register("name")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm outline-none
              transition placeholder:text-muted-light
              focus:ring-4 focus:ring-primary/10
              ${
                errors.name
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }
            `}
          />

          {errors.name && (
            <p role="alert" className="mt-2 text-xs font-medium text-danger">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="brand-description" className="text-sm font-semibold">
            Description
          </label>

          <textarea
            id="brand-description"
            rows={5}
            placeholder="Enter a short description for this brand..."
            {...register("description")}
            className={`
              mt-2 w-full resize-none rounded-xl
              border bg-white px-4 py-3 text-sm
              outline-none transition
              placeholder:text-muted-light
              focus:ring-4 focus:ring-primary/10
              ${
                errors.description
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }
            `}
          />

          <div className="mt-2 flex justify-between gap-4">
            {errors.description ? (
              <p role="alert" className="text-xs font-medium text-danger">
                {errors.description.message}
              </p>
            ) : (
              <p className="text-xs text-muted">Optional brand details.</p>
            )}

            <span className="text-xs text-muted">Maximum 500 characters</span>
          </div>
        </div>

        <div>
          <label htmlFor="brand-status" className="text-sm font-semibold">
            Status <span className="text-danger">*</span>
          </label>

          <select
            id="brand-status"
            {...register("status")}
            className="
              mt-2 h-11 w-full rounded-xl
              border border-border bg-white px-4
              text-sm outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>

          <p className="mt-2 text-xs text-muted">
            Inactive brands will not be available during product selection.
          </p>
        </div>
      </div>

      <div
        className="
          flex flex-col-reverse gap-3
          border-t border-border
          bg-surface-secondary/50 p-5
          sm:flex-row sm:justify-end sm:p-6
        "
      >
        <button
          type="button"
          onClick={() => router.push("/catalog/brands")}
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center justify-center
            rounded-xl border border-border bg-white
            px-5 text-sm font-semibold text-muted
            transition hover:bg-surface-secondary
            hover:text-foreground
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center justify-center
            gap-2 rounded-xl bg-primary px-5
            text-sm font-semibold text-white transition
            hover:bg-primary-hover
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="size-4" />

              {mode === "edit" ? "Save changes" : "Create brand"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
