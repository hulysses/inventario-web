import { ColumnDef } from "@tanstack/react-table"
import { Client } from "@/types/Client"
import { DrawerClient } from "@/components/drawerClient";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { formatarCNPJ, formatarTelefone } from "@/helpers/clientSupplierHelper";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const columns = (handleEdit: (client: Client) => void, deleteSupplier: (clientId: number) => void): ColumnDef<Client>[] => [
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
        accessorKey: "cpf_cnpj",
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
            const cpfCnpjValue = row.original.cpf_cnpj;

            if (cpfCnpjValue === null) {
                return null;
            } else {
                return formatarCNPJ(row.original.cpf_cnpj);

            }
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
            const telefoneValue = row.original.contato;

            if (telefoneValue == null) {
                return null;
            } else {
                return formatarTelefone(row.original.contato);
            }
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
        cell: ({ row }) => {
            const clienteId = row.original.id;
            return (

                <DrawerClient clienteId={clienteId} />
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
        cell: ({ row }) => {

            const isAdmin = localStorage.getItem('isAdmin') === '1';
            const data = row.original;

            return (
                <DropdownMenu>
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

]
