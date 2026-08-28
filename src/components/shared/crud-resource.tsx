"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";
import type {
  CrudField,
  CrudRecord,
  CrudResourceConfig,
  CrudValue,
} from "@/types/crud-resource";

function show(value: CrudValue, field?: CrudField) {
  if (value === null || value === "") return "—";
  if (field?.currency)
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(Number(value));
  if (field?.type === "datetime-local")
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Karachi",
    }).format(new Date(String(value)));
  return String(value).replaceAll("_", " ");
}
function badge(status: string) {
  if (
    ["Completed", "Settled", "Approved", "Resolved", "Closed"].includes(status)
  )
    return "bg-emerald-50 text-emerald-700";
  if (["Cancelled", "Skipped"].includes(status))
    return "bg-red-50 text-red-700";
  if (["Pending", "Open", "Reported", "Recorded"].includes(status))
    return "bg-blue-50 text-blue-700";
  return "bg-orange-50 text-orange-700";
}

export function CrudList({ config }: { config: CrudResourceConfig }) {
  const [records, setRecords] = useState(config.records);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const columns = config.fields.filter((field) => field.table).slice(0, 5);
  const filtered = useMemo(
    () =>
      records.filter((item) => {
        const q = search.trim().toLowerCase();
        return (
          (!q ||
            config.searchKeys.some((key) =>
              String(item[key] ?? "")
                .toLowerCase()
                .includes(q),
            )) &&
          (status === "all" || item.status === status)
        );
      }),
    [config.searchKeys, records, search, status],
  );
  function toggle(item: CrudRecord) {
    setRecords((current) =>
      current.map((row) =>
        row.id === item.id
          ? {
              ...row,
              deleted_at: row.deleted_at ? null : new Date().toISOString(),
            }
          : row,
      ),
    );
  }
  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <Stat title="Total records" value={records.length} />
        <Stat
          title="Active records"
          value={records.filter((item) => !item.deleted_at).length}
        />
        <Stat
          title="Completed"
          value={
            records.filter((item) =>
              [
                "Completed",
                "Settled",
                "Approved",
                "Resolved",
                "Closed",
              ].includes(item.status),
            ).length
          }
        />
      </section>
      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold">{config.title}</h2>
            <p className="mt-1 text-xs text-muted">{config.description}</p>
          </div>
          <Link
            href={`${config.route}/new`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white"
          >
            <Plus className="size-4" />
            Add {config.singular}
          </Link>
        </div>
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${config.title.toLowerCase()}...`}
              className="h-11 w-full rounded-xl border border-border pl-11 pr-4 text-sm outline-none focus:border-primary"
            />
          </label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 rounded-xl border border-border bg-white px-4 text-sm lg:min-w-44"
          >
            <option value="all">All statuses</option>
            {config.statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("all");
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-light px-4 text-sm font-medium text-primary"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-surface-secondary">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="px-5 py-4">ID</th>
                {columns.map((field) => (
                  <th key={field.key} className="px-5 py-4">
                    {field.label}
                  </th>
                ))}
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className={`text-sm hover:bg-surface-secondary/60 ${item.deleted_at ? "opacity-50" : ""}`}
                >
                  <td className="px-5 py-4 font-semibold">#{item.id}</td>
                  {columns.map((field) => (
                    <td key={field.key} className="max-w-52 truncate px-5 py-4">
                      {field.key === "status" ? (
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${badge(item.status)}`}
                        >
                          {item.status}
                        </span>
                      ) : (
                        show(item[field.key], field)
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <IconLink
                        href={`${config.route}/${item.id}`}
                        label="View"
                      >
                        <Eye className="size-4" />
                      </IconLink>
                      <IconLink
                        href={`${config.route}/${item.id}/edit`}
                        label="Edit"
                      >
                        <Pencil className="size-4" />
                      </IconLink>
                      <button
                        type="button"
                        onClick={() => toggle(item)}
                        className="flex size-9 items-center justify-center rounded-xl border border-border text-muted hover:border-primary hover:text-primary"
                      >
                        {item.deleted_at ? (
                          <RotateCcw className="size-4" />
                        ) : (
                          <Trash2 className="size-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filtered.length && (
          <div className="p-12 text-center text-sm text-muted">
            No records found.
          </div>
        )}
        <div className="border-t border-border px-5 py-4 text-xs text-muted">
          Showing {filtered.length} of {records.length} records
        </div>
      </section>
    </div>
  );
}

