import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ClientDetails } from "@/types/ClientDetails"

export const columns: ColumnDef<ClientDetails>[] = [
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
        accessorKey: "data_compraId",
        header: "Data de Compra",
    },
    {
        accessorKey: "statusId",
        header: "Status",
    },
    {
        accessorKey: "fornecedorId",
        header: "Fornecedor",
    },
    {
        accessorKey: "precoId",
        header: "Preço",
    },
]
