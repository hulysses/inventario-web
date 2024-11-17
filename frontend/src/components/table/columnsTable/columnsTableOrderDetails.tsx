import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { OrderItens } from "@/types/OrderItens";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/dialog/confirm";

export const columns = (
  handleDeleteItem: (id: number) => void
): ColumnDef<OrderItens>[] => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);

  const confirmDelete = (id: number) => {
    setItemIdToDelete(id);
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemIdToDelete !== null) {
      handleDeleteItem(itemIdToDelete);
      setIsOpen(false);
      setItemIdToDelete(null);
    }
  };

  return [
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
      cell: ({ row }) => {
        const id = row.original.id;
        return id;
      },
    },
    {
      accessorKey: "data_adicao",
      header: ({ column }) => {
        return (
          <Button
            className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de Adição
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const dateValue = row.original.data_adicao;
        return dateValue ? new Date(dateValue).toLocaleDateString() : "N/A";
      },
    },
    {
      accessorKey: "produtoNome",
      header: ({ column }) => {
        return (
          <Button
            className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome do Item
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => row.original.produtoNome,
    },
    {
      accessorKey: "produtoValor",
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
      cell: ({ row }) => row.original.produtoValor,
    },
    {
      id: "delete",
      header: "Ações",
      cell: ({ row }) => {
        const itemId = row.original.id;
        return (
          <>
            <Button onClick={() => confirmDelete(itemId)} variant="ghost">
              <Trash2 />
            </Button>
            {isOpen && (
              <ConfirmationDialog
                isOpen={isOpen}
                onConfirm={handleConfirmDelete}
                onClose={() => setIsOpen(false)}
                title="Confirmar exclusão"
                description="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
              />
            )}
          </>
        );
      },
    },
  ];
};
