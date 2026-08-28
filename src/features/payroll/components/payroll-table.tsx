"use client";

import Link from "next/link";
import {
  Check,
  Clock3,
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

export interface PayrollTableColumn<T> {
  key: string;
  label: string;
  render: (record: T) => ReactNode;
}
export interface PayrollTableRecord {
  id: string;
  status?: string;
  isActive?: boolean;
}

function statusColor(value: string) {
  if (["APPROVED", "ACTIVE"].includes(value))
    return "bg-emerald-50 text-emerald-700";
  if (["REJECTED", "INACTIVE"].includes(value)) return "bg-red-50 text-red-700";
  return "bg-blue-50 text-blue-700";
}

export function StatusPill({ value }: { value: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusColor(value)}`}
    >
      {value.replaceAll("_", " ")}
    </span>
  );
}

export function PayrollTable<T extends PayrollTableRecord>({
  title,
  description,
  route,
  singular,
  records: initialRecords,
  columns,
  searchText,
  allowCreate = true,
  allowEdit = true,
  actionMode = "none",
}: {
  title: string;
  description: string;
  route: string;
  singular: string;
  records: T[];
  columns: PayrollTableColumn<T>[];
  searchText: (record: T) => string;
  allowCreate?: boolean;
  allowEdit?: boolean;
  actionMode?: "none" | "activate" | "delete" | "decision" | "timesheet";
}) {
  const [records, setRecords] = useState(initialRecords);
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      records.filter((record) =>
        searchText(record).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, records, searchText],
  );
  function update(id: string, changes: Partial<T>) {
    setRecords((current) =>
      current.map((record) =>
        record.id === id ? { ...record, ...changes } : record,
      ),
    );
  }
  function remove(id: string) {
    setRecords((current) => current.filter((record) => record.id !== id));
  }
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
      <div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="mt-1 text-xs text-muted">{description}</p>
        </div>
        {allowCreate && (
          <Link
            href={`${route}/new`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white"
          >
            <Plus className="size-4" />
            Add {singular}
          </Link>
        )}
      </div>
      <div className="border-b border-border p-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="h-11 w-full rounded-xl border border-border bg-white pl-11 pr-4 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left">
          <thead className="bg-surface-secondary">
            <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-4">
                  {column.label}
                </th>
              ))}
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((record) => (
              <tr
                key={record.id}
                className="text-sm transition hover:bg-surface-secondary/60"
              >
                {columns.map((column) => (
                  <td key={column.key} className="max-w-56 truncate px-5 py-4">
                    {column.render(record)}
                  </td>
                ))}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <ActionLink href={`${route}/${record.id}`} title="View">
                      <Eye className="size-4" />
                    </ActionLink>
                    {allowEdit && (
                      <ActionLink
                        href={`${route}/${record.id}/edit`}
                        title="Edit"
                      >
                        <Pencil className="size-4" />
                      </ActionLink>
                    )}
                    {actionMode === "activate" && (
                      <ActionButton
                        title={record.isActive ? "Deactivate" : "Reactivate"}
                        onClick={() =>
                          update(record.id, {
                            isActive: !record.isActive,
                          } as Partial<T>)
                        }
                      >
                        {record.isActive ? (
                          <Trash2 className="size-4" />
                        ) : (
                          <RotateCcw className="size-4" />
                        )}
                      </ActionButton>
                    )}
                    {actionMode === "delete" && (
                      <ActionButton
                        title="Delete"
                        onClick={() => remove(record.id)}
                      >
                        <Trash2 className="size-4" />
                      </ActionButton>
                    )}
                    {actionMode === "decision" &&
                      record.status === "PENDING" && (
                        <>
                          <ActionButton
                            title="Approve"
                            onClick={() =>
                              update(record.id, {
                                status: "APPROVED",
                              } as unknown as Partial<T>)
                            }
                          >
                            <Check className="size-4" />
                          </ActionButton>
                          <ActionButton
                            title="Reject"
                            onClick={() =>
                              update(record.id, {
                                status: "REJECTED",
                              } as Partial<T>)
                            }
                          >
                            <X className="size-4" />
                          </ActionButton>
                        </>
                      )}
                    {actionMode === "timesheet" && (
                      <>
                        {!(record as T & { clockOut?: string | null })
                          .clockOut && (
                          <ActionButton
                            title="Clock out"
                            onClick={() =>
                              update(record.id, {
                                clockOut: new Date().toISOString(),
                              } as unknown as Partial<T>)
                            }
                          >
                            <Clock3 className="size-4" />
                          </ActionButton>
                        )}
                        {record.status === "PENDING" &&
                          (record as T & { clockOut?: string | null })
                            .clockOut && (
                            <>
                              <ActionButton
                                title="Approve"
                                onClick={() =>
                                  update(record.id, {
                                    status: "APPROVED",
                                  } as Partial<T>)
                                }
                              >
                                <Check className="size-4" />
                              </ActionButton>
                              <ActionButton
                                title="Reject"
                                onClick={() =>
                                  update(record.id, {
                                    status: "REJECTED",
                                  } as Partial<T>)
                                }
                              >
                                <X className="size-4" />
                              </ActionButton>
                            </>
                          )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <div className="p-12 text-center text-sm text-muted">
          No records found.
        </div>
      )}
      <div className="border-t border-border px-5 py-4 text-xs text-muted">
        Showing {filtered.length} of {records.length} records
      </div>
    </section>
  );
}

function ActionLink({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      title={title}
      className="flex size-9 items-center justify-center rounded-xl border border-border text-muted hover:border-primary hover:text-primary"
    >
      {children}
    </Link>
  );
}
function ActionButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-xl border border-border text-muted hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}
