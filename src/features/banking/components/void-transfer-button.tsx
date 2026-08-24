"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ban,
  X,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  voidTransferSchema,
  type VoidTransferFormValues,
} from "@/features/banking/schemas";

interface VoidTransferButtonProps {
  transferId: string;
  disabled?: boolean;
}

export function VoidTransferButton({
  transferId,
  disabled = false,
}: VoidTransferButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<VoidTransferFormValues>({
    resolver: zodResolver(voidTransferSchema),
    defaultValues: {
      voidReason: "",
    },
  });

  function closeDialog() {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
    setServerError("");
    reset();
  }

  async function onSubmit(
    values: VoidTransferFormValues,
  ) {
    setServerError("");

    try {
      /*
       * Temporary frontend testing.
       *
       * Backend integration par:
       *
       * await voidTransfer(transferId, {
       *   voidReason: values.voidReason,
       * });
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        transferId,
        voidReason: values.voidReason,
      });

      window.alert(
        "Transfer has been prepared for voiding.",
      );

      closeDialog();
      router.refresh();
    } catch {
      setServerError(
        "Unable to void the transfer. Please try again.",
      );
    }
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(true)}
        className="
          inline-flex h-10 items-center
          justify-center gap-2 rounded-xl
          border border-border bg-white px-4
          text-sm font-semibold text-muted
          transition hover:border-primary
          hover:bg-primary hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
          disabled:hover:border-border
          disabled:hover:bg-white
          disabled:hover:text-muted
        "
      >
        <Ban className="size-4" />

        {disabled
          ? "Transfer voided"
          : "Void transfer"}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="void-transfer-title"
          className="
            fixed inset-0 z-50 flex items-center
            justify-center bg-black/40 p-4
            backdrop-blur-[2px]
          "
        >
          <div
            className="
              w-full max-w-md rounded-2xl
              border border-border bg-white
              shadow-[var(--shadow-lg)]
            "
          >
            <div
              className="
                flex items-start justify-between
                gap-4 border-b border-border p-5
              "
            >
              <div>
                <h2
                  id="void-transfer-title"
                  className="font-bold"
                >
                  Void transfer
                </h2>

                <p className="mt-1 text-xs leading-5 text-muted">
                  This will reverse both sides of the
                  transfer. A reason is required.
                </p>
              </div>

              <button
                type="button"
                onClick={closeDialog}
                disabled={isSubmitting}
                aria-label="Close dialog"
                className="
                  flex size-9 shrink-0 items-center
                  justify-center rounded-xl
                  text-muted transition
                  hover:bg-surface-secondary
                  hover:text-foreground
                "
              >
                <X className="size-4" />
              </button>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="p-5"
            >
              {serverError && (
                <div
                  role="alert"
                  className="
                    mb-5 rounded-xl border
                    border-red-200 bg-red-50
                    px-4 py-3 text-sm font-medium
                    text-red-700
                  "
                >
                  {serverError}
                </div>
              )}

              <div>
                <label
                  htmlFor="voidReason"
                  className="text-sm font-semibold"
                >
                  Void reason{" "}
                  <span className="text-danger">
                    *
                  </span>
                </label>

                <textarea
                  id="voidReason"
                  rows={4}
                  placeholder="Explain why this transfer needs to be voided..."
                  {...register("voidReason")}
                  className={`
                    mt-2 w-full resize-none
                    rounded-xl border bg-white
                    px-4 py-3 text-sm
                    text-foreground outline-none
                    transition focus:border-primary
                    focus:ring-4
                    focus:ring-primary/10
                    ${
                      errors.voidReason
                        ? "border-red-300"
                        : "border-border"
                    }
                  `}
                />

                {errors.voidReason?.message && (
                  <p className="mt-1.5 text-xs text-danger">
                    {errors.voidReason.message}
                  </p>
                )}
              </div>

              <div
                className="
                  mt-6 flex flex-col-reverse
                  gap-3 border-t border-border
                  pt-5 sm:flex-row sm:justify-end
                "
              >
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={isSubmitting}
                  className="
                    inline-flex h-10 items-center
                    justify-center rounded-xl
                    border border-border bg-white
                    px-4 text-sm font-semibold
                    text-muted transition
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
                    inline-flex h-10 items-center
                    justify-center gap-2 rounded-xl
                    bg-primary px-4 text-sm
                    font-semibold text-white
                    transition hover:bg-primary-hover
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <Ban className="size-4" />

                  {isSubmitting
                    ? "Voiding..."
                    : "Confirm void"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}