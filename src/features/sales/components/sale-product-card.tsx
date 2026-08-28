import { Plus, ShoppingCart } from "lucide-react";

export interface SaleProduct {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

interface SaleProductCardProps {
  product: SaleProduct;
  onAdd: (product: SaleProduct) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function SaleProductCard({ product, onAdd }: SaleProductCardProps) {
  return (
    <article className="rounded-xl border border-border p-4 transition hover:border-primary/40 hover:shadow-[var(--shadow-sm)]">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
          <ShoppingCart className="size-4" />
        </span>

        <span className="rounded-full bg-surface-secondary px-2 py-1 text-[10px] font-semibold text-muted">
          {product.stock} in stock
        </span>
      </div>

      <h3 className="mt-4 text-sm font-semibold">{product.name}</h3>

      <p className="mt-1 text-[11px] text-muted">{product.sku}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold">{formatCurrency(product.price)}</p>

        <button
          type="button"
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
          aria-label={`Add ${product.name}`}
          className="
            flex size-9 items-center justify-center
            rounded-lg bg-primary text-white transition
            hover:bg-primary-hover
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <Plus className="size-4" />
        </button>
      </div>
    </article>
  );
}
