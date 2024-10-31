import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columnsTable/columnsTableOrder";
import { useDataTable } from "@/hooks/useDataTable";
import { TableFilter } from "@/components/table/table-filter";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/dialog/confirm";
import { Plus } from "lucide-react";
import { Sheets } from "@/components/sheet";
import { toast, Toaster } from "sonner";
import { useOrders } from "@/hooks/useOrders";

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
  } = useOrders();
  const orderQuantity = orders.length;
  const { table } = useDataTable(columns(handleEdit, confirmDelete), orders);
  const filters = ["status", "clienteId"];

  const handleConfirmDelete = async () => {
    try {
      await deleteOrder();
      toast("Pedido excluído com sucesso!");
    } catch (error) {
      toast("Erro ao excluir pedido.");
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
      <h1 className="font-bold text-2xl">Gerenciamento de pedidos</h1>
      <h3 className="font-light text-gray-500">
        Gerencie seus pedidos, podendo alterar, excluir ou criar novos.
      </h3>
      <div className="flex items-center space-x-4">
        <h1 className="font-bold text-2xl mt-20 -ml-0 flex mx-auto">
          Pedidos <p className="ml-5 text-gray-400">{orderQuantity}</p>
        </h1>
        <div className="grid grid-flow-col mt-20 gap-5">
          {filters.map((column) => (
            <TableFilter
              key={column}
              table={table}
              column={column}
              placeholder={`Filtrar ${column}...`}
            />
          ))}
        </div>

        <Button
          onClick={handleCreate}
          className="bg-orange hover:bg-orangeHover text-white font-semibold mt-20"
        >
          <Plus className="w-4 mr-1" />
          Novo cliente
        </Button>
      </div>
      <DataTable columns={columns(handleEdit, confirmDelete)} table={table} />
      <Sheets
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title={editingOrder ? "Editar pedido" : "Cadastro de pedido"}
        fields={fields}
        initialData={editingOrder || {}}
        apiEndpoint={`http://localhost:3000/clients${
          editingOrder ? `?id=${editingOrder.id}` : ""
        }`}
        method={editingOrder ? "put" : "post"}
        onSuccess={() => {
          fetchOrders();
          setIsSheetOpen(false);
        }}
      />
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
      />
      <Toaster />
    </div>
  );
};
