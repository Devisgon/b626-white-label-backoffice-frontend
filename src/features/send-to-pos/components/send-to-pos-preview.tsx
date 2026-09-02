import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Link2,
} from "lucide-react";
import type { ReactNode } from "react";

import { demoSendToPosPreview } from "../demo-data";
import { SendToPosStatusPill } from "./send-to-pos-status-pill";

export function SendToPosPreviewPanel() {
  const preview = demoSendToPosPreview;

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Eligible rows"
          value={String(preview.eligibleSourceRows)}
          helper="Approved mappings ready to send"
          icon={<CheckCircle2 className="size-5" />}
          color="green"
        />

        <SummaryCard
          title="Blocked rows"
          value={String(preview.blockedSourceRows)}
          helper="Excluded from the outgoing batch"
          icon={<AlertTriangle className="size-5" />}
          color="red"
        />

        <SummaryCard
          title="Required blockers"
          value={String(preview.requiredMappingBlockers)}
          helper="Required mappings needing review"
          icon={<Link2 className="size-5" />}
          color="orange"
        />

        <SummaryCard
          title="Readiness"
          value={preview.outboundReadiness === "ready" ? "Ready" : "Blocked"}
          helper={`Connection mode: ${formatLabel(preview.connectionMode)}`}
          icon={<Database className="size-5" />}
          color="blue"
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="flex flex-col justify-between gap-3 border-b border-border p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold">Source group readiness</h2>
            <p className="mt-1 text-xs text-muted">
              Only mapped records are eligible for the next POS send.
            </p>
          </div>

          <SendToPosStatusPill value={preview.outboundReadiness} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-surface-secondary text-[11px] font-bold uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-4">Source group</th>
                <th className="px-5 py-4">Candidates</th>
                <th className="px-5 py-4">Eligible</th>
                <th className="px-5 py-4">Blocked</th>
                <th className="px-5 py-4">Result</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {preview.sourceGroups.map((source) => (
                <tr key={source.group}>
                  <td className="px-5 py-4 font-semibold">
                    {formatLabel(source.group)}
                  </td>
                  <td className="px-5 py-4">{source.candidates}</td>
                  <td className="px-5 py-4 text-emerald-700">
                    {source.eligible}
                  </td>
                  <td className="px-5 py-4 text-red-700">
                    {source.blocked}
                  </td>
                  <td className="px-5 py-4">
                    <SendToPosStatusPill
                      value={source.eligible > 0 ? "ready" : "blocked"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 border-t border-border bg-surface-secondary/50 p-5 text-xs sm:grid-cols-3">
          <MetaItem label="Connection ID" value={preview.connectionId} />
          <MetaItem
            label="Commander release"
            value={preview.commanderRelease ?? "Not provided"}
          />
          <MetaItem
            label="Last outbound sync"
            value={
              preview.lastOutboundSync
                ? formatDateTime(preview.lastOutboundSync)
                : "Never"
            }
          />
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  helper,
  icon,
  color,
}: {
  title: string;
  value: string;
  helper: string;
  icon: ReactNode;
  color: "green" | "red" | "orange" | "blue";
}) {
  const colors = {
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    orange: "bg-orange-50 text-orange-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{title}</p>
        <p className="mt-1 text-xl font-bold">{value}</p>
        <p className="mt-1 truncate text-[10px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-muted">{label}</p>
      <p className="mt-1 truncate font-semibold text-foreground">{value}</p>
    </div>
  );
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) =>
    letter.toUpperCase(),
  );
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}
