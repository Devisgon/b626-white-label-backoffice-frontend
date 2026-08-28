"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Trash2, X } from "lucide-react";

interface FuelPumpActionButtonProps {
  pumpId: number;
  pumpName: string;
  deleted?: boolean;
  redirectAfterAction?: boolean;
}

export function FuelPumpActionButton({
  pumpId,
  pumpName,
  deleted = false,
  redirectAfterAction = false,
}: FuelPumpActionButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAction() {
    setIsSubmitting(true);

    try {
      /*
       * Backend integration:
       *
       * if (deleted) {
       *   await restoreFuelPump(pumpId);
       * } else {
       *   await deleteFuelPump(pumpId);
       * }
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log({
        pumpId,
        action: deleted ? "restore" : "delete",
      });

      window.alert(
        deleted
          ? `${pumpName} restored successfully.`
          : `${pumpName} deleted successfully.`,
      );

      setIsOpen(false);

      if (redirectAfterAction) {
        router.push("/fuel/pumps");
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
        className="
          inline-flex h-10 items-center
          justify-center gap-2 rounded-xl
          border border-border bg-white px-4
          text-sm font-semibold text-muted
          transition hover:border-primary
          hover:bg-primary hover:text-white
        "
      >
        {deleted ? (
          <RotateCcw className="size-4" />
        ) : (
          <Trash2 className="size-4" />
        )}

        {deleted ? "Restore" : "Delete"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl border border-border bg-white shadow-[var(--shadow-lg)]">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div>
                <h2 className="font-bold">
                  {deleted ? "Restore fuel pump" : "Delete fuel pump"}
                </h2>

                <p className="mt-1 text-xs text-muted">
                  {deleted
                    ? `Restore ${pumpName}?`
                    : `Soft delete ${pumpName}? It can be restored later.`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="flex size-9 items-center justify-center rounded-xl text-muted hover:bg-surface-secondary"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col-reverse gap-3 p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="h-10 rounded-xl border border-border px-4 text-sm font-semibold text-muted"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAction}
                disabled={isSubmitting}
                className="h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isSubmitting
                  ? "Processing..."
                  : deleted
                    ? "Confirm restore"
                    : "Confirm delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
