"use client";

import { useState } from "react";
import {
  LoaderCircle,
  RotateCcw,
  X,
} from "lucide-react";

interface RestoreSaleButtonProps {
  saleId: string;
  saleNumber: string;
}

export function RestoreSaleButton({
  saleId,
  saleNumber,
}: RestoreSaleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleRestoreSale() {
    setIsSubmitting(true);

    /*
     * Temporary frontend testing.
     * Backend connect honay par restoreSale(saleId)
     * API call hogi.
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    setIsSubmitting(false);
    setIsOpen(false);

    window.alert(
      `${saleNumber} has been prepared for restoration.\nRecord ID: ${saleId}`,
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
          hover:border-primary hover:bg-primary-light
          hover:text-primary
        "
      >
        <RotateCcw className="size-4" />
        Restore sale
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="restore-sale-title"
          className="
            fixed inset-0 z-[100] flex items-center
            justify-center bg-black/40 p-4
            backdrop-blur-sm
          "
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-white shadow-[var(--shadow-lg)]">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <RotateCcw className="size-5" />
                </span>

                <div>
                  <h2
                    id="restore-sale-title"
                    className="font-bold"
                  >
                    Restore sale
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    {saleNumber}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
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
                This sale will be restored and returned to
                the active sales records.
              </p>

              <div className="mt-5 rounded-xl bg-primary-light px-4 py-3 text-xs leading-5 text-primary">
                Review the sale details before confirming
                restoration.
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border p-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="
                  h-10 rounded-xl border border-border
                  px-4 text-sm font-semibold text-muted
                  transition hover:bg-surface-secondary
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRestoreSale}
                disabled={isSubmitting}
                className="
                  inline-flex h-10 items-center
                  justify-center gap-2 rounded-xl
                  bg-primary px-4 text-sm font-semibold
                  text-white transition
                  hover:bg-primary-hover
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isSubmitting ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <RotateCcw className="size-4" />
                )}

                {isSubmitting
                  ? "Restoring..."
                  : "Confirm restore"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}