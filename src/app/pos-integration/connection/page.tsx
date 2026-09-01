import { AppShell } from "@/components/layout";
import { PosConnectionForm, PosHeader } from "@/features/pos-integration";
import { demoPosConnection } from "@/features/pos-integration/demo-data";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PosHeader
          title="Connection"
          description="Configure the POS provider for the active location."
        />
        <PosConnectionForm initialValues={demoPosConnection} />
      </main>
    </AppShell>
  );
}
