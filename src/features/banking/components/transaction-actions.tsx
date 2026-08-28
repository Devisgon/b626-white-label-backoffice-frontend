"use client";

import { useState } from "react";
import { Ban, Send } from "lucide-react";

import type { TransactionStatus } from "@/features/banking/types";

interface TransactionActionsProps {
  transactionId: string;
  initialStatus: TransactionStatus;
}

function formatStatus(status: TransactionStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function TransactionActions({
  transactionId,
  initialStatus,
}: TransactionActionsProps) {
  const [status, setStatus] = useState(initialStatus);

  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handlePost() {
    const confirmed = window.confirm(
      "Post this draft transaction? Posted transactions become immutable.",
    );

    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    // Temporary frontend testing.
    // Backend integration:
    // await postTransaction(transactionId);
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    console.log({
      action: "post",
      transactionId,
    });

    setStatus("posted");
    setMessage("Transaction posted successfully.");
    setIsSubmitting(false);
  }

  async function handleVoid() {
    const reason = window.prompt(
      "Enter the reason for voiding this transaction:",
    );

    if (!reason?.trim()) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    // Temporary frontend testing.
    // Backend integration:
    // await voidTransaction(transactionId, {
    //   voidReason: reason.trim(),
    // });
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    console.log({
      action: "void",
      transactionId,
      voidReason: reason.trim(),
    });

    setStatus("voided");
    setMessage("Transaction voided successfully.");
    setIsSubmitting(false);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`
            inline-flex rounded-full
            px-3 py-1.5 text-xs font-semibold
            ${
              status === "draft"
                ? "bg-amber-50 text-amber-700"
                : status === "posted"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
            }
          `}
        >
          {formatStatus(status)}
        </span>

        {status === "draft" && (
          <button
            type="button"
            onClick={handlePost}
            disabled={isSubmitting}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              border border-border bg-white px-4
              text-sm font-semibold text-muted
              transition hover:border-primary
              hover:bg-primary-light
              hover:text-primary
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Send className="size-4" />

            {isSubmitting ? "Processing..." : "Post transaction"}
          </button>
        )}

        {status !== "voided" && (
          <button
            type="button"
            onClick={handleVoid}
            disabled={isSubmitting}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              border border-border bg-white px-4
              text-sm font-semibold text-muted
              transition hover:border-red-200
              hover:bg-red-50 hover:text-red-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Ban className="size-4" />
            Void transaction
          </button>
        )}
      </div>

      {message && (
        <p
          role="status"
          className="
            mt-3 text-right text-xs
            font-medium text-primary
          "
        >
          {message}
        </p>
      )}
    </div>
  );
}
