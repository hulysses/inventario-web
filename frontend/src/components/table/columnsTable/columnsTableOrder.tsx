import { ColumnDef } from "@tanstack/react-table";
import { DrawerClient } from "@/components/drawerClient";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order } from "@/types/Order";

export const columns = (
  handleEdit: (order: Order) => void,
  deleteSupplier: (orderId: number) => void
): ColumnDef<Order>[] => [
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
  },
  {
    accessorKey: "Total",
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
  },

  {
    header: ({}) => {
      return (
        <p className="text-base font-semibold text-white">Itens do Pedido</p>
      );
    },
    id: "details",
    cell: ({}) => {
      return <DrawerClient />;
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
            <DropdownMenuItem onClick={() => deleteSupplier(data.id)}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
