import { AppShell } from "@/components/layout";
import { CrudHeader } from "@/components/shared";
import { ExpenseForm } from "@/features/operations/components";
import { expenseConfig } from "@/features/operations/expense-demo-data";
import { stripCrudSchema } from "@/types/crud-resource";
export default function Page() { const config = stripCrudSchema(expenseConfig); return <AppShell><main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><CrudHeader config={config} mode="create" /><ExpenseForm mode="create" /></main></AppShell>; }

