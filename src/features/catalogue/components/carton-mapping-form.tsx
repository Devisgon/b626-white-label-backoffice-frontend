"use client";

import { Box, Package, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import {
  cartonMappingSchema,
  updateCartonMappingSchema,
} from "@/features/catalogue/schemas";

interface CartonMappingFormValues {
  carton_product_id: number;
  child_product_id: number;
  quantity: number;
}

interface CartonMappingFormProps {
  mode?: "create" | "edit";
  cartonMappingId?: number;
  initialValues?: Partial<CartonMappingFormValues>;
  cartonProductName?: string;
  childProductName?: string;
}

const products = [
  {
    id: 1,
    name: "Mineral Water Carton",
    sku: "CTN-1001",
  },
  {
    id: 2,
    name: "Premium Mineral Water",
    sku: "PRD-1001",
  },
  {
    id: 3,
    name: "Potato Chips Case",
    sku: "CTN-1002",
  },
  {
    id: 4,
    name: "Classic Potato Chips",
    sku: "PRD-1002",
  },
  {
    id: 5,
    name: "Coffee Case",
    sku: "CTN-1003",
  },
  {
    id: 6,
    name: "Instant Coffee",
    sku: "PRD-1006",
  },
];

export function CartonMappingForm({
  mode = "create",
  cartonMappingId,
  initialValues,
  cartonProductName,
  childProductName,
}: CartonMappingFormProps) {
  const router = useRouter();

  const [cartonProductId, setCartonProductId] = useState(
    String(initialValues?.carton_product_id ?? ""),
  );

  const [childProductId, setChildProductId] = useState(
    String(initialValues?.child_product_id ?? ""),
  );

  const [quantity, setQuantity] = useState(
    String(initialValues?.quantity ?? ""),
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});
    setServerError("");
    setSuccessMessage("");

    const values = {
      carton_product_id: Number(cartonProductId),
      child_product_id: Number(childProductId),
      quantity: Number(quantity),
    };

    const result =
      mode === "edit"
        ? updateCartonMappingSchema.safeParse({
            quantity: values.quantity,
          })
        : cartonMappingSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0] ?? "form");

        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });

      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Temporary delay until backend is connected.
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 700);
      });

      console.log({
        mode,
        cartonMappingId,
        values:
          mode === "edit"
            ? {
                quantity: values.quantity,
              }
            : values,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Carton mapping updated successfully."
          : "Carton mapping created successfully.",
      );

      setTimeout(() => {
        router.push("/catalog/carton-mappings");
        router.refresh();
      }, 800);
    } catch {
      setServerError("Unable to save the carton mapping. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="
        rounded-2xl border border-border
        bg-white p-5 shadow-[var(--shadow-sm)]
        sm:p-6
      "
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex size-10 items-center
            justify-center rounded-xl
            bg-primary-light text-primary
          "
        >
          <Box className="size-4" />
        </span>

        <div>
          <h2 className="text-lg font-bold">Carton mapping information</h2>

          <p className="mt-1 text-xs text-muted">
            Connect a carton product with the unit product stored inside it.
          </p>
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="
            mt-6 rounded-xl border border-red-200
            bg-red-50 px-4 py-3 text-sm
            font-medium text-red-700
          "
        >
          {serverError}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="
            mt-6 rounded-xl border
            border-emerald-200 bg-emerald-50
            px-4 py-3 text-sm font-medium
            text-emerald-700
          "
        >
          {successMessage}
        </div>
      )}

      <div className="mt-6 space-y-5">
        {mode === "create" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="carton-product" className="text-sm font-semibold">
                Carton product <span className="text-danger">*</span>
              </label>

              <select
                id="carton-product"
                value={cartonProductId}
                onChange={(event) => setCartonProductId(event.target.value)}
                className={`
                  mt-2 h-11 w-full rounded-xl
                  border bg-white px-4 text-sm
                  outline-none transition
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/10
                  ${
                    errors.carton_product_id
                      ? "border-red-300"
                      : "border-border"
                  }
                `}
              >
                <option value="">Select carton product</option>

                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} — {product.sku}
                  </option>
                ))}
              </select>

              {errors.carton_product_id && (
                <p className="mt-1.5 text-xs text-danger">
                  {errors.carton_product_id}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="child-product" className="text-sm font-semibold">
                Child product <span className="text-danger">*</span>
              </label>

              <select
                id="child-product"
                value={childProductId}
                onChange={(event) => setChildProductId(event.target.value)}
                className={`
                  mt-2 h-11 w-full rounded-xl
                  border bg-white px-4 text-sm
                  outline-none transition
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/10
                  ${
                    errors.child_product_id ? "border-red-300" : "border-border"
                  }
                `}
              >
                <option value="">Select child product</option>

                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} — {product.sku}
                  </option>
                ))}
              </select>

              {errors.child_product_id && (
                <p className="mt-1.5 text-xs text-danger">
                  {errors.child_product_id}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <ReadOnlyProduct
              label="Carton product"
              value={cartonProductName ?? "Carton product"}
            />

            <ReadOnlyProduct
              label="Child product"
              value={childProductName ?? "Child product"}
            />
          </div>
        )}

        <div>
          <label htmlFor="quantity" className="text-sm font-semibold">
            Units per carton <span className="text-danger">*</span>
          </label>

          <input
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="For example: 12"
            className={`
              mt-2 h-11 w-full rounded-xl border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
              ${errors.quantity ? "border-red-300" : "border-border"}
            `}
          />

          {errors.quantity && (
            <p className="mt-1.5 text-xs text-danger">{errors.quantity}</p>
          )}

          <p className="mt-2 text-[11px] text-muted">
            Enter the number of child units contained inside one carton.
          </p>
        </div>
      </div>

      <div
        className="
          mt-8 flex flex-col-reverse gap-3
          border-t border-border pt-5
          sm:flex-row sm:justify-end
        "
      >
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center
            justify-center rounded-xl border
            border-border bg-white px-5
            text-sm font-semibold text-muted
            transition hover:bg-surface-secondary
            hover:text-foreground
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center
            justify-center gap-2 rounded-xl
            bg-primary px-5 text-sm font-semibold
            text-white transition
            hover:bg-primary-hover
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Save className="size-4" />

          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Update mapping"
              : "Create mapping"}
        </button>
      </div>
    </form>
  );
}

function ReadOnlyProduct({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        rounded-xl border border-border
        bg-surface-secondary p-4
      "
    >
      <p className="text-xs text-muted">{label}</p>

      <div className="mt-2 flex items-center gap-2">
        <Package className="size-4 text-primary" />

        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
