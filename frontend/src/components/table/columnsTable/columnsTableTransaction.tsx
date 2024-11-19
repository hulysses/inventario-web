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
    getClientName: (clientId: number) => string;
    getSupplierName: (supplierId: number) => string;
    handleEdit: (transaction: Transaction) => void;
    confirmDelete: (transactionId: number) => void;
}

export const columns = ({
    getClientName, handleEdit, confirmDelete, getSupplierName
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
                const clientId = row.original.clientId;
                const clienteNome = getClientName(clientId);

                return <span>{clienteNome}</span>
            }
        },
        {
            accessorKey: "supplierId",
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
            cell: ({ row }) => {
                const supplierId = row.original.supplierId;
                const supplierNome = getSupplierName(supplierId);

                return <span>{supplierNome}</span>;
            }
        },
        {
            accessorKey: "transaction_type",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Entrada/Saída
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const value = row.original.transaction_type;

                const colorClass =
                    value === "entrada" ? "bg-green-500" : "bg-red-500";

                return (
                    <div
                        className={`flex items-center justify-center w-24 h-8 rounded text-white font-bold ${colorClass}`}
                    >
                        {value === "entrada" ? "Entrada" : "Saída"}
                    </div>
                );
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
                const type = row.original.transaction_type;

                const colorClass =
                    type === "entrada" ? "bg-green-500" : "bg-red-500";

                return (
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-4 h-4 rounded ${colorClass}`}
                            title={type}
                        ></div>
                        <span>{`R$ ${value},00`}</span>
                    </div>
                );
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
