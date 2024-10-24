import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

interface FilterProps<TData> {
  table: Table<TData>
  column: string
  placeholder?: string
}

export function TableFilter<TData>({ table, column, placeholder }: FilterProps<TData>) {
  return (
    <Input
      placeholder={placeholder || `${column}`}
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
      className="max-w-sm border"
    />
  )
}