"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarRange, Landmark, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  reconciliationSchema,
  type ReconciliationFormInput,
  type ReconciliationFormValues,
} from "@/features/banking/schemas";

// Temporary options for frontend testing.
// Backend integration par bank accounts API se aayenge.
const bankAccountOptions = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "HBL Main Operating Account",
    accountNumber: "**** 2343",
    currentBalance: 1850000,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Meezan Business Account",
    accountNumber: "**** 7812",
    currentBalance: 1325600,
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "UBL Petty Cash Account",
    accountNumber: "**** 4590",
    currentBalance: 110000,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ReconciliationForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReconciliationFormInput, unknown, ReconciliationFormValues>({
    resolver: zodResolver(reconciliationSchema),
    defaultValues: {
      bankAccountId: "",
      statementStartDate: "",
      statementEndDate: "",
      statementEndingBalance: "",
    },
  });

  const selectedBankAccountId = watch("bankAccountId");

  const selectedBankAccount = bankAccountOptions.find(
    (account) => account.id === selectedBankAccountId,
  );

  async function onSubmit(values: ReconciliationFormValues) {
    setServerError("");
    setSuccessMessage("");

    try {
      /*
       * Temporary frontend testing.
       *
       * Backend integration par:
       *
       * await createReconciliation({
       *   bankAccountId: values.bankAccountId,
       *   statementStartDate:
       *     values.statementStartDate,
       *   statementEndDate:
       *     values.statementEndDate,
       *   statementEndingBalance:
       *     values.statementEndingBalance,
       * });
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log("Reconciliation submitted:", values);

      setSuccessMessage("Reconciliation session started successfully.");

      window.setTimeout(() => {
        router.push("/bank/reconciliations");
        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to start the reconciliation. Please try again.");
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
          <CalendarRange className="size-5" />
        </span>

        <div>
          <h2 className="text-lg font-bold">Statement information</h2>

          <p className="mt-1 text-xs text-muted">
            Enter the bank statement period and ending balance.
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

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="bankAccountId" className="text-sm font-semibold">
            Bank account <span className="text-danger">*</span>
          </label>

          <select
            id="bankAccountId"
            {...register("bankAccountId")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.bankAccountId ? "border-red-300" : "border-border"}
            `}
          >
            <option value="">Select bank account</option>

            {bankAccountOptions.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} — {account.accountNumber}
              </option>
            ))}
          </select>

          {errors.bankAccountId?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.bankAccountId.message}
            </p>
          )}
        </div>

        {selectedBankAccount && (
          <div
            className="
              flex items-center gap-4 rounded-xl
              border border-border
              bg-surface-secondary p-4
            "
          >
            <span
              className="
                flex size-10 shrink-0 items-center
                justify-center rounded-xl
                bg-primary-light text-primary
              "
            >
              <Landmark className="size-4" />
            </span>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {selectedBankAccount.name}
              </p>

              <p className="mt-1 text-xs text-muted">
                Current system balance:{" "}
                {formatCurrency(selectedBankAccount.currentBalance)}
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="statementStartDate"
              className="text-sm font-semibold"
            >
              Statement start date <span className="text-danger">*</span>
            </label>

            <input
              id="statementStartDate"
              type="date"
              {...register("statementStartDate")}
              className={`
                mt-2 h-11 w-full rounded-xl
                border bg-white px-4 text-sm
                text-foreground outline-none
                transition focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                ${
                  errors.statementStartDate ? "border-red-300" : "border-border"
                }
              `}
            />

            {errors.statementStartDate?.message && (
              <p className="mt-1.5 text-xs text-danger">
                {errors.statementStartDate.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="statementEndDate" className="text-sm font-semibold">
              Statement end date <span className="text-danger">*</span>
            </label>

            <input
              id="statementEndDate"
              type="date"
              {...register("statementEndDate")}
              className={`
                mt-2 h-11 w-full rounded-xl
                border bg-white px-4 text-sm
                text-foreground outline-none
                transition focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                ${errors.statementEndDate ? "border-red-300" : "border-border"}
              `}
            />

            {errors.statementEndDate?.message && (
              <p className="mt-1.5 text-xs text-danger">
                {errors.statementEndDate.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="statementEndingBalance"
            className="text-sm font-semibold"
          >
            Statement ending balance <span className="text-danger">*</span>
          </label>

          <div className="relative mt-2">
            <span
              className="
                pointer-events-none absolute left-4
                top-1/2 -translate-y-1/2
                text-sm font-semibold text-muted
              "
            >
              PKR
            </span>

            <input
              id="statementEndingBalance"
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              {...register("statementEndingBalance")}
              className={`
                h-11 w-full rounded-xl border
                bg-white pl-14 pr-4 text-sm
                text-foreground outline-none
                transition focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                ${
                  errors.statementEndingBalance
                    ? "border-red-300"
                    : "border-border"
                }
              `}
            />
          </div>

          <p className="mt-1.5 text-xs text-muted">
            Enter the closing balance exactly as displayed on the bank
            statement.
          </p>

          {errors.statementEndingBalance?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.statementEndingBalance.message}
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

          {isSubmitting ? "Starting..." : "Start reconciliation"}
        </button>
      </div>
    </form>
  );
}
