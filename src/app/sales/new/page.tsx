"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  SalePaymentPanel,
  SaleProductCard,
  type SaleProduct,
} from "@/features/sales/components";

interface CartItem extends SaleProduct {
  quantity: number;
}

const sampleProducts: SaleProduct[] = [
  {
    id: 1,
    name: "Premium Mineral Water",
    sku: "PRD-1001",
    price: 120,
    stock: 45,
  },
  {
    id: 2,
    name: "Classic Potato Chips",
    sku: "PRD-1002",
    price: 180,
    stock: 28,
  },
  {
    id: 3,
    name: "Chocolate Biscuits",
    sku: "PRD-1003",
    price: 250,
    stock: 32,
  },
  {
    id: 4,
    name: "Fresh Orange Juice",
    sku: "PRD-1004",
    price: 320,
    stock: 18,
  },
  {
    id: 5,
    name: "Energy Drink",
    sku: "PRD-1005",
    price: 280,
    stock: 24,
  },
  {
    id: 6,
    name: "Instant Coffee",
    sku: "PRD-1006",
    price: 650,
    stock: 15,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CreateSalePage() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return sampleProducts;
    }

    return sampleProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.sku.toLowerCase().includes(value),
    );
  }, [search]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  function addProduct(product: SaleProduct) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id && item.quantity < item.stock
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function changeQuantity(productId: number, change: number) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(item.stock, item.quantity + change),
          };
        })
        .filter((item) => item.quantity > 0),
    );
  }

  function removeProduct(productId: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/sales"
            aria-label="Return to sales"
            className="
              flex size-10 shrink-0 items-center
              justify-center rounded-xl border
              border-border bg-white text-muted transition
              hover:border-primary hover:bg-primary-light
              hover:text-primary
            "
          >
            <ArrowLeft className="size-4" />
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Sales management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Create new sale
            </h1>

            <p className="mt-2 text-sm text-muted">
              Add products and complete the customer transaction.
            </p>
          </div>
        </section>

        <div className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
              <h2 className="font-bold">Select products</h2>

              <p className="mt-1 text-xs text-muted">
                Search and add products to this sale.
              </p>

              <div className="relative mt-5">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products by name or SKU..."
                  className="
                    h-11 w-full rounded-xl border
                    border-border bg-white pl-10 pr-4
                    text-sm outline-none transition
                    focus:border-primary
                    focus:ring-4 focus:ring-primary/10
                  "
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <SaleProductCard
                    key={product.id}
                    product={product}
                    onAdd={addProduct}
                  />
                ))}

                {filteredProducts.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-sm font-semibold">No products found</p>

                    <p className="mt-1 text-xs text-muted">
                      Try another product name or SKU.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
              <div className="border-b border-border p-5">
                <h2 className="font-bold">Sale items</h2>

                <p className="mt-1 text-xs text-muted">
                  {cartItems.length} different products added
                </p>
              </div>

              {cartItems.length === 0 ? (
                <div className="px-5 py-14 text-center">
                  <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-surface-secondary text-muted">
                    <ShoppingCart className="size-5" />
                  </span>

                  <p className="mt-4 text-sm font-semibold">
                    No products added
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Select products from the list above.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {cartItems.map((item) => (
                    <article
                      key={item.id}
                      className="
                        flex flex-col gap-4 p-5
                        sm:flex-row sm:items-center
                        sm:justify-between
                      "
                    >
                      <div>
                        <h3 className="text-sm font-semibold">{item.name}</h3>

                        <p className="mt-1 text-xs text-muted">
                          {item.sku} · {formatCurrency(item.price)} each
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center rounded-xl border border-border">
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, -1)}
                            className="flex size-9 items-center justify-center text-muted hover:text-primary"
                          >
                            <Minus className="size-3.5" />
                          </button>

                          <span className="min-w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            disabled={item.quantity >= item.stock}
                            onClick={() => changeQuantity(item.id, 1)}
                            className="
                              flex size-9 items-center
                              justify-center text-muted
                              hover:text-primary
                              disabled:opacity-30
                            "
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        <p className="min-w-24 text-right text-sm font-bold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeProduct(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="
                            flex size-9 items-center
                            justify-center rounded-lg
                            text-danger transition
                            hover:bg-red-50
                          "
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
          <SalePaymentPanel
            subtotal={subtotal}
            itemCount={cartItems.reduce(
              (total, item) => total + item.quantity,
              0,
            )}
          />
        </div>
      </div>
    </AppShell>
  );
}
