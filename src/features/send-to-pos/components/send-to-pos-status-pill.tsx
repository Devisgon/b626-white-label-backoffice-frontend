import type {
  SendToPosBatchStatus,
  SendToPosReadinessStatus,
} from "../types";

type StatusValue = SendToPosBatchStatus | SendToPosReadinessStatus;

const statusClasses: Record<StatusValue, string> = {
  ready: "bg-emerald-50 text-emerald-700",
  blocked: "bg-red-50 text-red-700",
  pending: "bg-blue-50 text-blue-700",
  sent: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
};

export function SendToPosStatusPill({ value }: { value: StatusValue }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${statusClasses[value]}`}
    >
      {value}
    </span>
  );
}
