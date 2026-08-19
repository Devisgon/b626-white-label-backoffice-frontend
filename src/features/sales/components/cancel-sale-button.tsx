"use client";

import { useState } from "react";
import {
  Ban,
  LoaderCircle,
  X,
} from "lucide-react";

interface CancelSaleButtonProps {
  saleId: string;
  saleNumber: string;
}

export function CancelSaleButton({
  saleId,
  saleNumber,
}: CancelSaleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const isValid = reason.trim().length >= 5;

  function closeModal() {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
    setReason("");
  }

  async function handleCancelSale() {
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    /*
     * Temporary frontend testing.
     * Backend connect honay par deleteSale(saleId)
     * API call hogi.
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    setIsSubmitting(false);
    setIsOpen(false);
    setReason("");

    window.alert(
      `${saleNumber} has been marked for cancellation.\nRecord ID: ${saleId}`,
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          inline-flex h-10 items-center justify-center
          gap-2 rounded-xl border border-border
          bg-white px-4 text-sm font-semibold
          text-muted transition
          hover:border-red-200 hover:bg-red-50
          hover:text-danger
        "
      >
        <Ban className="size-4" />
        Cancel sale
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-sale-title"
          className="
            fixed inset-0 z-[100] flex items-center
            justify-center bg-black/40 p-4
            backdrop-blur-sm
          "
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-white shadow-[var(--shadow-lg)]">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-danger">
                  <Ban className="size-5" />
                </span>

                <div>
                  <h2
                    id="cancel-sale-title"
                    className="font-bold"
                  >
                    Cancel sale
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    {saleNumber}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="
                  flex size-9 items-center justify-center
                  rounded-lg text-muted transition
                  hover:bg-surface-secondary
                  hover:text-foreground
                "
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm leading-6 text-muted">
                Cancelling this sale will remove it from
                completed sales and update its status.
              </p>

              <div className="mt-5">
                <label
                  htmlFor="cancellation-reason"
                  className="text-xs font-semibold"
                >
                  Cancellation reason
                </label>

                <textarea
                  id="cancellation-reason"
                  rows={4}
                  value={reason}
                  onChange={(event) =>
                    setReason(event.target.value)
                  }
                  placeholder="Enter the reason for cancellation..."
                  className="
                    mt-2 w-full resize-none rounded-xl
                    border border-border bg-white p-3
                    text-sm outline-none transition
                    focus:border-primary
                    focus:ring-4 focus:ring-primary/10
                  "
                />

                <p className="mt-1 text-[10px] text-muted">
                  Minimum 5 characters required.
                </p>
              </div>

              <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
                Please review this action carefully before
                confirming the cancellation.
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border p-5">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="
                  h-10 rounded-xl border border-border
                  px-4 text-sm font-semibold text-muted
                  transition hover:bg-surface-secondary
                  disabled:opacity-50
                "
              >
                Keep sale
              </button>

              <button
                type="button"
                onClick={handleCancelSale}
                disabled={!isValid || isSubmitting}
                className="
                  inline-flex h-10 items-center
                  justify-center gap-2 rounded-xl
                  bg-danger px-4 text-sm font-semibold
                  text-white transition hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isSubmitting ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Ban className="size-4" />
                )}

                {isSubmitting
                  ? "Cancelling..."
                  : "Confirm cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}