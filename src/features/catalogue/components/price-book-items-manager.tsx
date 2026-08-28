"use client";

import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

export interface PriceBookManagerItem {
  id: number;
  productId: number;
  productName: string;
  sku: string;
  sellingPrice: number;
}

interface ProductOption {
  id: number;
  name: string;
  sku: string;
}

interface PriceBookItemsManagerProps {
  priceBookId: number;
  initialItems: PriceBookManagerItem[];
}

const products: ProductOption[] = [
  {
    id: 1,
    name: "Premium Mineral Water",
    sku: "PRD-1001",
  },
  {
    id: 2,
    name: "Classic Potato Chips",
    sku: "PRD-1002",
  },
  {
    id: 3,
    name: "Chocolate Biscuits",
    sku: "PRD-1003",
  },
  {
    id: 4,
    name: "Fresh Milk",
    sku: "PRD-1004",
  },
  {
    id: 5,
    name: "Orange Juice",
    sku: "PRD-1005",
  },
  {
    id: 6,
    name: "Instant Coffee",
    sku: "PRD-1006",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function PriceBookItemsManager({
  priceBookId,
  initialItems,
}: PriceBookItemsManagerProps) {
  const [items, setItems] = useState<PriceBookManagerItem[]>(initialItems);

  const [showForm, setShowForm] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState("");

  const [sellingPrice, setSellingPrice] = useState("");

  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const [formError, setFormError] = useState("");

  const availableProducts = useMemo(
    () =>
      products.filter(
        (product) => !items.some((item) => item.productId === product.id),
      ),
    [items],
  );

  function resetForm() {
    setShowForm(false);
    setSelectedProductId("");
    setSellingPrice("");
    setEditingItemId(null);
    setFormError("");
  }

  function handleAddItem() {
    setFormError("");

    const productId = Number(selectedProductId);

    const price = Number(sellingPrice);

    if (!productId) {
      setFormError("Please select a product.");
      return;
    }

    if (sellingPrice.trim() === "" || Number.isNaN(price) || price < 0) {
      setFormError("Please enter a valid selling price.");
      return;
    }

    const product = products.find((item) => item.id === productId);

    if (!product) {
      setFormError("Selected product was not found.");
      return;
    }

    const newItem: PriceBookManagerItem = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      sellingPrice: price,
    };

    setItems((currentItems) => [...currentItems, newItem]);

    console.log({
      action: "add-price-book-item",
      priceBookId,
      product_id: product.id,
      selling_price: price,
    });

    resetForm();
  }

  function startEditing(item: PriceBookManagerItem) {
    setEditingItemId(item.id);

    setSellingPrice(String(item.sellingPrice));

    setShowForm(false);
    setFormError("");
  }

  function updateItem(itemId: number) {
    const price = Number(sellingPrice);

    if (sellingPrice.trim() === "" || Number.isNaN(price) || price < 0) {
      setFormError("Please enter a valid selling price.");
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              sellingPrice: price,
            }
          : item,
      ),
    );

    console.log({
      action: "update-price-book-item",
      priceBookId,
      itemId,
      selling_price: price,
    });

    setEditingItemId(null);
    setSellingPrice("");
    setFormError("");
  }

  function removeItem(item: PriceBookManagerItem) {
    const shouldDelete = window.confirm(
      `Remove ${item.productName} from this price book?`,
    );

    if (!shouldDelete) {
      return;
    }

    setItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem.id !== item.id),
    );

    console.log({
      action: "delete-price-book-item",
      priceBookId,
      itemId: item.id,
    });
  }

  return (
    <section
      className="
        overflow-hidden rounded-2xl
        border border-border bg-white
        shadow-[var(--shadow-sm)]
      "
    >
      <div
        className="
          flex flex-col justify-between gap-4
          border-b border-border p-5
          sm:flex-row sm:items-center sm:p-6
        "
      >
        <div>
          <h2 className="font-bold">Product prices</h2>

          <p className="mt-1 text-xs text-muted">
            Add products and manage their selling prices in this price book.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            setEditingItemId(null);
            setSellingPrice("");
            setFormError("");
          }}
          disabled={availableProducts.length === 0}
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
          <Plus className="size-4" />
          Add product price
        </button>
      </div>

      {showForm && (
        <div className="border-b border-border bg-surface-secondary/50 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold">Add product price</h3>

              <p className="mt-1 text-xs text-muted">
                Select a product and enter its selling price.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              aria-label="Close form"
              className="
                flex size-9 items-center
                justify-center rounded-lg
                text-muted transition
                hover:bg-white hover:text-foreground
              "
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px_auto] sm:items-end">
            <div>
              <label
                htmlFor="price-book-product"
                className="text-xs font-semibold"
              >
                Product
              </label>

              <select
                id="price-book-product"
                value={selectedProductId}
                onChange={(event) => setSelectedProductId(event.target.value)}
                className="
                  mt-2 h-11 w-full rounded-xl
                  border border-border bg-white
                  px-3 text-sm outline-none
                  focus:border-primary
                  focus:ring-4 focus:ring-primary/10
                "
              >
                <option value="">Select product</option>

                {availableProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} — {product.sku}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="selling-price" className="text-xs font-semibold">
                Selling price
              </label>

              <input
                id="selling-price"
                type="number"
                min="0"
                step="0.01"
                value={sellingPrice}
                onChange={(event) => setSellingPrice(event.target.value)}
                placeholder="0.00"
                className="
                  mt-2 h-11 w-full rounded-xl
                  border border-border bg-white
                  px-3 text-sm outline-none
                  focus:border-primary
                  focus:ring-4 focus:ring-primary/10
                "
              />
            </div>

            <button
              type="button"
              onClick={handleAddItem}
              className="
                inline-flex h-11 items-center
                justify-center gap-2 rounded-xl
                bg-primary px-4 text-sm
                font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              <Save className="size-4" />
              Add
            </button>
          </div>

          {formError && (
            <p className="mt-3 text-xs font-medium text-danger">{formError}</p>
          )}
        </div>
      )}

      {items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-surface-secondary">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="px-5 py-4">Product</th>

                <th className="px-5 py-4">SKU</th>

                <th className="px-5 py-4">Selling price</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="
                    text-sm transition
                    hover:bg-surface-secondary/50
                  "
                >
                  <td className="px-5 py-4 font-semibold">
                    {item.productName}
                  </td>

                  <td className="px-5 py-4 text-muted">{item.sku}</td>

                  <td className="px-5 py-4">
                    {editingItemId === item.id ? (
                      <div>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={sellingPrice}
                          onChange={(event) =>
                            setSellingPrice(event.target.value)
                          }
                          className="
                            h-9 w-36 rounded-lg border
                            border-border px-3 text-sm
                            outline-none
                            focus:border-primary
                            focus:ring-4
                            focus:ring-primary/10
                          "
                        />

                        {formError && (
                          <p className="mt-1 text-[10px] text-danger">
                            {formError}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="font-bold text-primary">
                        {formatCurrency(item.sellingPrice)}
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {editingItemId === item.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => updateItem(item.id)}
                            aria-label="Save price"
                            className="
                              flex size-9 items-center
                              justify-center rounded-lg
                              border border-border
                              text-muted transition
                              hover:border-primary
                              hover:bg-primary-light
                              hover:text-primary
                            "
                          >
                            <Save className="size-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingItemId(null);
                              setSellingPrice("");
                              setFormError("");
                            }}
                            aria-label="Cancel editing"
                            className="
                              flex size-9 items-center
                              justify-center rounded-lg
                              border border-border
                              text-muted transition
                              hover:bg-surface-secondary
                              hover:text-foreground
                            "
                          >
                            <X className="size-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => startEditing(item)}
                            aria-label={`Edit ${item.productName} price`}
                            className="
                              flex size-9 items-center
                              justify-center rounded-lg
                              border border-border
                              text-muted transition
                              hover:border-primary
                              hover:bg-primary-light
                              hover:text-primary
                            "
                          >
                            <Pencil className="size-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => removeItem(item)}
                            aria-label={`Remove ${item.productName}`}
                            className="
                              flex size-9 items-center
                              justify-center rounded-lg
                              border border-border
                              text-muted transition
                              hover:border-red-200
                              hover:bg-red-50
                              hover:text-red-600
                            "
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-10 text-center">
          <p className="font-semibold">No product prices added</p>

          <p className="mt-1 text-xs text-muted">
            Add a product to start managing its selling price.
          </p>
        </div>
      )}
    </section>
  );
}
