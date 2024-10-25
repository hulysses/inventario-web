import { ColumnDef } from "@tanstack/react-table";
import { ClientDetails } from "@/types/ClientDetails";

export const columns: ColumnDef<ClientDetails>[] = [
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