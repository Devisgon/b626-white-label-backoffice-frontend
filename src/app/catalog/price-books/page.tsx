import { PackageCheck } from "lucide-react";

import { CatalogueSectionPlaceholder } from "@/features/catalogue/components";

export default function PriceBooksPage() {
  return (
    <CatalogueSectionPlaceholder
      title="Price Books"
      description="Manage product pricing rules and price books."
      icon={PackageCheck}
    />
  );
}