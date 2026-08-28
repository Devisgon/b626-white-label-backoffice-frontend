export type CrudValue = string | number | null;
export type CrudRecord = Record<string, CrudValue> & {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
export interface CrudField {
  key: string;
  label: string;
  type: "text" | "number" | "datetime-local" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  table?: boolean;
  currency?: boolean;
}
export interface CrudResourceConfig {
  title: string;
  singular: string;
  description: string;
  route: string;
  endpoint: string;
  statuses: string[];
  searchKeys: string[];
  fields: CrudField[];
  schema: z.ZodType<Record<string, unknown>>;
  records: CrudRecord[];
}
export function stripCrudSchema(
  config: CrudResourceConfig,
): CrudResourceConfig {
  const plain = { ...config };
  Reflect.deleteProperty(plain, "schema");
  return plain;
}
import type { z } from "zod";
