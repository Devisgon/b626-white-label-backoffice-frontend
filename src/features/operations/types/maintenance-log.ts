export interface OperationsMaintenanceLog { id: number; title: string; description: string | null; location_id: string | null; priority: string | null; reported_by: string | null; status: string; created_at: string; updated_at: string; deleted_at: string | null; }
export interface CreateMaintenanceLogPayload { title: string; description?: string; location_id?: string; priority?: string; reported_by?: string; status?: string; }
export type UpdateMaintenanceLogPayload = Partial<CreateMaintenanceLogPayload>;

