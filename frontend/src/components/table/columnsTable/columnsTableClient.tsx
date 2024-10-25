import { ColumnDef } from "@tanstack/react-table"
import { Client } from "@/types/Client"
import { DrawerClient } from "@/components/drawerClient";

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "cpf_cnpj",
        header: "CPF/CNPJ",
    },
    {
        accessorKey: "contato",
        header: "Contato",
    },
    {
        accessorKey: "endereco",
        header: "Endereço",
    },
    {
        accessorKey: "createdAt",
        header: "Data Criado",
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
]
