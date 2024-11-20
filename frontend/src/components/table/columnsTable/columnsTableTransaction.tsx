import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/types/Transaction";
import { useTransactions } from "@/hooks/useTransactions";

export const columns: ColumnDef<Transaction>[] = [
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
      );
    },
  },
  {
    accessorKey: "data",
    header: ({ column }) => {
      return (
        <Button
          className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateValue = row.original.data;
      return dateValue
        ? new Date(dateValue).toLocaleDateString()
        : "Data inválida";
    },
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => {
      return (
        <Button
          className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo de transação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.original.tipo;
      const type = row.original.tipo;

      const colorClass = type === "entrada" ? "bg-green-500" : "bg-red-500";

      return (
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${colorClass}`} title={type}></div>
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "valor",
    header: ({ column }) => {
      return (
        <Button
          className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let valor = row.getValue("valor");
      if (typeof valor === "string") {
        valor = parseFloat(valor.replace(",", "."));
      }

      if (typeof valor === "number" && !isNaN(valor)) {
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(valor);
        return formatted;
      }

      return <div>Valor inválido</div>;
    },
  },
  {
    accessorKey: "product_id",
    header: "Produto",
    cell: ({ row }) => {
      const { getProductName } = useTransactions();
      return <span>{getProductName(row.original.product_id)}</span>;
    },
  },
  {
    accessorKey: "order_id",
    header: ({ column }) => {
      return (
        <Button
          className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pedido ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
