"use client";

import { useMemo, useState } from "react";
import { KeyRound, Plus, Search, Trash2 } from "lucide-react";
import type {
  ActivityEntry,
  ApiIntegration,
  NotificationChannel,
  NotificationEvent,
  PaymentMethodConfig,
  ReceiptSettings,
  SecurityPolicy,
} from "../types";

const button =
  "h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-white disabled:opacity-60";
const field =
  "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary";

export function PaymentMethodsSettings() {
  const [methods, setMethods] = useState<PaymentMethodConfig[]>([
    { id: "pm-1", method: "CASH", isEnabled: true },
    { id: "pm-2", method: "CARD", isEnabled: true },
    { id: "pm-3", method: "WALLET", isEnabled: false },
    { id: "pm-4", method: "BANK_TRANSFER", isEnabled: true },
  ]);
  return (
    <SettingsCard
      title="Payment methods"
      description="Enable or disable payment options available at your store."
    >
      <div className="divide-y divide-border">
        {methods.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-semibold">
                {item.method.replaceAll("_", " ")}
              </p>
              <p className="mt-1 text-xs text-muted">
                Available during checkout when enabled.
              </p>
            </div>
            <Toggle
              enabled={item.isEnabled}
              onClick={() =>
                setMethods((current) =>
                  current.map((method) =>
                    method.id === item.id
                      ? { ...method, isEnabled: !method.isEnabled }
                      : method,
                  ),
                )
              }
            />
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}

export function ReceiptSettingsForm() {
  const [settings, setSettings] = useState<ReceiptSettings>({
    footerText: "Thank you for shopping with us!",
    showLogo: true,
    invoicePrefix: "INV-",
  });
  const [saved, setSaved] = useState(false);
  return (
    <SettingsCard
      title="Receipt & invoice"
      description="Control receipt branding and invoice numbering."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <label className="block text-sm font-semibold">
          Invoice prefix
          <input
            value={settings.invoicePrefix}
            onChange={(event) => {
              setSettings({ ...settings, invoicePrefix: event.target.value });
              setSaved(false);
            }}
            className={field}
          />
        </label>
        <label className="mt-5 block text-sm font-semibold">
          Footer text
          <textarea
            value={settings.footerText}
            onChange={(event) => {
              setSettings({ ...settings, footerText: event.target.value });
              setSaved(false);
            }}
            className="mt-2 min-h-28 w-full rounded-xl border border-border p-4 text-sm outline-none focus:border-primary"
          />
        </label>
        <div className="mt-5 flex items-center justify-between">
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input
              type="checkbox"
              checked={settings.showLogo}
              onChange={(event) =>
                setSettings({ ...settings, showLogo: event.target.checked })
              }
              className="size-4 accent-primary"
            />
            Show store logo
          </label>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-emerald-700">Saved</span>}
            <button className={button}>Save settings</button>
          </div>
        </div>
      </form>
    </SettingsCard>
  );
}

const events: NotificationEvent[] = [
  "LOW_STOCK",
  "PAYROLL_RUN",
  "LOGIN_ALERT",
  "LEAVE_REQUEST",
];
const channels: NotificationChannel[] = ["EMAIL", "SMS"];
export function NotificationSettings() {
  const [values, setValues] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      events.flatMap((event) =>
        channels.map((channel) => [`${event}:${channel}`, true]),
      ),
    ),
  );
  return (
    <SettingsCard
      title="Notification preferences"
      description="Choose which events notify you by email or SMS."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[550px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase text-muted">
              <th className="py-3">Event</th>
              <th>Email</th>
              <th>SMS</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event} className="border-b border-border">
                <td className="py-4 font-semibold">
                  {event.replaceAll("_", " ")}
                </td>
                {channels.map((channel) => {
                  const key = `${event}:${channel}`;
                  return (
                    <td key={channel}>
                      <Toggle
                        enabled={values[key]}
                        onClick={() =>
                          setValues((current) => ({
                            ...current,
                            [key]: !current[key],
                          }))
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SettingsCard>
  );
}

export function SecuritySettingsForm() {
  const [policy, setPolicy] = useState<SecurityPolicy>({
    minPasswordLength: 8,
    sessionTimeoutMinutes: 60,
    require2FA: false,
  });
  const [saved, setSaved] = useState(false);
  return (
    <SettingsCard
      title="Security policy"
      description="Configure password, session and two-factor authentication rules."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Minimum password length
            <input
              required
              type="number"
              min="6"
              value={policy.minPasswordLength}
              onChange={(event) =>
                setPolicy({
                  ...policy,
                  minPasswordLength: Number(event.target.value),
                })
              }
              className={field}
            />
          </label>
          <label className="text-sm font-semibold">
            Session timeout (minutes)
            <input
              required
              type="number"
              min="5"
              value={policy.sessionTimeoutMinutes}
              onChange={(event) =>
                setPolicy({
                  ...policy,
                  sessionTimeoutMinutes: Number(event.target.value),
                })
              }
              className={field}
            />
          </label>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input
              type="checkbox"
              checked={policy.require2FA}
              onChange={(event) =>
                setPolicy({ ...policy, require2FA: event.target.checked })
              }
              className="size-4 accent-primary"
            />
            Require two-factor authentication
          </label>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm text-emerald-700">Saved</span>}
            <button className={button}>Save policy</button>
          </div>
        </div>
      </form>
    </SettingsCard>
  );
}

export function IntegrationsSettings() {
  const [items, setItems] = useState<ApiIntegration[]>([
    {
      id: "int-1",
      provider: "STRIPE",
      isActive: true,
      createdAt: "2026-08-25T08:00:00Z",
    },
  ]);
  const [provider, setProvider] = useState("");
  const [apiKey, setApiKey] = useState("");
  function add(event: React.FormEvent) {
    event.preventDefault();
    setItems((current) => [
      {
        id: `int-${Date.now()}`,
        provider: provider.toUpperCase(),
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setProvider("");
    setApiKey("");
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <SettingsCard
        title="Connect provider"
        description="API keys are stored securely and never shown again."
      >
        <form onSubmit={add}>
          <label className="text-sm font-semibold">
            Provider
            <input
              required
              value={provider}
              onChange={(event) => setProvider(event.target.value)}
              placeholder="STRIPE"
              className={field}
            />
          </label>
          <label className="mt-5 block text-sm font-semibold">
            API key
            <input
              required
              minLength={8}
              type="password"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              className={field}
            />
          </label>
          <button className={`${button} mt-6 inline-flex items-center gap-2`}>
            <Plus className="size-4" />
            Connect
          </button>
        </form>
      </SettingsCard>
      <SettingsCard
        title="Connected integrations"
        description="Activate, deactivate or remove connected providers."
      >
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex items-center gap-3">
                <KeyRound className="size-5 text-primary" />
                <div>
                  <p className="font-semibold">{item.provider}</p>
                  <p className="text-xs text-muted">
                    Connected{" "}
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Toggle
                  enabled={item.isActive}
                  onClick={() =>
                    setItems((current) =>
                      current.map((entry) =>
                        entry.id === item.id
                          ? { ...entry, isActive: !entry.isActive }
                          : entry,
                      ),
                    )
                  }
                />
                <button
                  onClick={() =>
                    setItems((current) =>
                      current.filter((entry) => entry.id !== item.id),
                    )
                  }
                  className="flex size-9 items-center justify-center rounded-xl border border-border"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

const demoActivity: ActivityEntry[] = [
  {
    source: "AUTH",
    action: "USER_LOGIN",
    performedBy: "Ayesha Khan",
    createdAt: "2026-08-31T08:30:00Z",
    details: "Successful login",
  },
  {
    source: "BANKING",
    action: "TRANSFER_CREATED",
    performedBy: "Bilal Ahmed",
    createdAt: "2026-08-30T11:15:00Z",
    details: "Transfer TRF-1024",
  },
  {
    source: "CATALOGUE",
    action: "PRODUCT_UPDATED",
    performedBy: "Sara Ali",
    createdAt: "2026-08-29T09:45:00Z",
    details: "Updated inventory item",
  },
];
export function ActivityLogList() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("ALL");
  const filtered = useMemo(
    () =>
      demoActivity.filter(
        (item) =>
          (source === "ALL" || item.source === source) &&
          `${item.action} ${item.performedBy} ${item.details}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, source],
  );
  return (
    <SettingsCard
      title="Activity log"
      description="Unified Auth, Banking and Catalogue activity feed."
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search activity..."
            className="h-11 w-full rounded-xl border border-border pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={source}
          onChange={(event) => setSource(event.target.value)}
          className="h-11 rounded-xl border border-border px-4 text-sm"
        >
          <option value="ALL">All sources</option>
          <option>AUTH</option>
          <option>BANKING</option>
          <option>CATALOGUE</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase text-muted">
              <th className="py-3">Source</th>
              <th>Action</th>
              <th>Performed by</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={`${item.source}-${item.createdAt}`}
                className="border-b border-border"
              >
                <td className="py-4 font-semibold text-primary">
                  {item.source}
                </td>
                <td>{item.action.replaceAll("_", " ")}</td>
                <td>{item.performedBy ?? "System"}</td>
                <td>{new Date(item.createdAt).toLocaleString("en-GB")}</td>
                <td>{item.details ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SettingsCard>
  );
}

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={enabled}
      className={`relative h-7 w-12 rounded-full transition ${enabled ? "bg-primary" : "bg-slate-300"}`}
    >
      <span
        className={`absolute top-1 size-5 rounded-full bg-white transition ${enabled ? "left-6" : "left-1"}`}
      />
    </button>
  );
}
function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <h2 className="font-bold">{title}</h2>
      <p className="mt-1 text-xs text-muted">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
