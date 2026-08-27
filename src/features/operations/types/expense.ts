export interface OperationsExpense { id: number; category: string; description: string | null; amount: number; location_id: string | null; expense_date: string; payment_method: string | null; status: string; created_at: string; updated_at: string; deleted_at: string | null; }
export interface CreateExpensePayload { category: string; description?: string; amount: number; location_id?: string; expense_date: string; payment_method?: string; status?: string; }
export type UpdateExpensePayload = Partial<CreateExpensePayload>;

