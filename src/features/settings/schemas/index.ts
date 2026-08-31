import { z } from "zod";

export const storeProfileSchema = z.object({
  storeName: z.string().trim().min(2, "Store name is required"),
  logoUrl: z.string().url("Enter a valid URL").or(z.literal("")),
  contactEmail: z.string().email("Enter a valid email").or(z.literal("")),
  contactPhone: z.string().trim().max(30),
  timezone: z.string().trim().min(1, "Timezone is required"),
  currency: z.string().trim().length(3, "Use a 3-letter currency code"),
});

export const taxRuleSchema = z.object({
  name: z.string().trim().min(2, "Tax rule name is required"),
  ratePercent: z.coerce.number().min(0).max(100),
  locationId: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type StoreProfileFormValues = z.input<typeof storeProfileSchema>;
export type TaxRuleFormValues = z.input<typeof taxRuleSchema>;
