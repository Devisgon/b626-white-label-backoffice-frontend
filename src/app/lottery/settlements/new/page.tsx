import { AppShell } from "@/components/layout";
import { CrudHeader } from "@/components/shared";
import { LotterySettlementForm } from "@/features/lottery/components";
import { lotterySettlementConfig } from "@/features/lottery/lottery-settlement-demo-data";
import { stripCrudSchema } from "@/types/crud-resource";
export default function Page() { const config = stripCrudSchema(lotterySettlementConfig); return <AppShell><main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><CrudHeader config={config} mode="create" /><LotterySettlementForm mode="create" /></main></AppShell>; }

