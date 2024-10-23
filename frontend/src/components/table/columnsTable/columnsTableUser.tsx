import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

export type Client = {
    id: number,
    nome: string,
    cpf_cnpj: string
    contato: string
    endereco: string
    createdAt: string,
}

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
        header: "contato",
    },
    {
        accessorKey: "endereco",
        header: "endereco",
    },
    {
        accessorKey: "createdAt",
        header: "createdAt",
    },
    {
        accessorKey: "mais_informacoes",
        header: "",
    },
]
