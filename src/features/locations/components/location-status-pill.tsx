export function LocationStatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-700"
      }`}
    >
      {active ? "Current" : "Available"}
    </span>
  );
}
