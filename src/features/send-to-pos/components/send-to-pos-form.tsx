"use client";

import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  demoSendToPosMappings,
  demoSendToPosPreview,
} from "../demo-data";

export function SendToPosForm() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState<number | null>(null);

  const selectedCount = selectedIds.length;
  const sendCount = selectedCount || demoSendToPosMappings.length;
  const allSelected = selectedCount === demoSendToPosMappings.length;

  const selectedLabels = useMemo(
    () =>
      demoSendToPosMappings
        .filter((mapping) => selectedIds.includes(mapping.id))
        .map(
          (mapping) =>
            mapping.externalDisplayName ?? mapping.externalEntityKey,
        ),
    [selectedIds],
  );

  function toggleMapping(id: string) {
    setSentCount(null);
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((mappingId) => mappingId !== id)
        : [...current, id],
    );
  }

  function toggleAll() {
    setSentCount(null);
    setSelectedIds(
      allSelected ? [] : demoSendToPosMappings.map((mapping) => mapping.id),
    );
  }

  async function confirmSend() {
    setIsSending(true);

    try {
      /*
       * Backend integration:
       * await sendToPosNow(
       *   selectedIds.length > 0 ? { mappingIds: selectedIds } : {},
       * );
       */
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      setSentCount(sendCount);
      setSelectedIds([]);
      setIsConfirming(false);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="border-b border-border p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h2 className="font-bold">Select records to send</h2>
              <p className="mt-1 text-xs leading-5 text-muted">
                Leave every checkbox clear to send all eligible mapped records.
              </p>
            </div>

            <span className="rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary">
              {demoSendToPosPreview.eligibleSourceRows} eligible
            </span>
          </div>
        </div>

        <div className="border-b border-border bg-surface-secondary/50 px-5 py-3">
          <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-semibold">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="size-4 accent-primary"
            />
            Select all eligible records
          </label>
        </div>

        <div className="divide-y divide-border">
          {demoSendToPosMappings.map((mapping) => {
            const isSelected = selectedIds.includes(mapping.id);

            return (
              <label
                key={mapping.id}
                className="flex cursor-pointer items-center gap-4 px-5 py-4 transition hover:bg-surface-secondary/60"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleMapping(mapping.id)}
                  className="size-4 shrink-0 accent-primary"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {mapping.externalDisplayName ?? mapping.externalEntityKey}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted">
                    {mapping.internalEntityType}:{mapping.internalEntityId}
                    {" → "}
                    {mapping.externalEntityKey}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase text-emerald-700">
                  Mapped
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-xs text-muted">
            {selectedCount > 0
              ? `${selectedCount} specific record(s) selected.`
              : "No selection means all eligible records will be sent."}
          </p>

          <button
            type="button"
            onClick={() => setIsConfirming(true)}
            disabled={demoSendToPosPreview.outboundReadiness !== "ready"}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
          >
            <Send className="size-4" />
            Send now
          </button>
        </div>
      </section>

      {sentCount !== null && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Send completed</p>
            <p className="mt-1 text-xs">
              A batch containing {sentCount} record(s) was created and marked
              as sent.
            </p>
          </div>
        </div>
      )}

      {isConfirming && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="send-confirmation-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-lg)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <Send className="size-5" />
              </span>

              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                disabled={isSending}
                aria-label="Close confirmation"
                className="flex size-9 items-center justify-center rounded-xl text-muted hover:bg-surface-secondary"
              >
                <X className="size-4" />
              </button>
            </div>

            <h2 id="send-confirmation-title" className="mt-5 text-lg font-bold">
              Send records to POS?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              This will create a batch containing {sendCount} record(s) and
              immediately mark it as sent.
            </p>

            {selectedLabels.length > 0 && (
              <p className="mt-3 line-clamp-2 text-xs text-muted">
                Selected: {selectedLabels.join(", ")}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                disabled={isSending}
                className="h-10 rounded-xl border border-border px-4 text-sm font-semibold text-muted hover:bg-surface-secondary"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmSend}
                disabled={isSending}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
              >
                {isSending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {isSending ? "Sending..." : "Confirm send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
