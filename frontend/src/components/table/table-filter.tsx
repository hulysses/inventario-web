import { Input } from "@/components/ui/input";
import { FilterProps } from "@/types/FilterProps";

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