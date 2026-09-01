import { AppShell } from "@/components/layout";
import { PosHeader, PosMappingsList } from "@/features/pos-integration";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PosHeader
          title="Mappings"
          description="Map internal products and rules to external POS records."
        />
        <PosMappingsList />
      </main>
    </AppShell>
  );
}
