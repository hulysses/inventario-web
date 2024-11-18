import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Order } from "@/types/Order";

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "data_compraId",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data do Pedido
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const dateValue = row.original.data;
            return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
        }
    },
    {
        accessorKey: "statusId",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status do Pedido
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const statusValue = row.original.status;
            return statusValue || 'Sem Status';
        }
    },
    {
        accessorKey: "fornecedorId",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fornecedor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const supplierName = row.original.clienteId;
            return supplierName || 'Fornecedor Desconhecido';

        }
    },
    {
        accessorKey: "precoId",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Valor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const value = row.original.total;
            return value ? `R$ ${value.toFixed(2)}` : `R$ 0,00`
        }
    },
]
