import { ColumnDef } from "@tanstack/react-table"
import { Client } from "@/types/Client"
import { DrawerClient } from "@/components/drawerClient";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { formatarCNPJ, formatarTelefone } from "@/helpers/registerHelper";
import { Sheets } from "@/components/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Client>[] = [
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
                    CPF/CNPJ
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return formatarCNPJ(row.original.cpf_cnpj);
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
                    Visão detalhada
                </p>
            )
        },
        id: "details",
        cell: ({ }) => {
            return (
                <DrawerClient />
            )
        }
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
        cell: ({ }) => {
            const fields = [
                { name: 'cliente', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
                { name: 'cpf_cnpj', label: 'CPF/CNPJ', type: 'text', placeholder: 'Digite o CPF/CNPJ' },
                { name: 'contato', label: 'Telefone', type: 'text', placeholder: 'Digite o telefone' },
                { name: 'endereco', label: 'Endereço', type: 'text', placeholder: 'Digite o endereço' },
            ];
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Sheets
                            text="Editar"
                            title='Editar cliente'
                            fields={fields}
                        />
                        <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },


]
