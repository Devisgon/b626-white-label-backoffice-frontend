"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { fuelSaleSchema, type FuelSaleFormInput } from "../schemas";

export function FuelSaleForm({ mode = "create", initialValues }: { mode?: "create" | "edit"; initialValues?: Partial<FuelSaleFormInput> }) {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FuelSaleFormInput>({
    resolver: zodResolver(fuelSaleSchema),
    defaultValues: { pump_id: initialValues?.pump_id ?? "", tank_id: initialValues?.tank_id ?? "", opening_reading: initialValues?.opening_reading ?? "", closing_reading: initialValues?.closing_reading ?? "", price_per_liter: initialValues?.price_per_liter ?? "", payment_method: initialValues?.payment_method ?? "", shift: initialValues?.shift ?? "", sale_date: initialValues?.sale_date ?? "", status: initialValues?.status ?? "Completed" },
  });
  const liters = Math.max(Number(watch("closing_reading") || 0) - Number(watch("opening_reading") || 0), 0);
  const total = liters * Number(watch("price_per_liter") || 0);
  async function onSubmit(values: FuelSaleFormInput) { await new Promise((r) => setTimeout(r, 500)); console.log("Fuel sale payload", { ...values, pump_id: Number(values.pump_id), tank_id: Number(values.tank_id), opening_reading: Number(values.opening_reading), closing_reading: Number(values.closing_reading), liters_sold: liters, price_per_liter: Number(values.price_per_liter), total_amount: total }); router.push("/fuel/sales"); }
  const field = "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";
  return <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]"><h2 className="text-lg font-bold">Fuel sale information</h2><div className="mt-6 grid gap-5 sm:grid-cols-2">
    <Select label="Pump *" error={errors.pump_id?.message} register={register("pump_id")} options={["Pump 01","Pump 02","Pump 03"]} className={field} />
    <Select label="Tank *" error={errors.tank_id?.message} register={register("tank_id")} options={["Regular Tank","Premium Tank","Diesel Tank"]} className={field} />
    <Input label="Opening reading *" error={errors.opening_reading?.message} input={<input type="number" step="0.01" {...register("opening_reading")} className={field} />} />
    <Input label="Closing reading *" error={errors.closing_reading?.message} input={<input type="number" step="0.01" {...register("closing_reading")} className={field} />} />
    <Input label="Price per liter *" error={errors.price_per_liter?.message} input={<input type="number" step="0.01" {...register("price_per_liter")} className={field} />} />
    <Input label="Sale date *" error={errors.sale_date?.message} input={<input type="date" {...register("sale_date")} className={field} />} />
    <label className="text-sm font-semibold">Payment method<select {...register("payment_method")} className={field}><option value="">Select method</option><option value="Cash">Cash</option><option value="Card">Card</option><option value="Bank Transfer">Bank Transfer</option></select></label>
    <label className="text-sm font-semibold">Shift<select {...register("shift")} className={field}><option value="">Select shift</option><option value="Morning">Morning</option><option value="Evening">Evening</option><option value="Night">Night</option></select></label>
    <label className="text-sm font-semibold">Status<select {...register("status")} className={field}><option value="Completed">Completed</option><option value="Pending">Pending</option><option value="Cancelled">Cancelled</option></select></label>
    <div className="rounded-xl bg-primary-light p-4 text-sm"><p>Liters sold: <b>{liters.toFixed(2)}</b></p><p className="mt-2">Total: <b>PKR {total.toLocaleString("en-PK")}</b></p></div>
  </div><div className="mt-8 flex justify-end gap-3 border-t border-border pt-5"><button type="button" onClick={() => router.back()} className="h-11 rounded-xl border border-border px-5 text-sm font-semibold">Cancel</button><button disabled={isSubmitting} className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white"><Save className="size-4" />{isSubmitting ? "Saving..." : mode === "edit" ? "Update sale" : "Create sale"}</button></div></form>;
}

function Input({ label, input, error }: { label: string; input: React.ReactNode; error?: string }) { return <label className="text-sm font-semibold">{label}{input}{error && <span className="mt-1 block text-xs text-danger">{error}</span>}</label>; }
function Select({ label, options, register, className, error }: { label: string; options: string[]; register: object; className: string; error?: string }) { return <label className="text-sm font-semibold">{label}<select {...register} className={className}><option value="">Select</option>{options.map((option, index) => <option key={option} value={index + 1}>{option}</option>)}</select>{error && <span className="mt-1 block text-xs text-danger">{error}</span>}</label>; }

