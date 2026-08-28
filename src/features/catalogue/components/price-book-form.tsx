"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { priceBookSchema } from "@/features/catalogue/schemas";

type PriceBookFormValues = z.infer<typeof priceBookSchema>;

interface PriceBookFormProps {
  mode?: "create" | "edit";
  priceBookId?: number;
  initialValues?: Partial<PriceBookFormValues>;
}

export function PriceBookForm({
  mode = "create",
  priceBookId,
  initialValues,
}: PriceBookFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PriceBookFormValues>({
    resolver: zodResolver(priceBookSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      status: initialValues?.status ?? "Active",
    },
  });

  async function onSubmit(values: PriceBookFormValues): Promise<void> {
    setServerError("");
    setSuccessMessage("");

    try {
      // Temporary delay until backend is connected.
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 700);
      });

      console.log({
        mode,
        priceBookId,
        values,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Price book updated successfully."
          : "Price book created successfully.",
      );

      setTimeout(() => {
        router.push("/catalog/price-books");
        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to save the price book. Please try again.");
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
      <div>
        <h2 className="text-lg font-bold">Price book information</h2>

        <p className="mt-1 text-xs text-muted">
          Enter the name, description and current availability of this price
          book.
        </p>
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

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Price book name <span className="text-danger">*</span>
          </label>

          <input
            id="name"
            type="text"
            placeholder="For example: Standard Retail Prices"
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
          <label htmlFor="description" className="text-sm font-semibold">
            Description
          </label>

          <textarea
            id="description"
            rows={5}
            placeholder="Add a short description for this price book..."
            {...register("description")}
            className={`
              mt-2 w-full resize-none rounded-xl
              border bg-white px-4 py-3 text-sm
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.description ? "border-red-300" : "border-border"}
            `}
          />

          {errors.description?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
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
              ? "Update price book"
              : "Create price book"}
        </button>
      </div>
    </form>
  );
}
