import { AppShell } from "@/components/layout";
import { CrudHeader } from "@/components/shared";
import { LotterySalesList } from "@/features/lottery/components";
import { lotterySaleConfig } from "@/features/lottery/lottery-sale-demo-data";
import { stripCrudSchema } from "@/types/crud-resource";
export default function Page() { const config = stripCrudSchema(lotterySaleConfig); return <AppShell><main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><CrudHeader config={config} mode="list" /><LotterySalesList /></main></AppShell>; }

