import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@/types/Transaction";

interface ColumnsProps {
    getClientName: (clienteId: number) => string;
    getSupplierName: (supplierId: number) => string;
    handleEdit: (transaction: Transaction) => void;
    confirmDelete: (transactionId: number) => void;
}

export const columns = ({
    getClientName, handleEdit, confirmDelete,
}: ColumnsProps): ColumnDef<Transaction>[] => [
        {
            accessorKey: "transaction_date",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Data do Pedido
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const dateValue = row.original.transaction_date;
                return dateValue ? new Date(dateValue).toLocaleDateString() : 'N/A';
            }
        },
        {
            accessorKey: "clientId",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nome do Cliente
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const clienteId = row.original.clientId;
                const clienteNome = getClientName(clienteId);

                return <span>{clienteNome}</span>
            }
        },
        {
            accessorKey: "supplier",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nome do Fornecedor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "transaction_type",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Total
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const value = row.original.transaction_type;
                return value;
            }
        },

        {
            accessorKey: "transaction_value",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Total
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const value = row.original.transaction_value;
                return value ? `R$ ${value.toFixed(2)}` : `Valor não fornecido`
            }
        },

        {
            header: ({ }) => {
                return <p className="text-base font-semibold text-white">Ações</p>;
            },
            id: "actions",
            cell: ({ row }) => {
                const data = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <EllipsisVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(data)}>
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => confirmDelete(data.id)}>
                                Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
