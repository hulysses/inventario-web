import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: number
    createdAt: Date
    nome: string
    email: string
    senha: string
}

export const columns: ColumnDef<Payment>[] = [
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
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "image",
        header: "Imagem",
    },
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "createdAt",
        header: "Data Criado",
    },
    {
        accessorKey: "email",
        header: "E-mail",
    },
    {
        accessorKey: "senha",
        header: "Senha",
    },
]
