import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    filters?: string[],
    actionComponent?: React.ReactNode
}