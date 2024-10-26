
import { Button } from "../ui/button";
import { TableFilter } from "./table-filter";
import { DataTableProps } from "@/types/DataTableProps";
import { useDataTable } from "@/hooks/useDataTable";
import { flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DataTable<TData, TValue>({
    columns,
    data,
    filters = [],
    actionComponent,
}: DataTableProps<TData, TValue>) {
    const { table } = useDataTable(columns, data);

    return (
        <div>
            <div className="flex items-center justify-end py-4 space-x-4">
                {filters.length > 0 && (
                    <div className="flex space-x-4">
                        {filters.map((column) => (
                            <TableFilter
                                key={column}
                                table={table}
                                column={column}
                                placeholder={`Filtrar ${column}...`}
                            />
                        ))}
                    </div>
                )}
                {actionComponent && <div>{actionComponent}</div>}
            </div>

            <div className="overflow-hidden rounded-md border border-gray-200">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="bg-blue text-white">
                                        {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    className="border-blue text-blue font-bold hover:border-blueHover hover:text-blueHover"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    className="bg-blue font-bold hover:bg-blueHover"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Próximo
                </Button>
            </div>
        </div>
    );
}