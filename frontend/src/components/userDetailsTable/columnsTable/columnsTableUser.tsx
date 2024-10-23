import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Client } from "@/@types/Client"

export const columns: ColumnDef<Client>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: true,
        enableHiding: true,
    },

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
        accessorKey: "mais_informacoes",
        header: "",
    },
]
