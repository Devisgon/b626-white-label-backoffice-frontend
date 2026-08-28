"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightLeft, CalendarDays, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  transferSchema,
  type TransferFormInput,
  type TransferFormValues,
} from "@/features/banking/schemas";

// Temporary options for frontend testing.
// Backend integration par ye API se fetch hongi.
const bankAccountOptions = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "HBL Main Operating Account",
    helper: "**** 2343",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Meezan Business Account",
    helper: "**** 7812",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "UBL Petty Cash Account",
    helper: "**** 4590",
  },
];

const clearingAccountOptions = [
  {
    id: "44444444-4444-4444-8444-444444444444",
    name: "Bank Transfer Clearing",
    code: "1050",
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    name: "General Clearing Account",
    code: "1060",
  },
];

export function TransferForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormInput, unknown, TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      sourceAccountId: "",
      destinationAccountId: "",
      amount: "",
      transferDate: "",
      transferClearingAccountId: "",
      memo: "",
    },
  });

  const selectedSourceAccountId = watch("sourceAccountId");

  async function onSubmit(values: TransferFormValues) {
    setServerError("");
    setSuccessMessage("");

    try {
      /*
       * Temporary frontend testing.
       *
       * Backend integration par:
       *
       * await createTransfer({
       *   sourceAccountId:
       *     values.sourceAccountId,
       *   destinationAccountId:
       *     values.destinationAccountId,
       *   amount: values.amount,
       *   transferDate: values.transferDate,
       *   transferClearingAccountId:
       *     values.transferClearingAccountId,
       *   memo: values.memo || undefined,
       * });
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log("Transfer submitted:", values);

      setSuccessMessage("Transfer created successfully.");

      window.setTimeout(() => {
        router.push("/bank/transfers");
        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to create the transfer. Please try again.");
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
          <ArrowRightLeft className="size-5" />
        </span>

        <div>
          <h2 className="text-lg font-bold">Transfer information</h2>

          <p className="mt-1 text-xs text-muted">
            Enter the accounts, amount and transfer details.
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

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sourceAccountId" className="text-sm font-semibold">
            Source bank account <span className="text-danger">*</span>
          </label>

          <select
            id="sourceAccountId"
            {...register("sourceAccountId")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.sourceAccountId ? "border-red-300" : "border-border"}
            `}
          >
            <option value="">Select source account</option>

            {bankAccountOptions.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} — {account.helper}
              </option>
            ))}
          </select>

          {errors.sourceAccountId?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.sourceAccountId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="destinationAccountId"
            className="text-sm font-semibold"
          >
            Destination bank account <span className="text-danger">*</span>
          </label>

          <select
            id="destinationAccountId"
            {...register("destinationAccountId")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${
                errors.destinationAccountId ? "border-red-300" : "border-border"
              }
            `}
          >
            <option value="">Select destination account</option>

            {bankAccountOptions.map((account) => (
              <option
                key={account.id}
                value={account.id}
                disabled={account.id === selectedSourceAccountId}
              >
                {account.name} — {account.helper}
              </option>
            ))}
          </select>

          {errors.destinationAccountId?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.destinationAccountId.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="text-sm font-semibold">
            Transfer amount <span className="text-danger">*</span>
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
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              {...register("amount")}
              className={`
                h-11 w-full rounded-xl border
                bg-white pl-14 pr-4 text-sm
                text-foreground outline-none transition
                focus:border-primary
                focus:ring-4 focus:ring-primary/10
                ${errors.amount ? "border-red-300" : "border-border"}
              `}
            />
          </div>

          {errors.amount?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.amount.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="transferDate" className="text-sm font-semibold">
            Transfer date <span className="text-danger">*</span>
          </label>

          <div className="relative mt-2">
            <CalendarDays
              className="
                pointer-events-none absolute left-4
                top-1/2 size-4 -translate-y-1/2
                text-muted
              "
            />

            <input
              id="transferDate"
              type="date"
              {...register("transferDate")}
              className={`
                h-11 w-full rounded-xl border
                bg-white pl-11 pr-4 text-sm
                text-foreground outline-none transition
                focus:border-primary
                focus:ring-4 focus:ring-primary/10
                ${errors.transferDate ? "border-red-300" : "border-border"}
              `}
            />
          </div>

          {errors.transferDate?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.transferDate.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="transferClearingAccountId"
            className="text-sm font-semibold"
          >
            Transfer clearing account <span className="text-danger">*</span>
          </label>

          <select
            id="transferClearingAccountId"
            {...register("transferClearingAccountId")}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm text-foreground
              outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${
                errors.transferClearingAccountId
                  ? "border-red-300"
                  : "border-border"
              }
            `}
          >
            <option value="">Select clearing account</option>

            {clearingAccountOptions.map((account) => (
              <option key={account.id} value={account.id}>
                {account.code} — {account.name}
              </option>
            ))}
          </select>

          {errors.transferClearingAccountId?.message && (
            <p className="mt-1.5 text-xs text-danger">
              {errors.transferClearingAccountId.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="memo" className="text-sm font-semibold">
            Memo
          </label>

          <textarea
            id="memo"
            rows={4}
            placeholder="Add an optional note for this transfer..."
            {...register("memo")}
            className={`
              mt-2 w-full resize-none rounded-xl
              border bg-white px-4 py-3 text-sm
              text-foreground outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.memo ? "border-red-300" : "border-border"}
            `}
          />

          {errors.memo?.message && (
            <p className="mt-1.5 text-xs text-danger">{errors.memo.message}</p>
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

          {isSubmitting ? "Creating transfer..." : "Create transfer"}
        </button>
      </div>
    </form>
  );
}
