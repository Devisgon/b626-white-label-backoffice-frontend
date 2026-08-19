"use client";

import { useState } from "react";
import {
  Barcode,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Package,
  Save,
} from "lucide-react";

import type {
  CreateProductInput,
  ProductSaleType,
  ProductStatus,
} from "@/features/products/types";

interface ProductFormProps {
  initialValues?: Partial<CreateProductInput>;
  mode?: "create" | "edit";
  onSuccess?: () => void;
}

const defaultValues: CreateProductInput = {
  name: "",
  sku: "",
  item_code: "",
  barcode: "",
  plu_code: "",
  retail_price: 0,
  wholesale_price: 0,
  cost: 0,
  tax: 0,
  description: "",
  sale_type: "Retail",
  unit: "",
  size: "",
  is_multi_pack: false,
  pack_size: 1,
  pack_type: "",
  inventory_tracking: true,
  minimum_stock: 0,
  maximum_stock: 0,
  status: "Active",
};

export function ProductForm({
  initialValues,
  mode = "create",
  onSuccess,
}: ProductFormProps) {
  const [form, setForm] =
    useState<CreateProductInput>({
      ...defaultValues,
      ...initialValues,
    });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  function updateField<
    Key extends keyof CreateProductInput,
  >(
    field: Key,
    value: CreateProductInput[Key],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (
      form.is_multi_pack &&
      (!form.pack_size || form.pack_size < 1)
    ) {
      setError(
        "Pack size is required for multi-pack products.",
      );
      return;
    }

    if (
      (form.minimum_stock ?? 0) >
      (form.maximum_stock ?? 0) &&
      (form.maximum_stock ?? 0) > 0
    ) {
      setError(
        "Minimum stock cannot be greater than maximum stock.",
      );
      return;
    }

    setIsSubmitting(true);

    /*
     * Temporary frontend test.
     * Backend connect honay par createProduct/updateProduct
     * API call yahan hogi.
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    setIsSubmitting(false);

    window.alert(
      mode === "create"
        ? `${form.name} is ready to be created.`
        : `${form.name} is ready to be updated.`,
    );

    onSuccess?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div
          role="alert"
          className="
            rounded-xl border border-red-200
            bg-red-50 px-4 py-3 text-sm
            font-medium text-danger
          "
        >
          {error}
        </div>
      )}

      <FormSection
        title="Basic information"
        description="Product name and unique identification codes."
        icon={Package}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            id="product-name"
            label="Product name"
            value={form.name}
            onChange={(value) =>
              updateField("name", value)
            }
            placeholder="e.g. Coca Cola 500ml"
            required
          />

          <TextField
            id="product-sku"
            label="SKU"
            value={form.sku ?? ""}
            onChange={(value) =>
              updateField("sku", value)
            }
            placeholder="e.g. COKE-500"
          />

          <TextField
            id="item-code"
            label="Item code"
            value={form.item_code ?? ""}
            onChange={(value) =>
              updateField("item_code", value)
            }
            placeholder="e.g. ITEM-00123"
          />

          <TextField
            id="barcode"
            label="Barcode"
            value={form.barcode ?? ""}
            onChange={(value) =>
              updateField("barcode", value)
            }
            placeholder="EAN or UPC barcode"
            icon={Barcode}
          />

          <TextField
            id="plu-code"
            label="PLU code"
            value={form.plu_code ?? ""}
            onChange={(value) =>
              updateField("plu_code", value)
            }
            placeholder="e.g. 1234"
          />

          <SelectField
            id="product-status"
            label="Status"
            value={form.status ?? "Active"}
            onChange={(value) =>
              updateField(
                "status",
                value as ProductStatus,
              )
            }
            options={[
              {
                value: "Active",
                label: "Active",
              },
              {
                value: "Inactive",
                label: "Inactive",
              },
            ]}
          />
        </div>
      </FormSection>

      <FormSection
        title="Pricing"
        description="Retail, wholesale and cost pricing information."
        icon={CircleDollarSign}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <NumberField
            id="retail-price"
            label="Retail price"
            value={form.retail_price ?? 0}
            onChange={(value) =>
              updateField("retail_price", value)
            }
          />

          <NumberField
            id="wholesale-price"
            label="Wholesale price"
            value={form.wholesale_price ?? 0}
            onChange={(value) =>
              updateField(
                "wholesale_price",
                value,
              )
            }
          />

          <NumberField
            id="cost-price"
            label="Cost price"
            value={form.cost ?? 0}
            onChange={(value) =>
              updateField("cost", value)
            }
          />

          <NumberField
            id="tax-rate"
            label="Tax rate (%)"
            value={form.tax ?? 0}
            onChange={(value) =>
              updateField(
                "tax",
                Math.min(100, value),
              )
            }
            max={100}
          />
        </div>
      </FormSection>

      <FormSection
        title="Product details"
        description="Sale type, unit, size and product description."
        icon={Boxes}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <SelectField
            id="sale-type"
            label="Sale type"
            value={form.sale_type ?? "Retail"}
            onChange={(value) =>
              updateField(
                "sale_type",
                value as ProductSaleType,
              )
            }
            options={[
              {
                value: "Retail",
                label: "Retail",
              },
              {
                value: "Wholesale",
                label: "Wholesale",
              },
              {
                value: "Both",
                label: "Retail & Wholesale",
              },
            ]}
          />

          <TextField
            id="product-unit"
            label="Unit"
            value={form.unit ?? ""}
            onChange={(value) =>
              updateField("unit", value)
            }
            placeholder="Piece, bottle, pack..."
          />

          <TextField
            id="product-size"
            label="Size"
            value={form.size ?? ""}
            onChange={(value) =>
              updateField("size", value)
            }
            placeholder="500ml, 1kg, large..."
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="description"
            className="text-xs font-semibold"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            value={form.description ?? ""}
            onChange={(event) =>
              updateField(
                "description",
                event.target.value,
              )
            }
            placeholder="Enter product description..."
            className="
              mt-2 w-full resize-none rounded-xl
              border border-border bg-white p-3
              text-sm outline-none transition
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          />
        </div>
      </FormSection>

      <FormSection
        title="Catalogue relations"
        description="Assign the product to catalogue master data."
        icon={CheckCircle2}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SelectField
            id="category"
            label="Category"
            value={String(form.category_id ?? "")}
            onChange={(value) =>
              updateField(
                "category_id",
                value ? Number(value) : undefined,
              )
            }
            options={[
              {
                value: "",
                label: "Select category",
              },
              {
                value: "1",
                label: "Beverages",
              },
              {
                value: "2",
                label: "Snacks",
              },
              {
                value: "3",
                label: "Grocery",
              },
            ]}
          />

          <SelectField
            id="brand"
            label="Brand"
            value={String(form.brand_id ?? "")}
            onChange={(value) =>
              updateField(
                "brand_id",
                value ? Number(value) : undefined,
              )
            }
            options={[
              {
                value: "",
                label: "Select brand",
              },
              {
                value: "1",
                label: "Aqua Fresh",
              },
              {
                value: "2",
                label: "Crispy",
              },
              {
                value: "3",
                label: "Sweet Bite",
              },
            ]}
          />

          <SelectField
            id="supplier"
            label="Supplier"
            value={String(
              form.supplier_id ?? "",
            )}
            onChange={(value) =>
              updateField(
                "supplier_id",
                value ? Number(value) : undefined,
              )
            }
            options={[
              {
                value: "",
                label: "Select supplier",
              },
              {
                value: "1",
                label: "Fresh Distributors",
              },
              {
                value: "2",
                label: "National Foods Supply",
              },
              {
                value: "3",
                label: "Prime Wholesale",
              },
            ]}
          />

          <SelectField
            id="department"
            label="Department"
            value={String(
              form.department_id ?? "",
            )}
            onChange={(value) =>
              updateField(
                "department_id",
                value ? Number(value) : undefined,
              )
            }
            options={[
              {
                value: "",
                label: "Select department",
              },
              {
                value: "1",
                label: "General Store",
              },
              {
                value: "2",
                label: "Fresh Food",
              },
              {
                value: "3",
                label: "Beverages",
              },
            ]}
          />
        </div>
      </FormSection>

      <FormSection
        title="Inventory settings"
        description="Configure stock tracking and stock limits."
        icon={Boxes}
      >
        <label className="flex items-center gap-3 rounded-xl border border-border p-4">
          <input
            type="checkbox"
            checked={
              form.inventory_tracking ?? true
            }
            onChange={(event) =>
              updateField(
                "inventory_tracking",
                event.target.checked,
              )
            }
            className="size-4 accent-primary"
          />

          <span>
            <span className="block text-sm font-semibold">
              Track inventory
            </span>

            <span className="mt-1 block text-xs text-muted">
              Monitor stock levels for this product.
            </span>
          </span>
        </label>

        {form.inventory_tracking && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberField
              id="minimum-stock"
              label="Minimum stock"
              value={form.minimum_stock ?? 0}
              onChange={(value) =>
                updateField(
                  "minimum_stock",
                  value,
                )
              }
            />

            <NumberField
              id="maximum-stock"
              label="Maximum stock"
              value={form.maximum_stock ?? 0}
              onChange={(value) =>
                updateField(
                  "maximum_stock",
                  value,
                )
              }
            />
          </div>
        )}
      </FormSection>

      <FormSection
        title="Multi-pack settings"
        description="Configure cartons or products sold in packs."
        icon={Boxes}
      >
        <label className="flex items-center gap-3 rounded-xl border border-border p-4">
          <input
            type="checkbox"
            checked={form.is_multi_pack ?? false}
            onChange={(event) =>
              updateField(
                "is_multi_pack",
                event.target.checked,
              )
            }
            className="size-4 accent-primary"
          />

          <span>
            <span className="block text-sm font-semibold">
              This is a multi-pack product
            </span>

            <span className="mt-1 block text-xs text-muted">
              Enable this for cartons, cases or bundles.
            </span>
          </span>
        </label>

        {form.is_multi_pack && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NumberField
              id="pack-size"
              label="Units per pack"
              value={form.pack_size ?? 1}
              onChange={(value) =>
                updateField("pack_size", value)
              }
              min={1}
            />

            <TextField
              id="pack-type"
              label="Pack type"
              value={form.pack_type ?? ""}
              onChange={(value) =>
                updateField("pack_type", value)
              }
              placeholder="Carton, case, bundle..."
            />
          </div>
        )}
      </FormSection>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            inline-flex h-11 items-center
            justify-center gap-2 rounded-xl
            bg-primary px-6 text-sm font-semibold
            text-white transition
            hover:bg-primary-hover
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Save className="size-4" />

          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create product"
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}

interface FormSectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function FormSection({
  title,
  description,
  icon: Icon,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Icon className="size-4" />
        </span>

        <div>
          <h2 className="font-bold">{title}</h2>

          <p className="mt-1 text-xs text-muted">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  required?: boolean;
  icon?: React.ElementType;
}

function TextField({
  id,
  label,
  value,
  placeholder,
  onChange,
  required,
  icon: Icon,
}: TextFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold"
      >
        {label}

        {required && (
          <span className="ml-1 text-danger">
            *
          </span>
        )}
      </label>

      <div className="relative mt-2">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        )}

        <input
          id={id}
          type="text"
          value={value}
          required={required}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className={`
            h-11 w-full rounded-xl border
            border-border bg-white pr-3 text-sm
            outline-none transition
            focus:border-primary
            focus:ring-4 focus:ring-primary/10
            ${Icon ? "pl-10" : "pl-3"}
          `}
        />
      </div>
    </div>
  );
}

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
}: NumberFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold"
      >
        {label}
      </label>

      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step="0.01"
        value={value}
        onChange={(event) =>
          onChange(
            Math.max(
              min,
              Number(event.target.value),
            ),
          )
        }
        className="
          mt-2 h-11 w-full rounded-xl border
          border-border bg-white px-3 text-sm
          outline-none transition
          focus:border-primary
          focus:ring-4 focus:ring-primary/10
        "
      />
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-semibold"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          mt-2 h-11 w-full rounded-xl border
          border-border bg-white px-3 text-sm
          outline-none transition
          focus:border-primary
          focus:ring-4 focus:ring-primary/10
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}