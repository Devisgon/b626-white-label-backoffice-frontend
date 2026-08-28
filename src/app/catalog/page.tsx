import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  Building2,
  ClipboardList,
  Layers3,
  MapPin,
  PackageCheck,
  Ruler,
  Tags,
  Truck,
  Warehouse,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import { CatalogueCard } from "@/features/catalogue/components";

const catalogueSections = [
  {
    title: "Categories",
    description: "Create and manage product categories and their organization.",
    href: "/catalog/categories",
    icon: Tags,
  },
  {
    title: "Brands",
    description: "Manage product brands available across the store catalogue.",
    href: "/catalog/brands",
    icon: Building2,
  },
  {
    title: "Suppliers",
    description: "Manage suppliers and their business information.",
    href: "/catalog/suppliers",
    icon: Truck,
  },
  {
    title: "Departments",
    description: "Organize products into store departments.",
    href: "/catalog/departments",
    icon: Warehouse,
  },
  {
    title: "Units",
    description: "Manage measurement and packaging units for products.",
    href: "/catalog/units",
    icon: Ruler,
  },
  {
    title: "Price Books",
    description: "Manage product pricing rules and price book items.",
    href: "/catalog/price-books",
    icon: PackageCheck,
  },
  {
    title: "Inventory Locations",
    description: "Manage warehouses, shelves and inventory locations.",
    href: "/catalog/inventory-locations",
    icon: MapPin,
  },
  {
    title: "Carton Mappings",
    description: "Configure carton quantities and product mappings.",
    href: "/catalog/carton-mappings",
    icon: Boxes,
  },
  {
    title: "Inventory",
    description: "Manage inventory records, quantities and stock status.",
    href: "/catalog/inventory",
    icon: Layers3,
  },
  {
    title: "Product Inventory",
    description: "Manage product stock assigned to store locations.",
    href: "/catalog/product-inventory",
    icon: ClipboardList,
  },
];

export default function CataloguePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/"
            aria-label="Return to dashboard"
            className="
              flex size-10 shrink-0 items-center justify-center
              rounded-xl border border-border bg-white
              text-muted transition-all duration-200
              hover:border-primary hover:bg-primary-light
              hover:text-primary
            "
          >
            <ArrowLeft className="size-4" />
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Catalogue
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Manage product classifications, suppliers, pricing and inventory
              configuration.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Catalogue sections</h2>

              <p className="mt-1 text-xs text-muted">
                Select a section to view and manage its records.
              </p>
            </div>

            <span
              className="
                rounded-full bg-primary-light px-3 py-1.5
                text-[11px] font-semibold text-primary
              "
            >
              {catalogueSections.length} sections available
            </span>
          </div>

          <div
            className="
              mt-5 grid gap-4
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {catalogueSections.map((section) => (
              <CatalogueCard
                key={section.href}
                title={section.title}
                description={section.description}
                href={section.href}
                icon={section.icon}
              />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
