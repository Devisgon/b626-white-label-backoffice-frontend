import { maintenanceLogSchema } from "./schemas";
import type { CrudResourceConfig } from "@/types/crud-resource";
export const maintenanceLogConfig: CrudResourceConfig = {
  title: "Maintenance Logs",
  singular: "maintenance log",
  description: "Track equipment issues, priorities and repair progress.",
  route: "/operations/maintenance-logs",
  endpoint: "/operations/maintenance-logs",
  statuses: ["Reported", "In Progress", "Resolved", "Cancelled"],
  searchKeys: ["title", "description", "reported_by", "status"],
  schema: maintenanceLogSchema,
  fields: [
    { key: "title", label: "Title", type: "text", required: true, table: true },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      required: false,
      table: true,
    },
    {
      key: "location_id",
      label: "Location",
      type: "select",
      required: false,
      table: false,
      options: ["b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d"],
    },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      required: false,
      table: true,
      options: ["Low", "Medium", "High", "Critical"],
    },
    {
      key: "reported_by",
      label: "Reported by",
      type: "text",
      required: false,
      table: true,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      required: true,
      table: true,
      options: ["Reported", "In Progress", "Resolved", "Cancelled"],
    },
  ],
  records: [
    {
      id: 1,
      title: "Pump 2 not dispensing",
      description: "Nozzle requires technician",
      location_id: "b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d",
      priority: "High",
      reported_by: "Ali Raza",
      status: "In Progress",
      created_at: "2026-08-27T10:00:00.000Z",
      updated_at: "2026-08-27T10:00:00.000Z",
      deleted_at: null,
    },
    {
      id: 2,
      title: "Store-room light",
      description: "Replace light fitting",
      location_id: "b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d",
      priority: "Low",
      reported_by: "Sara Khan",
      status: "Reported",
      created_at: "2026-08-27T10:00:00.000Z",
      updated_at: "2026-08-27T10:00:00.000Z",
      deleted_at: null,
    },
  ],
};
export function findDemoMaintenanceLog(id: number) {
  return maintenanceLogConfig.records.find((item) => item.id === id);
}
