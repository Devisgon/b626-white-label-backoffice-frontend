"use client";

import { Building2, CreditCard, Save, WalletCards } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import {
  bankAccountSchema,
  type BankAccountFormValues,
} from "@/features/banking/schemas";

interface BankAccountFormProps {
  mode?: "create" | "edit";
  bankAccountId?: string;
  initialValues?: Partial<BankAccountFormValues>;
}

export function BankAccountForm({
  mode = "create",
  bankAccountId,
  initialValues,
}: BankAccountFormProps) {
  const router = useRouter();

  const [accountName, setAccountName] = useState(
    initialValues?.accountName ?? "",
  );

  const [institution, setInstitution] = useState(
    initialValues?.institution ?? "",
  );

  const [accountType, setAccountType] = useState(
    initialValues?.accountType ?? "",
  );

  const [lastFour, setLastFour] = useState(initialValues?.lastFour ?? "");

  const [openingBalance, setOpeningBalance] = useState(
    String(initialValues?.openingBalance ?? 0),
  );

  const [openingDate, setOpeningDate] = useState(
    initialValues?.openingDate ?? "",
  );

  const [status, setStatus] = useState<"active" | "inactive" | "closed">(
    initialValues?.status ?? "active",
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});
    setServerError("");
    setSuccessMessage("");

    const values = {
      accountName,
      institution,
      accountType,
      lastFour,
      openingBalance: Number(openingBalance),
      openingDate,
      status,
    };

    const result = bankAccountSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0] ?? "form");

        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });

      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload =
        mode === "create"
          ? {
              accountName: result.data.accountName,
              institution: result.data.institution,
              accountType: result.data.accountType,
              lastFour: result.data.lastFour,
              openingBalance: result.data.openingBalance,
              openingDate: result.data.openingDate,
            }
          : result.data;

      /*
       * Temporary frontend testing.
       *
       * Backend integration:
       *
       * Create:
       * await createBankAccount(payload);
       *
       * Edit:
       * await updateBankAccount(
       *   bankAccountId,
       *   payload,
       * );
       */

      console.log({
        mode,
        bankAccountId,
        payload,
      });

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      setSuccessMessage(
        mode === "edit"
          ? "Bank account updated successfully."
          : "Bank account created successfully.",
      );

      window.setTimeout(() => {
        router.push("/bank/accounts");
        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to save the bank account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="
        rounded-2xl border border-border
        bg-white p-5 shadow-[var(--shadow-sm)]
        sm:p-6
      "
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex size-10 items-center
            justify-center rounded-xl
            bg-primary-light text-primary
          "
        >
          <Building2 className="size-4" />
        </span>

        <div>
          <h2 className="text-lg font-bold">Bank account information</h2>

          <p className="mt-1 text-xs text-muted">
            Enter the bank account and opening balance details.
          </p>
        </div>
      </div>

      {serverError && <Message type="error" message={serverError} />}

      {successMessage && <Message type="success" message={successMessage} />}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          id="account-name"
          label="Account name"
          value={accountName}
          onChange={setAccountName}
          placeholder="For example: Main Operating Account"
          error={errors.accountName}
          icon={<WalletCards className="size-4" />}
        />

        <TextField
          id="institution"
          label="Institution"
          value={institution}
          onChange={setInstitution}
          placeholder="For example: HBL"
          error={errors.institution}
          icon={<Building2 className="size-4" />}
        />

        <div>
          <label htmlFor="account-type" className="text-sm font-semibold">
            Account type <span className="text-danger">*</span>
          </label>

          <select
            id="account-type"
            value={accountType}
            onChange={(event) =>
              setAccountType(
                event.target.value as
                  "" | "checking" | "savings" | "cash" | "credit",
              )
            }
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.accountType ? "border-red-300" : "border-border"}
            `}
          >
            <option value="">Select account type</option>

            <option value="checking">Checking</option>

            <option value="savings">Savings</option>

            <option value="cash">Cash</option>

            <option value="credit">Credit</option>
          </select>

          <FieldError message={errors.accountType} />
        </div>

        <TextField
          id="last-four"
          label="Last 4 digits"
          value={lastFour}
          onChange={(value) =>
            setLastFour(value.replace(/\D/g, "").slice(0, 4))
          }
          placeholder="For example: 2343"
          error={errors.lastFour}
          icon={<CreditCard className="size-4" />}
          inputMode="numeric"
          maxLength={4}
        />

        <div>
          <label htmlFor="opening-balance" className="text-sm font-semibold">
            Opening balance <span className="text-danger">*</span>
          </label>

          <div className="relative mt-2">
            <span
              className="
                pointer-events-none absolute
                left-4 top-1/2
                -translate-y-1/2
                text-xs font-semibold text-muted
              "
            >
              PKR
            </span>

            <input
              id="opening-balance"
              type="number"
              min="0"
              step="0.01"
              value={openingBalance}
              onChange={(event) => setOpeningBalance(event.target.value)}
              className={`
                h-11 w-full rounded-xl border
                bg-white pl-14 pr-4 text-sm
                outline-none transition
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                ${errors.openingBalance ? "border-red-300" : "border-border"}
              `}
            />
          </div>

          <FieldError message={errors.openingBalance} />
        </div>

        <div>
          <label htmlFor="opening-date" className="text-sm font-semibold">
            Opening date <span className="text-danger">*</span>
          </label>

          <input
            id="opening-date"
            type="date"
            value={openingDate}
            onChange={(event) => setOpeningDate(event.target.value)}
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.openingDate ? "border-red-300" : "border-border"}
            `}
          />

          <FieldError message={errors.openingDate} />
        </div>

        {mode === "edit" && (
          <div className="sm:col-span-2">
            <label htmlFor="account-status" className="text-sm font-semibold">
              Account status <span className="text-danger">*</span>
            </label>

            <select
              id="account-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as "active" | "inactive" | "closed",
                )
              }
              className="
                mt-2 h-11 w-full rounded-xl
                border border-border bg-white
                px-4 text-sm outline-none
                transition focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              "
            >
              <option value="active">Active</option>

              <option value="inactive">Inactive</option>

              <option value="closed">Closed</option>
            </select>
          </div>
        )}
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
              ? "Update account"
              : "Create account"}
        </button>
      </div>
    </form>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  icon: React.ReactNode;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  icon,
  inputMode,
  maxLength,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label} <span className="text-danger">*</span>
      </label>

      <div className="relative mt-2">
        <span
          className="
            pointer-events-none absolute
            left-4 top-1/2 flex
            -translate-y-1/2 text-muted
          "
        >
          {icon}
        </span>

        <input
          id={id}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          className={`
            h-11 w-full rounded-xl border
            bg-white pl-11 pr-4 text-sm
            outline-none transition
            focus:border-primary
            focus:ring-4 focus:ring-primary/10
            ${error ? "border-red-300" : "border-border"}
          `}
        />
      </div>

      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1.5 text-xs text-danger">{message}</p>;
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
        mt-6 rounded-xl border px-4 py-3
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
