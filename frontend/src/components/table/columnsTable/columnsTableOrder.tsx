import { Order } from "@/types/Order";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DrawerOrder } from "@/components/drawerOrder";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColumnsProps {
  getClientName: (clienteId: number) => string;
  handleEdit: (order: Order) => void;
  confirmDelete: (orderId: number) => void;
}

export const columns = ({
  getClientName,
  handleEdit,
  confirmDelete,
}: ColumnsProps): ColumnDef<Order>[] => [
  {
    accessorKey: "pedidoId",
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
          Data do Pedido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateValue = row.original.data;
      return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
    },
  },
  {
    accessorKey: "clienteId",
    header: ({ column }) => {
      return (
        <Button
          className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const clienteId = row.original.clienteId;
      const clienteNome = getClientName(clienteId);

      return <span>{clienteNome}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      const statusStyle =
        status === "pendente"
          ? "bg-yellow-500 mr-1"
          : status === "concluido"
          ? "bg-green-500 mr-1"
          : "bg-gray-500";

      const statusText = status === "pendente" ? "Pendente" : "Concluído";

      return (
        <div className="flex items-center space-x-2">
          <div className={`inline-block w-4 h-4 rounded-full ${statusStyle}`} />
          {statusText}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let total = row.getValue("total");
      if (typeof total === "string") {
        total = parseFloat(total.replace(",", "."));
      }

      if (typeof total === "number" && !isNaN(total)) {
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(total);
        return formatted;
      }

      return <div>Valor inválido</div>;
    },
  },
  {
    header: ({}) => {
      return <p className="text-base font-semibold text-white">Itens</p>;
    },
    id: "details",
    cell: ({ row }) => {
      const orderId = row.original.pedidoId;
      return <DrawerOrder pedidoId={orderId} />;
    },
  },

  {
    header: ({}) => {
      return <p className="text-base font-semibold text-white">Ações</p>;
    },
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(data)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => confirmDelete(data.pedidoId)}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
