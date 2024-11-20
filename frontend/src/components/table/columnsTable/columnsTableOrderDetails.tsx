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
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <Button
            className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Item
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => row.original.nome,
    },
    {
      accessorKey: "preco_unitario",
      header: ({ column }) => {
        return (
          <Button
            className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Preço unitário
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        let preco = row.getValue("preco_unitario");
        if (typeof preco === "string") {
          preco = parseFloat(preco.replace(",", "."));
        }

        if (typeof preco === "number" && !isNaN(preco)) {
          const formatted = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(preco);
          return formatted;
        }

        return <div>Valor inválido</div>;
      },
    },
    {
      accessorKey: "quantidade",
      header: ({ column }) => {
        return (
          <Button
            className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantidade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => row.original.quantidade,
    },
    {
      id: "delete",
      header: "Ações",
      cell: ({ row }) => {
        const itemId = row.original.id;
        return (
          <>
            <Button
              onClick={() => confirmDelete(itemId)}
              variant="ghost"
              className="hover:bg-inherit p-0"
            >
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
