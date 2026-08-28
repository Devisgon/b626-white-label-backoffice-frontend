"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  transactionSchema,
  type TransactionFormInput,
  type TransactionFormValues,
} from "@/features/banking/schemas";

const bankAccounts = [
  {
    id: "1f83751c-54b1-4d50-85cd-100000000001",
    name: "HBL Main Operating",
    lastFour: "2343",
  },
  {
    id: "1f83751c-54b1-4d50-85cd-100000000002",
    name: "Meezan Business Savings",
    lastFour: "7812",
  },
  {
    id: "1f83751c-54b1-4d50-85cd-100000000003",
    name: "Petty Cash",
    lastFour: "0001",
  },
];

const payees = [
  {
    id: "3e28d5fa-97c2-4fa9-8000-100000000001",
    name: "Pakistan State Oil",
  },
  {
    id: "3e28d5fa-97c2-4fa9-8000-100000000002",
    name: "Nestle Pakistan",
  },
  {
    id: "3e28d5fa-97c2-4fa9-8000-100000000003",
    name: "Lahore Electric Supply Company",
  },
];

const ledgerAccounts = [
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
    name: "Owner Equity",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000004",
    code: "4000",
    name: "Sales Revenue",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000005",
    code: "5010",
    name: "Utilities Expense",
  },
];

function emptyLedgerLine() {
  return {
    accountId: "",
    lineType: "" as const,
    amount: "",
    description: "",
  };
}

