"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  LoaderCircle,
  Save,
  ShieldAlert,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  departmentSchema,
  type DepartmentFormValues,
} from "@/features/catalogue/schemas";

interface DepartmentFormProps {
  mode?: "create" | "edit";
  departmentId?: number;
  initialValues?: DepartmentFormValues;
}

export function DepartmentForm({
  mode = "create",
  departmentId,
  initialValues,
}: DepartmentFormProps) {
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
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),

    defaultValues:
      initialValues ?? {
        name: "",
        description: "",
        defaultTaxRate: undefined,
        defaultMargin: undefined,
        ageRestriction: false,
        nacsCode: "",
        posDepartmentNumber: undefined,
        status: "Active",
      },
  });

  async function onSubmit(
    values: DepartmentFormValues,
  ) {
    setSuccessMessage("");

    await new Promise((resolve) =>
      setTimeout(resolve, 700),
    );

    if (mode === "edit") {
      console.log("Update department:", {
        departmentId,
        ...values,
      });

      setSuccessMessage(
        "Department updated successfully.",
      );
    } else {
      console.log("Create department:", values);

      setSuccessMessage(
        "Department created successfully.",
      );
    }

    setTimeout(() => {
      router.push("/catalog/departments");
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
          Department information
        </h2>

        <p className="mt-1 text-xs text-muted">
          Configure department information, tax and POS
          defaults.
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
          <FieldLabel
            htmlFor="department-name"
            label="Department name"
            required
          />

          <input
            id="department-name"
            type="text"
            placeholder="For example: Grocery"
            {...register("name")}
            className={getInputClass(
              Boolean(errors.name),
            )}
          />

          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <FieldLabel
            htmlFor="department-description"
            label="Description"
          />

          <textarea
            id="department-description"
            rows={4}
            placeholder="Enter department description..."
            {...register("description")}
            className={`
              mt-2 w-full resize-none rounded-xl border
              bg-white px-4 py-3 text-sm outline-none
              transition placeholder:text-muted-light
              focus:ring-4 focus:ring-primary/10
              ${
                errors.description
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }
            `}
          />

          <FieldError
            message={errors.description?.message}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel
              htmlFor="default-tax-rate"
              label="Default tax rate (%)"
            />

            <input
              id="default-tax-rate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="For example: 5"
              {...register("defaultTaxRate", {
                setValueAs: (value) =>
                  value === ""
                    ? undefined
                    : Number(value),
              })}
              className={getInputClass(
                Boolean(errors.defaultTaxRate),
              )}
            />

            <FieldError
              message={
                errors.defaultTaxRate?.message
              }
            />
          </div>

          <div>
            <FieldLabel
              htmlFor="default-margin"
              label="Default margin (%)"
            />

            <input
              id="default-margin"
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="For example: 20"
              {...register("defaultMargin", {
                setValueAs: (value) =>
                  value === ""
                    ? undefined
                    : Number(value),
              })}
              className={getInputClass(
                Boolean(errors.defaultMargin),
              )}
            />

            <FieldError
              message={
                errors.defaultMargin?.message
              }
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel
              htmlFor="nacs-code"
              label="NACS code"
            />

            <input
              id="nacs-code"
              type="text"
              placeholder="For example: GRC-01"
              {...register("nacsCode")}
              className={getInputClass(
                Boolean(errors.nacsCode),
              )}
            />

            <FieldError
              message={errors.nacsCode?.message}
            />
          </div>

          <div>
            <FieldLabel
              htmlFor="pos-department-number"
              label="POS department number"
            />

            <input
              id="pos-department-number"
              type="number"
              min="1"
              step="1"
              placeholder="For example: 10"
              {...register("posDepartmentNumber", {
                setValueAs: (value) =>
                  value === ""
                    ? undefined
                    : Number(value),
              })}
              className={getInputClass(
                Boolean(
                  errors.posDepartmentNumber,
                ),
              )}
            />

            <FieldError
              message={
                errors.posDepartmentNumber?.message
              }
            />
          </div>
        </div>

        <label
          className="
            flex cursor-pointer items-start gap-3
            rounded-xl border border-border p-4
            transition hover:bg-surface-secondary/60
          "
        >
          <input
            type="checkbox"
            {...register("ageRestriction")}
            className="
              mt-0.5 size-4 rounded border-border
              accent-primary
            "
          />

          <span>
            <span className="flex items-center gap-2 text-sm font-semibold">
              <ShieldAlert className="size-4 text-warning" />
              Age restriction
            </span>

            <span className="mt-1 block text-xs text-muted">
              Enable this for age-restricted products such
              as tobacco.
            </span>
          </span>
        </label>

        <div>
          <FieldLabel
            htmlFor="department-status"
            label="Status"
            required
          />

          <select
            id="department-status"
            {...register("status")}
            className="
              mt-2 h-11 w-full rounded-xl border
              border-border bg-white px-4 text-sm
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
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
            router.push("/catalog/departments")
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
                : "Create department"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required = false,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold"
    >
      {label}{" "}

      {required && (
        <span className="text-danger">*</span>
      )}
    </label>
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