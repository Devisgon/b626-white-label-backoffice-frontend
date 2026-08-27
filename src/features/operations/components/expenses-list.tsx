"use client";
import { CrudList } from "@/components/shared";
import { stripCrudSchema } from "@/types/crud-resource";
import { expenseConfig } from "../expense-demo-data";
export function ExpensesList() { return <CrudList config={stripCrudSchema(expenseConfig)} />; }
