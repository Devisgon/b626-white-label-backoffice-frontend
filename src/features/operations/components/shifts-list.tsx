"use client";
import { CrudList } from "@/components/shared";
import { stripCrudSchema } from "@/types/crud-resource";
import { shiftConfig } from "../shift-demo-data";
export function ShiftsList() { return <CrudList config={stripCrudSchema(shiftConfig)} />; }
