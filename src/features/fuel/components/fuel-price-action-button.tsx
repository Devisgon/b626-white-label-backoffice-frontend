"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Trash2, X } from "lucide-react";

interface FuelPriceActionButtonProps {
  priceId: number;
  fuelType: string;
  deleted?: boolean;
  redirectAfterAction?: boolean;
}

export function FuelPriceActionButton({
  priceId,
  fuelType,
  deleted = false,
  redirectAfterAction = false,
}: FuelPriceActionButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAction() {
    setIsSubmitting(true);

    try {
      /*
       * Backend integration:
       *
       * deleted
       *   ? await restoreFuelPrice(priceId)
       *   : await deleteFuelPrice(priceId);
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        priceId,
        action: deleted ? "restore" : "delete",
      });

      window.alert(
        deleted ? `${fuelType} price restored.` : `${fuelType} price deleted.`,
      );

      setIsOpen(false);

      if (redirectAfterAction) {
        router.push("/fuel/prices");
      }

      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-muted hover:bg-primary hover:text-white"
      >
        {deleted ? (
          <RotateCcw className="size-4" />
        ) : (
          <Trash2 className="size-4" />
        )}

        {deleted ? "Restore" : "Delete"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-white shadow-[var(--shadow-lg)]">
            <div className="flex justify-between gap-4 border-b border-border p-5">
              <div>
                <h2 className="font-bold">
                  {deleted ? "Restore fuel price" : "Delete fuel price"}
                </h2>

                <p className="mt-1 text-xs text-muted">
                  {fuelType} price record will be{" "}
                  {deleted ? "restored" : "soft deleted"}.
                </p>
              </div>

              <button type="button" onClick={() => setIsOpen(false)}>
                <X className="size-4" />
              </button>
            </div>

            <div className="flex justify-end gap-3 p-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-10 rounded-xl border border-border px-4 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAction}
                disabled={isSubmitting}
                className="h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isSubmitting ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
