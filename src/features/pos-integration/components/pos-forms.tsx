"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PosConnection, PosMapping } from "../types";
const field =
  "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary";

export function PosConnectionForm({
  initialValues,
}: {
  initialValues: PosConnection;
}) {
  const [enabled, setEnabled] = useState(initialValues.isEnabled);
  const [saved, setSaved] = useState(false);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
      className="rounded-2xl border border-border bg-white p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Label title="Provider">
          <input defaultValue={initialValues.provider} className={field} />
        </Label>
        <Label title="Site name">
          <input
            required
            defaultValue={initialValues.siteName}
            className={field}
          />
        </Label>
        <Label title="Service ID">
          <input
            required
            defaultValue={initialValues.serviceId}
            className={field}
          />
        </Label>
        <Label title="External site ID">
          <input
            required
            defaultValue={initialValues.externalSiteId}
            className={field}
          />
        </Label>
        <Label title="Connection mode">
          <select defaultValue={initialValues.connectionMode} className={field}>
            <option value="file_xml">File XML</option>
            <option value="api">API</option>
            <option value="sftp">SFTP</option>
          </select>
        </Label>
        <Label title="Commander release">
          <input
            defaultValue={initialValues.commanderRelease ?? ""}
            className={field}
          />
        </Label>
      </div>
      <Label title="Notes">
        <textarea
          defaultValue={initialValues.notes ?? ""}
          className="mt-2 min-h-24 w-full rounded-xl border border-border p-4 text-sm"
        />
      </Label>
      <div className="mt-6 flex items-center justify-between">
        <label className="flex items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) => setEnabled(event.target.checked)}
            className="size-4 accent-primary"
          />
          Connection enabled
        </label>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-emerald-700">Saved</span>}
          <button className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-white">
            Save connection
          </button>
        </div>
      </div>
    </form>
  );
}

export function PosMappingForm({
  initialValues,
}: {
  initialValues?: PosMapping;
}) {
  const router = useRouter();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/pos-integration/mappings");
      }}
      className="rounded-2xl border border-border bg-white p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Label title="Internal entity type">
          <input
            required
            defaultValue={initialValues?.internalEntityType ?? "product"}
            className={field}
          />
        </Label>
        <Label title="Internal entity ID">
          <input
            required
            defaultValue={initialValues?.internalEntityId ?? ""}
            className={field}
          />
        </Label>
        <Label title="External entity type">
          <input
            required
            defaultValue={initialValues?.externalEntityType ?? "pos_item"}
            className={field}
          />
        </Label>
        <Label title="External entity key">
          <input
            required
            defaultValue={initialValues?.externalEntityKey ?? ""}
            className={field}
          />
        </Label>
        <Label title="External parent key">
          <input
            defaultValue={initialValues?.externalParentKey ?? ""}
            className={field}
          />
        </Label>
        <Label title="External display name">
          <input
            defaultValue={initialValues?.externalDisplayName ?? ""}
            className={field}
          />
        </Label>
        {initialValues && (
          <Label title="Status">
            <select defaultValue={initialValues.status} className={field}>
              <option value="unresolved">Unresolved</option>
              <option value="partial">Partial</option>
              <option value="mapped">Mapped</option>
              <option value="blocked">Blocked</option>
            </select>
          </Label>
        )}
      </div>
      <label className="mt-5 flex items-center gap-3 text-sm font-semibold">
        <input
          type="checkbox"
          defaultChecked={initialValues?.isRequired ?? true}
          className="size-4 accent-primary"
        />
        Required mapping
      </label>
      <div className="mt-6 flex justify-end">
        <button className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-white">
          {initialValues ? "Update mapping" : "Create mapping"}
        </button>
      </div>
    </form>
  );
}
function Label({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mt-5 block text-sm font-semibold first:mt-0">
      {title}
      {children}
    </label>
  );
}
