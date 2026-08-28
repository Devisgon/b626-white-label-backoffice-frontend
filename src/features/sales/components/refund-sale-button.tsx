"use client";

import { useState } from "react";
import { AlertTriangle, RotateCcw, X } from "lucide-react";

interface RefundItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface RefundSaleButtonProps {
  saleNumber: string;
  items: RefundItem[];
}

type RefundType = "full" | "partial";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RefundSaleButton({ saleNumber, items }: RefundSaleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [refundType, setRefundType] = useState<RefundType>("full");
  const [reason, setReason] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<number, number>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const partialRefundTotal = items.reduce(
    (total, item) => total + (selectedItems[item.id] ?? 0) * item.price,
    0,
  );

  const isFormValid =
    reason.trim().length >= 5 &&
    (refundType === "full" || partialRefundTotal > 0);

  function updateRefundQuantity(item: RefundItem, quantity: number) {
    const validQuantity = Math.min(item.quantity, Math.max(0, quantity));

    setSelectedItems((current) => ({
      ...current,
      [item.id]: validQuantity,
    }));
  }

  function closeModal() {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
    setRefundType("full");
    setReason("");
    setSelectedItems({});
  }

  async function handleRefund() {
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    /*
     * Temporary frontend testing.
     * Backend connect honay par refundSale API call hogi.
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    setIsSubmitting(false);
    setIsOpen(false);

    window.alert(
      `${
        refundType === "full" ? "Full" : "Partial"
      } refund prepared for ${saleNumber}.`,
    );

    setReason("");
    setSelectedItems({});
    setRefundType("full");
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
        Refund sale
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="refund-title"
          className="
            fixed inset-0 z-[100] flex items-center
            justify-center bg-black/40 p-4
            backdrop-blur-sm
          "
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-white shadow-[var(--shadow-lg)]">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-danger">
                  <AlertTriangle className="size-5" />
                </span>

                <div>
                  <h2 id="refund-title" className="font-bold">
                    Refund sale
                  </h2>

                  <p className="mt-1 text-xs text-muted">{saleNumber}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close refund modal"
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

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs font-semibold">Refund type</p>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRefundType("full")}
                    className={`
                      rounded-xl border px-4 py-3
                      text-left text-sm font-semibold
                      transition
                      ${
                        refundType === "full"
                          ? "border-primary bg-primary-light text-primary"
                          : "border-border text-muted hover:bg-surface-secondary"
                      }
                    `}
                  >
                    Full refund
                  </button>

                  <button
                    type="button"
                    onClick={() => setRefundType("partial")}
                    className={`
                      rounded-xl border px-4 py-3
                      text-left text-sm font-semibold
                      transition
                      ${
                        refundType === "partial"
                          ? "border-primary bg-primary-light text-primary"
                          : "border-border text-muted hover:bg-surface-secondary"
                      }
                    `}
                  >
                    Partial refund
                  </button>
                </div>
              </div>

              {refundType === "partial" && (
                <div>
                  <p className="text-xs font-semibold">
                    Select refund quantities
                  </p>

                  <div className="mt-3 divide-y divide-border rounded-xl border border-border">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="
                          flex items-center justify-between
                          gap-4 p-3
                        "
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {item.name}
                          </p>

                          <p className="mt-1 text-[11px] text-muted">
                            {formatCurrency(item.price)} · {item.quantity}{" "}
                            purchased
                          </p>
                        </div>

                        <input
                          type="number"
                          min="0"
                          max={item.quantity}
                          value={selectedItems[item.id] ?? 0}
                          onChange={(event) =>
                            updateRefundQuantity(
                              item,
                              Number(event.target.value),
                            )
                          }
                          aria-label={`Refund quantity for ${item.name}`}
                          className="
                            h-10 w-20 rounded-lg border
                            border-border px-3 text-center
                            text-sm outline-none
                            focus:border-primary
                          "
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex justify-between rounded-xl bg-orange-50 px-4 py-3 text-sm">
                    <span className="text-orange-700">Refund amount</span>

                    <span className="font-bold text-orange-700">
                      {formatCurrency(partialRefundTotal)}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="refund-reason"
                  className="text-xs font-semibold"
                >
                  Refund reason
                </label>

                <textarea
                  id="refund-reason"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  rows={4}
                  placeholder="Explain why this sale is being refunded..."
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
              <div className="rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
                Please review the refund details carefully. This action may not
                be reversible after confirmation.
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
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRefund}
                disabled={!isFormValid || isSubmitting}
                className="
                  inline-flex h-10 items-center
                  justify-center gap-2 rounded-xl
                  bg-danger px-4 text-sm font-semibold
                  text-white transition hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <RotateCcw className="size-4" />

                {isSubmitting ? "Processing..." : "Confirm refund"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
