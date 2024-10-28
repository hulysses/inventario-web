import { Table as TableInstance } from "@tanstack/react-table";

export interface DataTableProps<TData> {
    columns: any[],
    table: TableInstance<TData>
}