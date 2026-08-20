import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { CategoryForm } from "@/features/catalogue/components";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  const category = {
    name: "Beverages",
    description:
      "Soft drinks, juices, bottled water and other beverage products.",
    status: "Active" as const,
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/categories/${id}`}
            aria-label="Return to category details"
            className="
              flex size-10 shrink-0 items-center
              justify-center rounded-xl border
              border-border bg-white text-muted
              transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <ArrowLeft className="size-4" />
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Edit category
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update category information and
              availability.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <CategoryForm
            mode="edit"
            categoryId={Number(id)}
            initialValues={category}
          />
        </div>
      </div>
    </AppShell>
  );
}