"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  payeeSchema,
  type PayeeFormInput,
  type PayeeFormValues,
} from "@/features/banking/schemas";

interface PayeeFormProps {
  mode?: "create" | "edit";
  payeeId?: string;
  initialValues?: Partial<PayeeFormValues>;
}

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

export function PayeeForm({
  mode = "create",
  payeeId,
  initialValues,
}: PayeeFormProps) {
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
    PayeeFormInput,
    unknown,
    PayeeFormValues
  >({
    resolver: zodResolver(payeeSchema),

    defaultValues: {
      payeeName:
        initialValues?.payeeName ?? "",

      payeeType:
        initialValues?.payeeType ?? "",

      email:
        initialValues?.email ?? "",

      phone:
        initialValues?.phone ?? "",

      addressLine1:
        initialValues?.addressLine1 ?? "",

      addressLine2:
        initialValues?.addressLine2 ?? "",

      city:
        initialValues?.city ?? "",

      state:
        initialValues?.state ?? "",

      postalCode:
        initialValues?.postalCode ?? "",

      country:
        initialValues?.country ?? "",

      taxId:
        initialValues?.taxId ?? "",

      defaultAccountId:
        initialValues?.defaultAccountId ?? "",

      notes:
        initialValues?.notes ?? "",

      status:
        initialValues?.status ?? "active",
    },
  });

  async function onSubmit(
    values: PayeeFormValues,
  ) {
    setServerError("");
    setSuccessMessage("");

    try {
      const payload = {
        payeeName: values.payeeName,
        payeeType: values.payeeType,

        email:
          values.email || undefined,

        phone:
          values.phone || undefined,

        addressLine1:
          values.addressLine1 || undefined,

        addressLine2:
          values.addressLine2 || undefined,

        city:
          values.city || undefined,

        state:
          values.state || undefined,

        postalCode:
          values.postalCode || undefined,

        country:
          values.country || undefined,

        taxId:
          values.taxId || undefined,

        defaultAccountId:
          values.defaultAccountId || undefined,

        notes:
          values.notes || undefined,

        ...(mode === "edit"
          ? {
              status: values.status,
            }
          : {}),
      };

      // Temporary frontend testing.
      // Backend integration par API call yahan hogi.
      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        mode,
        payeeId,
        payload,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Payee updated successfully."
          : "Payee created successfully.",
      );

      window.setTimeout(() => {
        router.push("/bank/payees");
        router.refresh();
      }, 800);
    } catch {
      setServerError(
        "Unable to save the payee. Please try again.",
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
          Payee information
        </h2>

        <p className="mt-1 text-xs text-muted">
          Enter the payee, contact, address and
          payment details.
        </p>
      </div>

      {serverError && (
        <Message
          type="error"
          message={serverError}
        />
      )}

      {successMessage && (
        <Message
          type="success"
          message={successMessage}
        />
      )}

      <section className="mt-7">
        <SectionTitle
          title="Basic information"
          description="General payee details and classification."
        />

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField
            label="Payee name"
            htmlFor="payeeName"
            required
            error={errors.payeeName?.message}
          >
            <input
              id="payeeName"
              type="text"
              placeholder="Enter payee name"
              {...register("payeeName")}
              className={getInputClass(
                Boolean(errors.payeeName),
              )}
            />
          </FormField>

          <FormField
            label="Payee type"
            htmlFor="payeeType"
            required
            error={errors.payeeType?.message}
          >
            <select
              id="payeeType"
              {...register("payeeType")}
              className={getInputClass(
                Boolean(errors.payeeType),
              )}
            >
              <option value="" disabled>
                Select payee type
              </option>

              <option value="vendor">
                Vendor
              </option>

              <option value="supplier">
                Supplier
              </option>

              <option value="individual">
                Individual
              </option>

              <option value="utility">
                Utility
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </FormField>

          <FormField
            label="Email address"
            htmlFor="email"
            error={errors.email?.message}
          >
            <input
              id="email"
              type="email"
              placeholder="Enter email address (optional)"
              {...register("email")}
              className={getInputClass(
                Boolean(errors.email),
              )}
            />
          </FormField>

          <FormField
            label="Phone number"
            htmlFor="phone"
            error={errors.phone?.message}
          >
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number (optional)"
              {...register("phone")}
              className={getInputClass(
                Boolean(errors.phone),
              )}
            />
          </FormField>
        </div>
      </section>

      <section className="mt-8 border-t border-border pt-7">
        <SectionTitle
          title="Address"
          description="Optional postal and location information."
        />

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              label="Address line 1"
              htmlFor="addressLine1"
              error={
                errors.addressLine1?.message
              }
            >
              <input
                id="addressLine1"
                type="text"
                placeholder="Enter street address (optional)"
                {...register("addressLine1")}
                className={getInputClass(
                  Boolean(
                    errors.addressLine1,
                  ),
                )}
              />
            </FormField>
          </div>

          <div className="sm:col-span-2">
            <FormField
              label="Address line 2"
              htmlFor="addressLine2"
              error={
                errors.addressLine2?.message
              }
            >
              <input
                id="addressLine2"
                type="text"
                placeholder="Enter additional address (optional)"
                {...register("addressLine2")}
                className={getInputClass(
                  Boolean(
                    errors.addressLine2,
                  ),
                )}
              />
            </FormField>
          </div>

          <FormField
            label="City"
            htmlFor="city"
            error={errors.city?.message}
          >
            <input
              id="city"
              type="text"
              placeholder="Enter city (optional)"
              {...register("city")}
              className={getInputClass(
                Boolean(errors.city),
              )}
            />
          </FormField>

          <FormField
            label="State or province"
            htmlFor="state"
            error={errors.state?.message}
          >
            <input
              id="state"
              type="text"
              placeholder="Enter state (optional)"
              {...register("state")}
              className={getInputClass(
                Boolean(errors.state),
              )}
            />
          </FormField>

          <FormField
            label="Postal code"
            htmlFor="postalCode"
            error={errors.postalCode?.message}
          >
            <input
              id="postalCode"
              type="text"
              placeholder="Enter postal code (optional)"
              {...register("postalCode")}
              className={getInputClass(
                Boolean(errors.postalCode),
              )}
            />
          </FormField>

          <FormField
            label="Country"
            htmlFor="country"
            error={errors.country?.message}
          >
            <input
              id="country"
              type="text"
              placeholder="Enter country (optional)"
              {...register("country")}
              className={getInputClass(
                Boolean(errors.country),
              )}
            />
          </FormField>
        </div>
      </section>

      <section className="mt-8 border-t border-border pt-7">
        <SectionTitle
          title="Payment information"
          description="Optional tax and preferred account settings."
        />

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <FormField
            label="Tax ID"
            htmlFor="taxId"
            error={errors.taxId?.message}
          >
            <input
              id="taxId"
              type="text"
              placeholder="Enter tax ID (optional)"
              {...register("taxId")}
              className={getInputClass(
                Boolean(errors.taxId),
              )}
            />
          </FormField>

          <FormField
            label="Default bank account"
            htmlFor="defaultAccountId"
            error={
              errors.defaultAccountId?.message
            }
          >
            <select
              id="defaultAccountId"
              {...register("defaultAccountId")}
              className={getInputClass(
                Boolean(
                  errors.defaultAccountId,
                ),
              )}
            >
              <option value="">
                Select bank account (optional)
              </option>

              {bankAccounts.map((account) => (
                <option
                  key={account.id}
                  value={account.id}
                >
                  {account.name} ••••{" "}
                  {account.lastFour}
                </option>
              ))}
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
              label="Notes"
              htmlFor="notes"
              error={errors.notes?.message}
            >
              <textarea
                id="notes"
                rows={5}
                placeholder="Enter additional notes (optional)"
                {...register("notes")}
                className={`
                  ${getInputClass(
                    Boolean(errors.notes),
                  )}
                  h-auto resize-none py-3
                `}
              />
            </FormField>
          </div>
        </div>
      </section>

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
              ? "Update payee"
              : "Create payee"}
        </button>
      </div>
    </form>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold">
        {title}
      </h3>

      <p className="mt-1 text-xs text-muted">
        {description}
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

function Message({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  return (
    <div
      role={
        type === "error"
          ? "alert"
          : "status"
      }
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