import {
    ColumnDef, flexRender, getPaginationRowModel, getCoreRowModel, useReactTable,
    VisibilityState, SortingState, getSortedRowModel, ColumnFiltersState, getFilteredRowModel
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import React from "react";
import { Button } from "../ui/button";
<<<<<<< HEAD
import { TableFilter } from "./table-filter";
=======
import { ArrowRight } from "lucide-react";
>>>>>>> main

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
    filters?: string[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filters = []
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
            sorting,
            columnFilters
        },
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <div >
            {filters.length > 0 && (
                <div className="flex items-center py-4 space-x-4">
                    {filters.map((column) => (
                        <TableFilter key={column} table={table} column={column} placeholder={`Filtrar ${column}...`} />
                    ))}
<<<<<<< HEAD
                </div>
            )}
            <div className="overflow-hidden rounded-md border border-gray-200">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="bg-blue text-white"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
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
=======
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                                <Button type="button" className="border-solid border-2 border-gray-200" variant={'ghost'}>
                                    Mais detalhes
                                    <ArrowRight className="ml-3 w-5" />
                                </Button>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div >
>>>>>>> main
    )
}