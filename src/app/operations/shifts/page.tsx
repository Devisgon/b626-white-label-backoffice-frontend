import { AppShell } from "@/components/layout";
import { CrudHeader } from "@/components/shared";
import { ShiftsList } from "@/features/operations/components";
import { shiftConfig } from "@/features/operations/shift-demo-data";
import { stripCrudSchema } from "@/types/crud-resource";
export default function Page() {
  const config = stripCrudSchema(shiftConfig);
  return (
    <AppShell>
      <main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <CrudHeader config={config} mode="list" />
        <ShiftsList />
      </main>
    </AppShell>
  );
}