export function TransactionForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormInput, unknown, TransactionFormValues>({
    resolver: zodResolver(transactionSchema),

    defaultValues: {
      transactionType: "",
      direction: "",
      transactionDate: "",
      bankAccountId: "",
      payeeId: "",
      referenceNumber: "",
      memo: "",
      amount: "",
      lines: [emptyLedgerLine(), emptyLedgerLine()],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lines",
  });

  const watchedLines = watch("lines") ?? [];

  const totals = useMemo(() => {
    return watchedLines.reduce(
      (result, line) => {
        const amount = Number(line.amount) || 0;

        if (line.lineType === "debit") {
          result.debits += amount;
        }

        if (line.lineType === "credit") {
          result.credits += amount;
        }

        return result;
      },
      {
        debits: 0,
        credits: 0,
      },
    );
  }, [watchedLines]);

  const difference = Math.abs(totals.debits - totals.credits);

  async function onSubmit(values: TransactionFormValues) {
    setServerError("");
    setSuccessMessage("");

    try {
      const payload = {
        transactionType: values.transactionType,

        direction: values.direction,

        transactionDate: values.transactionDate,

        bankAccountId: values.bankAccountId,

        payeeId: values.payeeId || undefined,

        referenceNumber: values.referenceNumber || undefined,

        memo: values.memo || undefined,

        amount: values.amount,

        lines: values.lines.map((line) => ({
          accountId: line.accountId,
          lineType: line.lineType,
          amount: line.amount,
          description: line.description || undefined,
        })),
      };

      // Temporary frontend testing.
      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log(payload);

      setSuccessMessage("Draft transaction created successfully.");

      window.setTimeout(() => {
        router.push("/bank/transactions");
        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to create the transaction. Please try again.");
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && <Message type="error" message={serverError} />}

      {successMessage && <Message type="success" message={successMessage} />}

      <section
        className="
          rounded-2xl border border-border
          bg-white p-5 shadow-[var(--shadow-sm)]
          sm:p-6
        "
      >
        <div>
          <h2 className="text-lg font-bold">Transaction information</h2>

          <p className="mt-1 text-xs text-muted">
            Enter the transaction and payment details.
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField
            label="Transaction type"
            htmlFor="transactionType"
            required
            error={errors.transactionType?.message}
          >
            <select
              id="transactionType"
              {...register("transactionType")}
              className={getInputClass(Boolean(errors.transactionType))}
            >
              <option value="" disabled>
                Select transaction type
              </option>

              <option value="deposit">Deposit</option>

              <option value="payment">Payment</option>

              <option value="adjustment">Adjustment</option>
            </select>
          </FormField>

          <FormField
            label="Direction"
            htmlFor="direction"
            required
            error={errors.direction?.message}
          >
            <select
              id="direction"
              {...register("direction")}
              className={getInputClass(Boolean(errors.direction))}
            >
              <option value="" disabled>
                Select direction
              </option>

              <option value="inflow">Inflow</option>

              <option value="outflow">Outflow</option>
            </select>
          </FormField>

          <FormField
            label="Transaction date"
            htmlFor="transactionDate"
            required
            error={errors.transactionDate?.message}
          >
            <input
              id="transactionDate"
              type="date"
              {...register("transactionDate")}
              className={getInputClass(Boolean(errors.transactionDate))}
            />
          </FormField>

          <FormField
            label="Amount"
            htmlFor="amount"
            required
            error={errors.amount?.message}
          >
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              {...register("amount")}
              className={getInputClass(Boolean(errors.amount))}
            />
          </FormField>

          <FormField
            label="Bank account"
            htmlFor="bankAccountId"
            required
            error={errors.bankAccountId?.message}
          >
            <select
              id="bankAccountId"
              {...register("bankAccountId")}
              className={getInputClass(Boolean(errors.bankAccountId))}
            >
              <option value="" disabled>
                Select bank account
              </option>

              {bankAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} •••• {account.lastFour}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Payee"
            htmlFor="payeeId"
            error={errors.payeeId?.message}
          >
            <select
              id="payeeId"
              {...register("payeeId")}
              className={getInputClass(Boolean(errors.payeeId))}
            >
              <option value="">Select payee (optional)</option>

              {payees.map((payee) => (
                <option key={payee.id} value={payee.id}>
                  {payee.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Reference number"
            htmlFor="referenceNumber"
            error={errors.referenceNumber?.message}
          >
            <input
              id="referenceNumber"
              type="text"
              placeholder="Enter reference number (optional)"
              {...register("referenceNumber")}
              className={getInputClass(Boolean(errors.referenceNumber))}
            />
          </FormField>

          <div className="sm:col-span-2">
            <FormField label="Memo" htmlFor="memo" error={errors.memo?.message}>
              <textarea
                id="memo"
                rows={4}
                placeholder="Enter transaction memo (optional)"
                {...register("memo")}
                className={`
                  ${getInputClass(Boolean(errors.memo))}
                  h-auto resize-none py-3
                `}
              />
            </FormField>
          </div>
        </div>
      </section>

      <section
        className="
          rounded-2xl border border-border
          bg-white shadow-[var(--shadow-sm)]
        "
      >
        <div
          className="
            flex flex-col justify-between gap-4
            border-b border-border p-5
            sm:flex-row sm:items-center
          "
        >
          <div>
            <h2 className="font-bold">Ledger lines</h2>

            <p className="mt-1 text-xs text-muted">
              Total debits must equal total credits.
            </p>
          </div>

          <button
            type="button"
            onClick={() => append(emptyLedgerLine())}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-4 text-sm
              font-semibold text-primary
              transition hover:bg-primary
              hover:text-white
            "
          >
            <Plus className="size-4" />
            Add line
          </button>
        </div>

        <div className="space-y-4 p-5">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="
                grid gap-4 rounded-xl
                border border-border p-4
                lg:grid-cols-[minmax(180px,1.4fr)_140px_160px_minmax(180px,1fr)_40px]
                lg:items-start
              "
            >
              <FormField
                label="Ledger account"
                htmlFor={`lines.${index}.accountId`}
                required
                error={errors.lines?.[index]?.accountId?.message}
              >
                <select
                  id={`lines.${index}.accountId`}
                  {...register(`lines.${index}.accountId`)}
                  className={getInputClass(
                    Boolean(errors.lines?.[index]?.accountId),
                  )}
                >
                  <option value="" disabled>
                    Select account
                  </option>

                  {ledgerAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.code} — {account.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Line type"
                htmlFor={`lines.${index}.lineType`}
                required
                error={errors.lines?.[index]?.lineType?.message}
              >
                <select
                  id={`lines.${index}.lineType`}
                  {...register(`lines.${index}.lineType`)}
                  className={getInputClass(
                    Boolean(errors.lines?.[index]?.lineType),
                  )}
                >
                  <option value="" disabled>
                    Select
                  </option>

                  <option value="debit">Debit</option>

                  <option value="credit">Credit</option>
                </select>
              </FormField>

              <FormField
                label="Amount"
                htmlFor={`lines.${index}.amount`}
                required
                error={errors.lines?.[index]?.amount?.message}
              >
                <input
                  id={`lines.${index}.amount`}
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Amount"
                  {...register(`lines.${index}.amount`)}
                  className={getInputClass(
                    Boolean(errors.lines?.[index]?.amount),
                  )}
                />
              </FormField>

              <FormField
                label="Description"
                htmlFor={`lines.${index}.description`}
                error={errors.lines?.[index]?.description?.message}
              >
                <input
                  id={`lines.${index}.description`}
                  type="text"
                  placeholder="Description (optional)"
                  {...register(`lines.${index}.description`)}
                  className={getInputClass(
                    Boolean(errors.lines?.[index]?.description),
                  )}
                />
              </FormField>

              <button
                type="button"
                onClick={() => remove(index)}
                disabled={fields.length <= 1}
                aria-label={`Remove ledger line ${index + 1}`}
                className="
                  mt-7 flex size-10 items-center
                  justify-center rounded-xl
                  border border-border text-muted
                  transition hover:border-red-200
                  hover:bg-red-50 hover:text-red-600
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}

          {errors.lines?.root?.message && (
            <p className="text-sm font-medium text-danger">
              {errors.lines.root.message}
            </p>
          )}

          <div
            className="
    grid gap-3 rounded-xl
    bg-surface-secondary p-4
    text-sm sm:grid-cols-3
  "
          >
            <TotalItem label="Total debits" value={totals.debits} />

            <TotalItem label="Total credits" value={totals.credits} />

            <TotalItem
              label="Difference"
              value={difference}
              highlight={difference > 0}
            />
          </div>
        </div>
      </section>

      <div
        className="
          flex flex-col-reverse gap-3
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

          {isSubmitting ? "Saving..." : "Create draft transaction"}
        </button>
      </div>
    </form>
  );
}

function TotalItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>

      <p
        className={`
          mt-1 font-bold
          ${highlight ? "text-danger" : "text-foreground"}
        `}
      >
        PKR{" "}
        {value.toLocaleString("en-PK", {
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
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
      <label htmlFor={htmlFor} className="text-sm font-semibold text-black">
        {label}

        {required && <span className="ml-1 text-danger">*</span>}
      </label>

      {children}

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

function Message({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`
        rounded-xl border px-4 py-3
        text-sm font-medium
        ${
          type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-red-200 bg-red-50 text-red-700"
        }
      `}
    >
      {message}
    </div>
  );
}

function getInputClass(hasError: boolean) {
  return `
    mt-2 h-11 w-full rounded-xl border
    bg-white px-4 text-sm text-black
    placeholder:text-gray-500
    outline-none transition
    focus:border-primary
    focus:ring-4 focus:ring-primary/10
    ${hasError ? "border-red-300" : "border-border"}
  `;
}
