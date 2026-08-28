import { z } from "zod";
export const expenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  amount: z.coerce.number().min(0),
  location_id: z.string().uuid().optional().or(z.literal("")),
  expense_date: z.string().min(1, "Expense date is required"),
  payment_method: z.string().optional(),
  status: z.string().optional(),
});
export type ExpenseFormInput = z.input<typeof expenseSchema>;
export type ExpenseFormValues = z.output<typeof expenseSchema>;
