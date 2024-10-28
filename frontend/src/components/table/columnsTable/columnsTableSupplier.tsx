import { Supplier } from "@/types/Supplier";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { formatarCNPJ } from "@/helpers/registerHelper";
import { formatarTelefone } from "@/helpers/registerHelper";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export const columns = (handleEdit: (supplier: Supplier) => void): ColumnDef<Supplier>[] => [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "nome",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "cnpj",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CNPJ
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return formatarCNPJ(row.original.cnpj);
        }
    },
    {
        accessorKey: "contato",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Telefone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return formatarTelefone(row.original.contato);
        }
    },
    {
        accessorKey: "endereco",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Endereço
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        header: ({ }) => {
            return (
                <p className="text-base font-semibold text-white">
                    Ações
                </p>
            )
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
                        <DropdownMenuItem onClick={() => handleEdit(data)} >
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(data)}>
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];