export function CrudForm({
  config,
  mode,
  initialRecord,
}: {
  config: CrudResourceConfig;
  mode: "create" | "edit";
  initialRecord?: CrudRecord;
}) {
  const router = useRouter();
  const initial = Object.fromEntries(
    config.fields.map((field) => [
      field.key,
      initialValue(field, initialRecord?.[field.key]),
    ]),
  );
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = config.schema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        next[String(issue.path[0] ?? "form")] = issue.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setSaving(false);
    router.push(config.route);
    router.refresh();
  }
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6"
    >
      <h2 className="font-bold">
        {mode === "create"
          ? `New ${config.singular}`
          : `Edit ${config.singular}`}
      </h2>
      <p className="mt-1 text-xs text-muted">
        Fields and validation match the backend DTO.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {config.fields.map((field) => (
          <Control
            key={field.key}
            field={field}
            value={values[field.key] ?? ""}
            error={errors[field.key]}
            onChange={(value) =>
              setValues((current) => ({ ...current, [field.key]: value }))
            }
          />
        ))}
      </div>
      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Link
          href={config.route}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-muted"
        >
          Cancel
        </Link>
        <button
          disabled={saving}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : mode === "create"
              ? `Create ${config.singular}`
              : "Save changes"}
        </button>
      </div>
    </form>
  );
}

export function CrudDetails({
  config,
  record,
}: {
  config: CrudResourceConfig;
  record: CrudRecord;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <div className="flex justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {config.singular} details
          </p>
          <h2 className="mt-2 text-2xl font-bold">Record #{record.id}</h2>
        </div>
        <Link
          href={`${config.route}/${record.id}/edit`}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold text-muted"
        >
          <Pencil className="size-4" />
          Edit
        </Link>
      </div>
      <dl className="mt-2 divide-y divide-border">
        {config.fields.map((field) => (
          <div
            key={field.key}
            className="grid gap-2 py-4 text-sm sm:grid-cols-[200px_minmax(0,1fr)]"
          >
            <dt className="font-medium text-muted">{field.label}</dt>
            <dd className="font-medium">
              {field.key === "status" ? (
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${badge(record.status)}`}
                >
                  {record.status}
                </span>
              ) : (
                show(record[field.key], field)
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
export function CrudHeader({
  config,
  mode,
  id,
}: {
  config: CrudResourceConfig;
  mode: "list" | "create" | "details" | "edit";
  id?: number;
}) {
  const parent = config.route.split("/").slice(0, -1).join("/") || "/";
  const back =
    mode === "list"
      ? parent
      : mode === "details"
        ? config.route
        : id
          ? `${config.route}/${id}`
          : config.route;
  const title =
    mode === "list"
      ? config.title
      : mode === "create"
        ? `Add ${config.singular}`
        : mode === "edit"
          ? `Edit ${config.singular}`
          : `${config.singular} details`;
  return (
    <section className="mb-8 flex items-start gap-4">
      <Link
        href={back}
        className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-muted"
      >
        <ArrowLeft className="size-4" />
      </Link>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Management
        </p>
        <h1 className="mt-2 text-2xl font-bold capitalize sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted">{config.description}</p>
      </div>
    </section>
  );
}
export function CrudActionButton({
  deleted,
  onAction,
}: {
  deleted: boolean;
  onAction?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onAction}
      title={deleted ? "Restore" : "Soft delete"}
      className="flex size-9 items-center justify-center rounded-xl border border-border text-muted hover:border-primary hover:text-primary"
    >
      {deleted ? (
        <RotateCcw className="size-4" />
      ) : (
        <Trash2 className="size-4" />
      )}
    </button>
  );
}
function Control({
  field,
  value,
  error,
  onChange,
}: {
  field: CrudField;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const css =
    "mt-2 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary";
  return (
    <label className={field.type === "textarea" ? "sm:col-span-2" : ""}>
      <span className="text-sm font-semibold">
        {field.label}
        {field.required && <span className="text-red-600"> *</span>}
      </span>
      {field.type === "select" ? (
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${css} h-11`}
        >
          <option value="">Select {field.label.toLowerCase()}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className={`${css} py-3`}
        />
      ) : (
        <input
          type={field.type}
          min={field.type === "number" ? 0 : undefined}
          step={field.type === "number" ? "any" : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${css} h-11`}
        />
      )}
      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}
function initialValue(field: CrudField, value?: CrudValue) {
  if (value === null || value === undefined)
    return field.key === "status" ? (field.options?.[0] ?? "") : "";
  if (field.type === "datetime-local")
    return new Date(String(value)).toISOString().slice(0, 16);
  return String(value);
}
function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      title={label}
      className="flex size-9 items-center justify-center rounded-xl border border-border text-muted hover:border-primary hover:text-primary"
    >
      {children}
    </Link>
  );
}
function Stat({ title, value }: { title: string; value: number }) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <p className="text-xs text-muted">{title}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
      <p className="mt-1 text-[10px] text-muted">Backend-compatible overview</p>
    </article>
  );
}
