"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LoaderCircle,
  Trash2,
  X,
} from "lucide-react";

interface DeleteProductButtonProps {
  productId: number;
  productName: string;
}

export function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleDelete() {
    setIsSubmitting(true);

    /*
     * Temporary frontend testing.
     * Backend connect honay par:
     *
     * await deleteProduct(productId);
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    setIsSubmitting(false);
    setIsOpen(false);

    window.alert(
      `${productName} has been prepared for deletion.`,
    );

    router.push("/products");
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
        <Trash2 className="size-4" />
        Delete product
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-product-title"
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
                  <Trash2 className="size-5" />
                </span>

                <div>
                  <h2
                    id="delete-product-title"
                    className="font-bold"
                  >
                    Delete product
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    {productName}
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
                This product will be removed from the active
                catalogue and will no longer be available
                for normal product operations.
              </p>

              <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
                Please confirm that you want to delete this
                product. This is a soft-delete action.
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
                Keep product
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
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
                  <Trash2 className="size-4" />
                )}

                {isSubmitting
                  ? "Deleting..."
                  : "Delete product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}