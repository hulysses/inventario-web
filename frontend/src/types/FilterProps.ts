import { Table } from "@tanstack/react-table";

export interface FilterProps<TData> {
    table: Table<TData>
    column: string
    placeholder?: string
  }