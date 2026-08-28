"use client";

import { useRef, useState } from "react";
import {
  Download,
  FileSpreadsheet,
  LoaderCircle,
  Upload,
  X,
} from "lucide-react";

export function ProductImportButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  function closeModal() {
    if (isImporting) {
      return;
    }

    setIsOpen(false);
    setSelectedFile(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError("");

    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a valid CSV file.");
      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("CSV file must be smaller than 5 MB.");
      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  }

  function downloadTemplate() {
    const headers = [
      "name",
      "sku",
      "item_code",
      "barcode",
      "plu_code",
      "description",
      "retail_price",
      "wholesale_price",
      "cost",
      "tax",
      "sale_type",
      "unit",
      "size",
      "inventory_tracking",
      "minimum_stock",
      "maximum_stock",
      "is_multi_pack",
      "pack_size",
      "pack_type",
      "status",
      "category_id",
      "supplier_id",
      "brand_id",
      "department_id",
    ];

    const example = [
      "Coca Cola 500ml",
      "COKE-500",
      "ITEM-001",
      "8964000000001",
      "",
      "Chilled soft drink",
      "180",
      "160",
      "120",
      "5",
      "Both",
      "Bottle",
      "500ml",
      "true",
      "10",
      "100",
      "false",
      "",
      "",
      "Active",
      "1",
      "1",
      "1",
      "1",
    ];

    const csvContent = [
      headers.join(","),
      example.map((value) => `"${value}"`).join(","),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "product-import-template.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  async function handleImport() {
    if (!selectedFile) {
      setError("Please select a CSV file.");
      return;
    }

    setIsImporting(true);
    setError("");

    /*
     * Temporary frontend testing.
     * Backend connect honay par:
     *
     * await importProducts(selectedFile);
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 800);
    });

    setIsImporting(false);

    window.alert(`${selectedFile.name} is ready for import.`);

    closeModal();
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
          hover:bg-primary-light hover:text-primary
        "
      >
        <Upload className="size-4" />
        Import CSV
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-products-title"
          className="
            fixed inset-0 z-[100] flex items-center
            justify-center bg-black/40 p-4
            backdrop-blur-sm
          "
        >
          <div className="w-full max-w-lg rounded-2xl border border-border bg-white shadow-[var(--shadow-lg)]">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <FileSpreadsheet className="size-5" />
                </span>

                <div>
                  <h2 id="import-products-title" className="font-bold">
                    Import products
                  </h2>

                  <p className="mt-1 text-xs text-muted">
                    Upload products using a CSV file.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isImporting}
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

            <div className="space-y-5 p-5">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-semibold text-blue-800">
                  Required columns
                </p>

                <p className="mt-2 text-xs leading-5 text-blue-700">
                  name, sku, barcode and category_id must be included for every
                  product.
                </p>
              </div>

              <button
                type="button"
                onClick={downloadTemplate}
                className="
                  inline-flex h-10 items-center
                  justify-center gap-2 rounded-xl
                  border border-primary/20
                  bg-primary-light px-4 text-sm
                  font-semibold text-primary transition
                  hover:bg-primary hover:text-white
                "
              >
                <Download className="size-4" />
                Download CSV template
              </button>

              <div>
                <label
                  htmlFor="product-csv"
                  className="
                    flex cursor-pointer flex-col
                    items-center justify-center
                    rounded-xl border-2 border-dashed
                    border-border px-5 py-10
                    text-center transition
                    hover:border-primary
                    hover:bg-primary-light/40
                  "
                >
                  <Upload className="size-6 text-primary" />

                  <span className="mt-3 text-sm font-semibold">
                    Select CSV file
                  </span>

                  <span className="mt-1 text-xs text-muted">
                    Maximum file size: 5 MB
                  </span>
                </label>

                <input
                  ref={inputRef}
                  id="product-csv"
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-secondary p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-[11px] text-muted">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);

                      if (inputRef.current) {
                        inputRef.current.value = "";
                      }
                    }}
                    className="text-xs font-semibold text-danger"
                  >
                    Remove
                  </button>
                </div>
              )}

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-danger"
                >
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-border p-5">
              <button
                type="button"
                onClick={closeModal}
                disabled={isImporting}
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
                onClick={handleImport}
                disabled={!selectedFile || isImporting}
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
                {isImporting ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}

                {isImporting ? "Importing..." : "Import products"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
