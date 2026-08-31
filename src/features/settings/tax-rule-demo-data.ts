import type {
  TaxRule,
} from "./types";

export const demoTaxRules: TaxRule[] = [
  {
    id: "tax-001",
    name: "Standard GST",
    ratePercent: 17,
    locationId: null,
    locationName: "All locations",
    isActive: true,
  },
  {
    id: "tax-002",
    name: "Reduced Rate",
    ratePercent: 5,
    locationId: "loc-001",
    locationName: "Phoenix Store",
    isActive: true,
  },
  {
    id: "tax-003",
    name: "Zero Rated",
    ratePercent: 0,
    locationId: null,
    locationName: "All locations",
    isActive: false,
  },
];