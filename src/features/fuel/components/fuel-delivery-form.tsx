"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { fuelDeliverySchema, type FuelDeliveryFormInput } from "../schemas";

export function FuelDeliveryForm({
  mode = "create",
  initialValues,
}: {
  mode?: "create" | "edit";
  initialValues?: Partial<FuelDeliveryFormInput>;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FuelDeliveryFormInput>({
    resolver: zodResolver(fuelDeliverySchema),
    defaultValues: {
      tank_id: initialValues?.tank_id ?? "",
      supplier_name: initialValues?.supplier_name ?? "",
      quantity: initialValues?.quantity ?? "",
      invoice_number: initialValues?.invoice_number ?? "",
      delivery_date: initialValues?.delivery_date ?? "",
      status: initialValues?.status ?? "Received",
    },
  });

  async function onSubmit(values: FuelDeliveryFormInput) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Fuel delivery payload", {
      ...values,
      tank_id: Number(values.tank_id),
      quantity: Number(values.quantity),
    });
    router.push("/fuel/deliveries");
  }

  const field =
    "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]"
    >
      <h2 className="text-lg font-bold">Delivery information</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Tank *
          <select {...register("tank_id")} className={field}>
            <option value="">Select tank</option>
            <option value="1">Regular Tank</option>
            <option value="2">Premium Tank</option>
            <option value="3">Diesel Tank</option>
          </select>
          <Error text={errors.tank_id?.message} />
        </label>
        <label className="text-sm font-semibold">
          Supplier name
          <input
            {...register("supplier_name")}
            className={field}
            placeholder="Supplier name"
          />
        </label>
        <label className="text-sm font-semibold">
          Quantity (liters) *
          <input
            type="number"
            step="0.01"
            {...register("quantity")}
            className={field}
            placeholder="0"
          />
          <Error text={errors.quantity?.message} />
        </label>
        <label className="text-sm font-semibold">
          Invoice number
          <input
            {...register("invoice_number")}
            className={field}
            placeholder="INV-0001"
          />
        </label>
        <label className="text-sm font-semibold">
          Delivery date *
          <input type="date" {...register("delivery_date")} className={field} />
          <Error text={errors.delivery_date?.message} />
        </label>
        <label className="text-sm font-semibold">
          Status *
          <select {...register("status")} className={field}>
            <option value="Received">Received</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
      </div>
      <div className="mt-8 flex justify-end gap-3 border-t border-border pt-5">
        <button
          type="button"
          onClick={() => router.back()}
          className="h-11 rounded-xl border border-border px-5 text-sm font-semibold"
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white"
        >
          <Save className="size-4" />
          {isSubmitting
            ? "Saving..."
            : mode === "edit"
              ? "Update delivery"
              : "Create delivery"}
        </button>
      </div>
    </form>
  );
}

function Error({ text }: { text?: string }) {
  return text ? (
    <span className="mt-1 block text-xs text-danger">{text}</span>
  ) : null;
}
