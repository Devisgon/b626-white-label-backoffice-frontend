import {
  CirclePlus,
  History,
  Pencil,
} from "lucide-react";

interface ProductHistoryProps {
  productId: number;
}

const sampleHistory = [
  {
    id: 1,
    action: "Updated",
    description:
      "Retail price was updated from PKR 110 to PKR 120.",
    user: "Amna",
    date: "18 Aug 2026, 02:15 PM",
  },
  {
    id: 2,
    action: "Updated",
    description:
      "Minimum stock level was updated to 10 units.",
    user: "Amna",
    date: "15 Aug 2026, 11:40 AM",
  },
  {
    id: 3,
    action: "Created",
    description:
      "Product was added to the catalogue.",
    user: "Store Admin",
    date: "10 Aug 2026, 10:30 AM",
  },
];

export function ProductHistory({
  productId,
}: ProductHistoryProps) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
          <History className="size-4" />
        </span>

        <div>
          <h2 className="font-bold">
            Product history
          </h2>

          <p className="mt-1 text-xs text-muted">
            Audit activity for product #{productId}.
          </p>
        </div>
      </div>

      <div className="mt-6">
        {sampleHistory.map((item, index) => {
          const isLast =
            index === sampleHistory.length - 1;

          const Icon =
            item.action === "Created"
              ? CirclePlus
              : Pencil;

          return (
            <div
              key={item.id}
              className="relative flex gap-4"
            >
              {!isLast && (
                <span className="absolute left-[17px] top-9 h-[calc(100%-20px)] w-px bg-border" />
              )}

              <span
                className={`
                  relative z-10 flex size-9 shrink-0
                  items-center justify-center rounded-full
                  ${
                    item.action === "Created"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-primary-light text-primary"
                  }
                `}
              >
                <Icon className="size-4" />
              </span>

              <div
                className={
                  isLast
                    ? "pb-0"
                    : "pb-7"
                }
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">
                    {item.action}
                  </p>

                  <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-medium text-muted">
                    {item.user}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-muted">
                  {item.description}
                </p>

                <p className="mt-1 text-[11px] text-muted">
                  {item.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}