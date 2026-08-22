"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  chartAccountSchema,
  type ChartAccountFormInput,
  type ChartAccountFormValues,
} from "@/features/banking/schemas";

interface ChartAccountFormProps {
  mode?: "create" | "edit";
  chartAccountId?: string;
  initialValues?: Partial<ChartAccountFormValues>;
}

const parentAccounts = [
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000001",
    code: "1000",
    name: "Assets",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000002",
    code: "2000",
    name: "Liabilities",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000003",
    code: "3000",
    name: "Equity",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000004",
    code: "4000",
    name: "Revenue",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000005",
    code: "5000",
    name: "Expenses",
  },
];

export function ChartAccountForm({
  mode = "create",
  chartAccountId,
  initialValues,
}: ChartAccountFormProps) {
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
    ChartAccountFormInput,
    unknown,
    ChartAccountFormValues
  >({
    resolver: zodResolver(chartAccountSchema),

    defaultValues: {
      accountCode:
        initialValues?.accountCode ?? "",

      accountName:
        initialValues?.accountName ?? "",

      accountCategory:
        initialValues?.accountCategory ?? "",

      normalBalance:
        initialValues?.normalBalance ?? "",

      parentAccountId:
        initialValues?.parentAccountId ?? "",

      description:
        initialValues?.description ?? "",

      status:
        initialValues?.status ?? "active",
    },
  });

  async function onSubmit(
    values: ChartAccountFormValues,
  ) {
    setServerError("");
    setSuccessMessage("");

    try {
      const payload = {
        accountCode: values.accountCode,
        accountName: values.accountName,
        accountCategory:
          values.accountCategory,
        normalBalance:
          values.normalBalance,

        parentAccountId:
          values.parentAccountId || undefined,

        description:
          values.description || undefined,

        ...(mode === "edit"
          ? {
              status: values.status,
            }
          : {}),
      };

      // Temporary frontend testing.
      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        mode,
        chartAccountId,
        payload,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Account updated successfully."
          : "Account created successfully.",
      );

      window.setTimeout(() => {
        router.push(
          "/bank/chart-of-accounts",
        );
        router.refresh();
      }, 800);
    } catch {
      setServerError(
        "Unable to save the account. Please try again.",
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
      <div>
        <h2 className="text-lg font-bold">
          Account information
        </h2>

        <p className="mt-1 text-xs text-muted">
          Enter the financial account details and
          classification.
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

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField
          label="Account code"
          htmlFor="accountCode"
          required
          error={errors.accountCode?.message}
        >
          <input
            id="accountCode"
            type="text"
            placeholder="Enter account code"
            {...register("accountCode")}
            className={getInputClass(
              Boolean(errors.accountCode),
            )}
          />
        </FormField>

        <FormField
          label="Account name"
          htmlFor="accountName"
          required
          error={errors.accountName?.message}
        >
          <input
            id="accountName"
            type="text"
            placeholder="Enter account name"
            {...register("accountName")}
            className={getInputClass(
              Boolean(errors.accountName),
            )}
          />
        </FormField>

        <FormField
          label="Account category"
          htmlFor="accountCategory"
          required
          error={
            errors.accountCategory?.message
          }
        >
          <select
            id="accountCategory"
            {...register("accountCategory")}
            className={getInputClass(
              Boolean(
                errors.accountCategory,
              ),
            )}
          >
            <option value="" disabled>
              Select account category
            </option>

            <option value="asset">
              Asset
            </option>

            <option value="liability">
              Liability
            </option>

            <option value="equity">
              Equity
            </option>

            <option value="revenue">
              Revenue
            </option>

            <option value="expense">
              Expense
            </option>
          </select>
        </FormField>

        <FormField
          label="Normal balance"
          htmlFor="normalBalance"
          required
          error={
            errors.normalBalance?.message
          }
        >
          <select
            id="normalBalance"
            {...register("normalBalance")}
            className={getInputClass(
              Boolean(errors.normalBalance),
            )}
          >
            <option value="" disabled>
              Select normal balance
            </option>

            <option value="debit">
              Debit
            </option>

            <option value="credit">
              Credit
            </option>
          </select>
        </FormField>

        <FormField
          label="Parent account"
          htmlFor="parentAccountId"
          error={
            errors.parentAccountId?.message
          }
        >
          <select
            id="parentAccountId"
            {...register("parentAccountId")}
            className={getInputClass(
              Boolean(
                errors.parentAccountId,
              ),
            )}
          >
            <option value="">
              Select parent account (optional)
            </option>

            {parentAccounts.map(
              (account) => (
                <option
                  key={account.id}
                  value={account.id}
                >
                  {account.code} —{" "}
                  {account.name}
                </option>
              ),
            )}
          </select>
        </FormField>

        {mode === "edit" && (
          <FormField
            label="Status"
            htmlFor="status"
            required
            error={errors.status?.message}
          >
            <select
              id="status"
              {...register("status")}
              className={getInputClass(
                Boolean(errors.status),
              )}
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </FormField>
        )}

        <div className="sm:col-span-2">
          <FormField
            label="Description"
            htmlFor="description"
            error={
              errors.description?.message
            }
          >
            <textarea
              id="description"
              rows={5}
              placeholder="Enter account description (optional)"
              {...register("description")}
              className={`
                ${getInputClass(
                  Boolean(
                    errors.description,
                  ),
                )}
                h-auto resize-none py-3
              `}
            />
          </FormField>
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
            transition
            hover:bg-surface-secondary
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
              ? "Update account"
              : "Create account"}
        </button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({
  label,
  htmlFor,
  required = false,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-black"
      >
        {label}

        {required && (
          <span className="ml-1 text-danger">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function getInputClass(
  hasError: boolean,
) {
  return `
    mt-2 h-11 w-full rounded-xl border
    bg-white px-4 text-sm text-black
    placeholder:text-gray-500
    outline-none transition
    focus:border-primary
    focus:ring-4 focus:ring-primary/10
    ${
      hasError
        ? "border-red-300"
        : "border-border"
    }
  `;
}