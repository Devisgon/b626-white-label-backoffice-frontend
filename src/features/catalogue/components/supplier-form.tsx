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
  supplierSchema,
  type SupplierFormValues,
} from "@/features/catalogue/schemas";

interface SupplierFormProps {
  mode?: "create" | "edit";
  supplierId?: number;
  initialValues?: SupplierFormValues;
}

export function SupplierForm({
  mode = "create",
  supplierId,
  initialValues,
}: SupplierFormProps) {
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
  } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),

    defaultValues:
      initialValues ?? {
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "Active",
      },
  });

  async function onSubmit(
    values: SupplierFormValues,
  ) {
    setSuccessMessage("");

    await new Promise((resolve) =>
      setTimeout(resolve, 700),
    );

    if (mode === "edit") {
      console.log("Update supplier:", {
        supplierId,
        ...values,
      });

      setSuccessMessage(
        "Supplier updated successfully.",
      );
    } else {
      console.log("Create supplier:", values);

      setSuccessMessage(
        "Supplier created successfully.",
      );
    }

    setTimeout(() => {
      router.push("/catalog/suppliers");
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
          Supplier information
        </h2>

        <p className="mt-1 text-xs text-muted">
          Enter supplier details and contact information.
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
            htmlFor="supplier-name"
            className="text-sm font-semibold"
          >
            Supplier name{" "}
            <span className="text-danger">*</span>
          </label>

          <input
            id="supplier-name"
            type="text"
            placeholder="For example: Nestle Pakistan"
            autoComplete="organization"
            {...register("name")}
            className={getFieldClass(
              Boolean(errors.name),
            )}
          />

          {errors.name && (
            <FieldError message={errors.name.message} />
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="supplier-email"
              className="text-sm font-semibold"
            >
              Email address
            </label>

            <input
              id="supplier-email"
              type="email"
              placeholder="supplier@example.com"
              autoComplete="email"
              {...register("email")}
              className={getFieldClass(
                Boolean(errors.email),
              )}
            />

            {errors.email && (
              <FieldError
                message={errors.email.message}
              />
            )}
          </div>

          <div>
            <label
              htmlFor="supplier-phone"
              className="text-sm font-semibold"
            >
              Phone number
            </label>

            <input
              id="supplier-phone"
              type="tel"
              placeholder="+92 300 1234567"
              autoComplete="tel"
              {...register("phone")}
              className={getFieldClass(
                Boolean(errors.phone),
              )}
            />

            {errors.phone && (
              <FieldError
                message={errors.phone.message}
              />
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="supplier-address"
            className="text-sm font-semibold"
          >
            Address
          </label>

          <textarea
            id="supplier-address"
            rows={4}
            placeholder="Enter supplier business address..."
            autoComplete="street-address"
            {...register("address")}
            className={`
              mt-2 w-full resize-none rounded-xl border
              bg-white px-4 py-3 text-sm outline-none
              transition placeholder:text-muted-light
              focus:ring-4 focus:ring-primary/10
              ${
                errors.address
                  ? "border-danger focus:border-danger"
                  : "border-border focus:border-primary"
              }
            `}
          />

          {errors.address ? (
            <FieldError
              message={errors.address.message}
            />
          ) : (
            <p className="mt-2 text-xs text-muted">
              Optional supplier business address.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="supplier-status"
            className="text-sm font-semibold"
          >
            Status{" "}
            <span className="text-danger">*</span>
          </label>

          <select
            id="supplier-status"
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
            Inactive suppliers will not be available
            during product selection.
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
            router.push("/catalog/suppliers")
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
                : "Create supplier"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function getFieldClass(hasError: boolean) {
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