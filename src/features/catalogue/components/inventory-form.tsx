"use client";

import {
  Package,
  Save,
  Warehouse,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useState,
} from "react";

import {
  inventorySchema,
  type InventoryFormValues,
} from "@/features/catalogue/schemas";

interface InventoryFormProps {
  mode?: "create" | "edit";
  inventoryId?: number;
  initialValues?: Partial<InventoryFormValues>;
}

const products = [
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

export function InventoryForm({
  mode = "create",
  inventoryId,
  initialValues,
}: InventoryFormProps) {
  const router = useRouter();

  const [productId, setProductId] =
    useState(
      String(initialValues?.product_id ?? ""),
    );

  const [quantity, setQuantity] =
    useState(
      String(initialValues?.quantity ?? 0),
    );

  const [
    reservedQuantity,
    setReservedQuantity,
  ] = useState(
    String(
      initialValues?.reserved_quantity ?? 0,
    ),
  );

  const [minimumStock, setMinimumStock] =
    useState(
      String(
        initialValues?.minimum_stock ?? 0,
      ),
    );

  const [maximumStock, setMaximumStock] =
    useState(
      String(
        initialValues?.maximum_stock ?? 0,
      ),
    );

  const [reorderLevel, setReorderLevel] =
    useState(
      String(
        initialValues?.reorder_level ?? 0,
      ),
    );

  const [warehouse, setWarehouse] =
    useState(initialValues?.warehouse ?? "");

  const [status, setStatus] = useState<
    "Active" | "Inactive"
  >(initialValues?.status ?? "Active");

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [serverError, setServerError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const availableQuantity = Math.max(
    0,
    Number(quantity || 0) -
      Number(reservedQuantity || 0),
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setErrors({});
    setServerError("");
    setSuccessMessage("");

    const values = {
      product_id: Number(productId),
      quantity: Number(quantity),
      reserved_quantity: Number(
        reservedQuantity,
      ),
      minimum_stock: Number(minimumStock),
      maximum_stock: Number(maximumStock),
      reorder_level: Number(reorderLevel),
      warehouse,
      status,
    };

    const result =
      inventorySchema.safeParse(values);

    if (!result.success) {
      const nextErrors: Record<
        string,
        string
      > = {};

      result.error.issues.forEach((issue) => {
        const field = String(
          issue.path[0] ?? "form",
        );

        if (!nextErrors[field]) {
          nextErrors[field] =
            issue.message;
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
        inventoryId,
        values: result.data,
      });

      setSuccessMessage(
        mode === "edit"
          ? "Inventory record updated successfully."
          : "Inventory record created successfully.",
      );

      setTimeout(() => {
        router.push("/catalog/inventory");
        router.refresh();
      }, 800);
    } catch {
      setServerError(
        "Unable to save the inventory record. Please try again.",
      );
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
          <Warehouse className="size-4" />
        </span>

        <div>
          <h2 className="text-lg font-bold">
            Inventory information
          </h2>

          <p className="mt-1 text-xs text-muted">
            Enter product stock and warehouse
            information.
          </p>
        </div>
      </div>

      {serverError && (
        <Message
          type="error"
          message={serverError}
        />
      )}

      {successMessage && (
        <Message
          type="success"
          message={successMessage}
        />
      )}

      <div className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="inventory-product"
            className="text-sm font-semibold"
          >
            Product{" "}
            <span className="text-danger">
              *
            </span>
          </label>

          <div className="relative mt-2">
            <Package
              className="
                pointer-events-none absolute
                left-4 top-1/2 size-4
                -translate-y-1/2 text-muted
              "
            />

            <select
              id="inventory-product"
              value={productId}
              onChange={(event) =>
                setProductId(event.target.value)
              }
              className={`
                h-11 w-full rounded-xl border
                bg-white pl-11 pr-4 text-sm
                outline-none transition
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                ${
                  errors.product_id
                    ? "border-red-300"
                    : "border-border"
                }
              `}
            >
              <option value="">
                Select product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name} —{" "}
                  {product.sku}
                </option>
              ))}
            </select>
          </div>

          <FieldError
            message={errors.product_id}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <NumberField
            id="quantity"
            label="Total quantity"
            value={quantity}
            onChange={setQuantity}
            error={errors.quantity}
          />

          <NumberField
            id="reserved-quantity"
            label="Reserved quantity"
            value={reservedQuantity}
            onChange={setReservedQuantity}
            error={
              errors.reserved_quantity
            }
          />

          <div
            className="
              rounded-xl border border-border
              bg-primary-light p-4
            "
          >
            <p className="text-xs text-muted">
              Available quantity
            </p>

            <p className="mt-2 text-2xl font-bold text-primary">
              {availableQuantity}
            </p>

            <p className="mt-1 text-[10px] text-muted">
              Total minus reserved
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <NumberField
            id="minimum-stock"
            label="Minimum stock"
            value={minimumStock}
            onChange={setMinimumStock}
            error={errors.minimum_stock}
          />

          <NumberField
            id="maximum-stock"
            label="Maximum stock"
            value={maximumStock}
            onChange={setMaximumStock}
            error={errors.maximum_stock}
          />

          <NumberField
            id="reorder-level"
            label="Reorder level"
            value={reorderLevel}
            onChange={setReorderLevel}
            error={errors.reorder_level}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="warehouse"
              className="text-sm font-semibold"
            >
              Warehouse{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <input
              id="warehouse"
              type="text"
              value={warehouse}
              onChange={(event) =>
                setWarehouse(
                  event.target.value,
                )
              }
              placeholder="For example: Main Warehouse"
              className={`
                mt-2 h-11 w-full rounded-xl
                border bg-white px-4 text-sm
                outline-none transition
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
                ${
                  errors.warehouse
                    ? "border-red-300"
                    : "border-border"
                }
              `}
            />

            <FieldError
              message={errors.warehouse}
            />
          </div>

          <div>
            <label
              htmlFor="inventory-status"
              className="text-sm font-semibold"
            >
              Status{" "}
              <span className="text-danger">
                *
              </span>
            </label>

            <select
              id="inventory-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "Active"
                    | "Inactive",
                )
              }
              className="
                mt-2 h-11 w-full rounded-xl
                border border-border bg-white
                px-4 text-sm outline-none
                transition focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              "
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
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
              ? "Update inventory"
              : "Create inventory"}
        </button>
      </div>
    </form>
  );
}

interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function NumberField({
  id,
  label,
  value,
  onChange,
  error,
}: NumberFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-semibold"
      >
        {label}{" "}
        <span className="text-danger">
          *
        </span>
      </label>

      <input
        id={id}
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`
          mt-2 h-11 w-full rounded-xl
          border bg-white px-4 text-sm
          outline-none transition
          focus:border-primary
          focus:ring-4 focus:ring-primary/10
          ${
            error
              ? "border-red-300"
              : "border-border"
          }
        `}
      />

      <FieldError message={error} />
    </div>
  );
}

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1.5 text-xs text-danger">
      {message}
    </p>
  );
}

function Message({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  return (
    <div
      role={
        type === "error"
          ? "alert"
          : "status"
      }
      className={`
        mt-6 rounded-xl border px-4 py-3
        text-sm font-medium
        ${
          type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-red-200 bg-red-50 text-red-700"
        }
      `}
    >
      {message}
    </div>
  );
}