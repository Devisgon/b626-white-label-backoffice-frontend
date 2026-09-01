import { z } from "zod";
export const posConnectionSchema = z.object({
  siteName: z.string().min(2),
  serviceId: z.string().min(1),
  externalSiteId: z.string().min(1),
  provider: z.string().min(1),
  connectionMode: z.enum(["file_xml", "api", "sftp"]),
  commanderRelease: z.string().optional(),
  notes: z.string().optional(),
});
export const posMappingSchema = z.object({
  internalEntityType: z.string().min(1),
  internalEntityId: z.string().min(1),
  externalEntityType: z.string().min(1),
  externalEntityKey: z.string().min(1),
  externalParentKey: z.string().optional(),
  externalDisplayName: z.string().optional(),
  isRequired: z.boolean(),
});
