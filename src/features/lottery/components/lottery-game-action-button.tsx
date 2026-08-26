"use client";

import {
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";

interface LotteryGameActionButtonProps {
  gameId: number;
  gameName: string;
  deleted?: boolean;
}

export function LotteryGameActionButton({
  gameId,
  gameName,
  deleted = false,
}: LotteryGameActionButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleAction() {
    setIsSubmitting(true);

    try {
      /*
       * Temporary frontend testing.
       *
       * Backend integration ke waqt:
       *
       * if (deleted) {
       *   await restoreLotteryGame(
       *     gameId,
       *   );
       * } else {
       *   await deleteLotteryGame(
       *     gameId,
       *   );
       * }
       */

      await new Promise<void>(
        (resolve) => {
          window.setTimeout(
            resolve,
            700,
          );
        },
      );

      console.log({
        gameId,
        gameName,
        action: deleted
          ? "restore"
          : "delete",
      });

      setIsOpen(false);

      window.alert(
        deleted
          ? `${gameName} has been prepared for restoration.`
          : `${gameName} has been prepared for deletion.`,
      );

      router.push(
        "/lottery/games",
      );

      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setIsOpen(true)
        }
        aria-label={
          deleted
            ? `Restore ${gameName}`
            : `Delete ${gameName}`
        }
        title={
          deleted
            ? "Restore game"
            : "Delete game"
        }
        className="
          flex size-9 items-center
          justify-center rounded-xl
          border border-border
          text-muted transition
          hover:border-primary
          hover:bg-primary-light
          hover:text-primary
        "
      >
        {deleted ? (
          <RotateCcw className="size-4" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-action-title"
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40 p-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full max-w-md rounded-2xl
              border border-border bg-white
              p-5 shadow-[var(--shadow-lg)]
              sm:p-6
            "
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className={`
                  flex size-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  ${
                    deleted
                      ? "bg-primary-light text-primary"
                      : "bg-red-50 text-red-700"
                  }
                `}
              >
                {deleted ? (
                  <RotateCcw className="size-5" />
                ) : (
                  <Trash2 className="size-5" />
                )}
              </span>

              <button
                type="button"
                onClick={() =>
                  setIsOpen(false)
                }
                disabled={
                  isSubmitting
                }
                aria-label="Close dialog"
                className="
                  flex size-9 items-center
                  justify-center rounded-xl
                  text-muted transition
                  hover:bg-surface-secondary
                  hover:text-foreground
                "
              >
                <X className="size-4" />
              </button>
            </div>

            <h2
              id="game-action-title"
              className="mt-5 text-lg font-bold"
            >
              {deleted
                ? "Restore lottery game?"
                : "Delete lottery game?"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              {deleted ? (
                <>
                  This will restore{" "}
                  <strong className="text-foreground">
                    {gameName}
                  </strong>{" "}
                  and make it available again.
                </>
              ) : (
                <>
                  This will soft delete{" "}
                  <strong className="text-foreground">
                    {gameName}
                  </strong>
                  . It can be restored later.
                </>
              )}
            </p>

            <div
              className="
                mt-6 flex flex-col-reverse
                gap-3 sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={() =>
                  setIsOpen(false)
                }
                disabled={
                  isSubmitting
                }
                className="
                  inline-flex h-10 items-center
                  justify-center rounded-xl
                  border border-border
                  bg-white px-4 text-sm
                  font-semibold text-muted
                  transition
                  hover:bg-surface-secondary
                  hover:text-foreground
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleAction
                }
                disabled={
                  isSubmitting
                }
                className={`
                  inline-flex h-10
                  items-center justify-center
                  gap-2 rounded-xl px-4
                  text-sm font-semibold
                  text-white transition
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    deleted
                      ? "bg-primary hover:bg-primary-hover"
                      : "bg-red-600 hover:bg-red-700"
                  }
                `}
              >
                {deleted ? (
                  <RotateCcw className="size-4" />
                ) : (
                  <Trash2 className="size-4" />
                )}

                {isSubmitting
                  ? "Processing..."
                  : deleted
                    ? "Restore game"
                    : "Delete game"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}