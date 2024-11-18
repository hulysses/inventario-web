import { toast, Toaster } from "sonner";
import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import { Sheets } from "@/components/sheetOrders";
import { useDataTable } from "@/hooks/useDataTable";
import { DataTable } from "@/components/table/data-table";
import { TableFilter } from "@/components/table/table-filter";
import { ConfirmationDialog } from "@/components/dialog/confirm";
import { columns } from "@/components/table/columnsTable/columnsTableOrder";

export const Orders = () => {
  const {
    orders,
    fetchOrders,
    fields,
    editingOrder,
    handleEdit,
    handleCreate,
    isSheetOpen,
    setIsSheetOpen,
    confirmDelete,
    deleteOrder,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
    selectOptions,
    getClientName,
  } = useOrders();

  const orderQuantity = orders.length;

  const { table } = useDataTable(
    columns({
      getClientName,
      handleEdit,
      confirmDelete,
    }),
    orders
  );

  const filters = ["status", "data"];

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteOrder();
      if (response) {
        toast("Pedido excluído com sucesso!");
      } else {
        toast("Erro ao excluir pedido. O mesmo pode ter itens vinculados.");
      }
    } catch (error) {
      toast("Erro ao excluir pedido. O mesmo pode ter itens vinculados.");
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 bg-background mx-7 mb-7 rounded-xl">
      <h1 className="font-bold text-2xl text-primary">
        Gerenciamento de pedidos
      </h1>
      <h3 className="font-light text-muted-foreground">
        Gerencie seus pedidos, podendo alterar, excluir ou criar novos.
      </h3>
      <div className="flex items-center justify-end space-x-4 mt-7">
        <h1 className="font-bold text-2xl -ml-0 flex mx-auto">
          Pedidos <p className="ml-5 text-gray-400">{orderQuantity}</p>
        </h1>

        <Button
          variant={"outline"}
          className="p-2 ml-2 mx-auto"
          onClick={fetchOrders}
        >
          <RefreshCcw />
        </Button>

        {filters.map((column) => (
          <TableFilter
            key={column}
            table={table}
            column={column}
            placeholder={`Filtrar ${column}...`}
          />
        ))}
        <Button
          onClick={handleCreate}
          className="bg-orange hover:bg-orangeHover text-white font-semibold mx-auto"
        >
          <Plus className="w-4 mr-1" />
          Novo pedido
        </Button>
      </div>
      <DataTable
        columns={columns({ getClientName, handleEdit, confirmDelete })}
        table={table}
      />
      <Sheets
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title={editingOrder ? "Editar pedido" : "Cadastro de pedido"}
        fields={[...fields]}
        initialData={editingOrder || { status: "pendente" }}
        apiEndpoint={`http://localhost:3000/orders${
          editingOrder ? `?id=${editingOrder.pedidoId}` : ""
        }`}
        method={editingOrder ? "put" : "post"}
        onSuccess={() => {
          fetchOrders();
          setIsSheetOpen(false);
        }}
        selectOptions={selectOptions}
      />
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita."
      />
      <Toaster />
    </div>
  );
};
