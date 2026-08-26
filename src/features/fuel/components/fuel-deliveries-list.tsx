"use client";
import Link from "next/link";
import { Eye, Pencil, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { FuelDelivery } from "../types";

const data: FuelDelivery[] = [
  { id: 1, tank_id: 1, tank_name: "Regular Tank", supplier_name: "Pakistan State Oil", quantity: 8000, invoice_number: "INV-1042", delivery_date: "2026-08-25", status: "Received" },
  { id: 2, tank_id: 3, tank_name: "Diesel Tank", supplier_name: "Shell Pakistan", quantity: 6000, invoice_number: "INV-1043", delivery_date: "2026-08-24", status: "Pending" },
];

export function FuelDeliveriesList() {
  const [search, setSearch] = useState(""); const [status, setStatus] = useState("all");
  const rows = useMemo(() => data.filter((item) => (status === "all" || item.status === status) && `${item.supplier_name} ${item.invoice_number} ${item.tank_name}`.toLowerCase().includes(search.toLowerCase())), [search, status]);
  return <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]"><div className="flex items-center justify-between border-b border-border p-5"><div><h2 className="font-bold">Fuel deliveries</h2><p className="mt-1 text-xs text-muted">Manage received fuel stock and supplier invoices.</p></div><Link href="/fuel/deliveries/new" className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white"><Plus className="size-4" />Add delivery</Link></div><div className="flex gap-3 border-b border-border p-4"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search supplier, invoice or tank..." className="h-11 w-full rounded-xl border border-border pl-11 pr-4 text-sm outline-none"/></div><select value={status} onChange={(e)=>setStatus(e.target.value)} className="h-11 rounded-xl border border-border px-4"><option value="all">All statuses</option><option>Received</option><option>Pending</option><option>Cancelled</option></select></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-surface-secondary text-xs uppercase text-muted"><tr><th className="p-4">Invoice</th><th>Supplier</th><th>Tank</th><th>Quantity</th><th>Date</th><th>Status</th><th className="pr-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-border">{rows.map((item)=><tr key={item.id}><td className="p-4 font-semibold">{item.invoice_number}</td><td>{item.supplier_name}</td><td>{item.tank_name}</td><td>{item.quantity.toLocaleString()} L</td><td>{item.delivery_date}</td><td><span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary">{item.status}</span></td><td className="pr-4"><div className="flex justify-end gap-2"><Link href={`/fuel/deliveries/${item.id}`} className="grid size-9 place-items-center rounded-lg border border-border"><Eye className="size-4"/></Link><Link href={`/fuel/deliveries/${item.id}/edit`} className="grid size-9 place-items-center rounded-lg border border-border"><Pencil className="size-4"/></Link></div></td></tr>)}</tbody></table></div></section>;
}

