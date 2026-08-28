"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  categorySchema,
  type CategoryFormValues,
} from "@/features/catalogue/schemas";

interface CategoryFormProps {
  mode?: "create" | "edit";
  categoryId?: number;
  initialValues?: CategoryFormValues;
}

export function CategoryForm({
  mode = "create",
  categoryId,
  initialValues,
}: CategoryFormProps) {
  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

    defaultValues: initialValues ?? {
      name: "",
      description: "",
      status: "Active",
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    setSuccessMessage("");

    // Temporary delay for frontend testing.
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (mode === "edit") {
      console.log("Update category:", {
        categoryId,
        ...values,
      });

      setSuccessMessage("Category updated successfully.");
    } else {
      console.log("Create category:", values);

      setSuccessMessage("Category created successfully.");
    }

    // Backend integration ke baad successful
    // API response par redirect hoga.
    setTimeout(() => {
      router.push("/catalog/categories");
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
        <h2 className="font-bold">Category information</h2>

        <p className="mt-1 text-xs text-muted">
          Enter the category name, description and current status.
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
          <label htmlFor="category-name" className="text-sm font-semibold">
            Category name <span className="text-danger">*</span>
          </label>

          <input
            id="category-name"
            type="text"
            placeholder="For example: Beverages"
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
          <label
            htmlFor="category-description"
            className="text-sm font-semibold"
          >
            Description
          </label>

          <textarea
            id="category-description"
            rows={5}
            placeholder="Enter a short description for this category..."
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
              <p className="text-xs text-muted">Optional category details.</p>
            )}

            <span className="text-xs text-muted">Maximum 500 characters</span>
          </div>
        </div>

        <div>
          <label htmlFor="category-status" className="text-sm font-semibold">
            Status <span className="text-danger">*</span>
          </label>

          <select
            id="category-status"
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
            Inactive categories will not be available during product selection.
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
          onClick={() => router.push("/catalog/categories")}
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

              {mode === "edit" ? "Save changes" : "Create category"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
