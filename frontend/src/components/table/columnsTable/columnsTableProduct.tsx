import { Product } from "@/types/Product.ts";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const columns = (handleEdit: (product: Product) => void, deleteSupplier: (productId: number) => void): ColumnDef<Product>[] => [
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
        accessorKey: "descricao",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Descrição
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "preco",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Preço
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "quantidade",
        header: ({ column }) => {
            return (
                <Button
                    className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Quantidade
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

            const isAdmin = localStorage.getItem('isAdmin') === '1';
            const data = row.original;

            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button disabled={!isAdmin} variant="ghost" className="h-8 w-8 p-0">
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(data)} >
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteSupplier(data.id)}>
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];