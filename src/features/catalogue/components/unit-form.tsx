"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  LoaderCircle,
  Save,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  unitSchema,
  type UnitFormValues,
} from "@/features/catalogue/schemas";

interface UnitFormProps {
  mode?: "create" | "edit";
  unitId?: number;
  initialValues?: UnitFormValues;
}

export function UnitForm({
  mode = "create",
  unitId,
  initialValues,
}: UnitFormProps) {
  const router = useRouter();

  const [successMessage, setSuccessMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema),

    defaultValues:
      initialValues ?? {
        name: "",
        shortName: "",
        status: "Active",
      },
  });

  async function onSubmit(
    values: UnitFormValues,
  ) {
    setSuccessMessage("");

    await new Promise((resolve) =>
      setTimeout(resolve, 700),
    );

    if (mode === "edit") {
      console.log("Update unit:", {
        unitId,
        ...values,
      });

      setSuccessMessage(
        "Unit updated successfully.",
      );
    } else {
      console.log("Create unit:", values);

      setSuccessMessage(
        "Unit created successfully.",
      );
    }

    setTimeout(() => {
      router.push("/catalog/units");
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
        <h2 className="font-bold">
          Unit information
        </h2>

        <p className="mt-1 text-xs text-muted">
          Enter the unit name, short name and status.
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
          <label
            htmlFor="unit-name"
            className="text-sm font-semibold"
          >
            Unit name{" "}
            <span className="text-danger">*</span>
          </label>

          <input
            id="unit-name"
            type="text"
            placeholder="For example: Kilogram"
            {...register("name")}
            className={getInputClass(
              Boolean(errors.name),
            )}
          />

          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <label
            htmlFor="unit-short-name"
            className="text-sm font-semibold"
          >
            Short name
          </label>

          <input
            id="unit-short-name"
            type="text"
            placeholder="For example: kg"
            {...register("shortName")}
            className={getInputClass(
              Boolean(errors.shortName),
            )}
          />

          {errors.shortName ? (
            <FieldError
              message={errors.shortName.message}
            />
          ) : (
            <p className="mt-2 text-xs text-muted">
              A short abbreviation displayed with product
              quantities.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="unit-status"
            className="text-sm font-semibold"
          >
            Status{" "}
            <span className="text-danger">*</span>
          </label>

          <select
            id="unit-status"
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
            Inactive units will not be available during
            product creation.
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
          onClick={() =>
            router.push("/catalog/units")
          }
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center justify-center
            rounded-xl border border-border bg-white
            px-5 text-sm font-semibold text-muted
            transition hover:bg-surface-secondary
            hover:text-foreground
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

              {mode === "edit"
                ? "Save changes"
                : "Create unit"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p
      role="alert"
      className="mt-2 text-xs font-medium text-danger"
    >
      {message}
    </p>
  );
}

function getInputClass(hasError: boolean) {
  return `
    mt-2 h-11 w-full rounded-xl border
    bg-white px-4 text-sm outline-none transition
    placeholder:text-muted-light
    focus:ring-4 focus:ring-primary/10
    ${
      hasError
        ? "border-danger focus:border-danger"
        : "border-border focus:border-primary"
    }
  `;
}