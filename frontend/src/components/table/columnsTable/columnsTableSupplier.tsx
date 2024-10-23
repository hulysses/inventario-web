import { ColumnDef } from "@tanstack/react-table";

export type Supplier = {
    id: number,
    nome: string,
    cnpj: string,
    contato: string,
    endereco: string
};

export const columns: ColumnDef<Supplier>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "cnpj",
        header: "CNPJ",
    },
    {
        accessorKey: "contato",
        header: "Contato",
    },
    {
        accessorKey: "endereco",
        header: "Endereço",
    },
];