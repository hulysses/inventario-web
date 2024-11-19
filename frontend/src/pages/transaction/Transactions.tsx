import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columnsTable/columnsTableTransaction";
import { useDataTable } from "@/hooks/useDataTable";
import { TableFilter } from "@/components/table/table-filter";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/dialog/confirm";
import { Plus, RefreshCcw } from "lucide-react";
import { Sheets } from "@/components/sheetTransactions";
import { toast, Toaster } from "sonner";
import { useTransactions } from "@/hooks/useTransactions";

export const Transactions = () => {
    const {
        transactions,
        fetchTransactions,
        fields,
        editingTransaction,
        handleEdit,
        handleCreate,
        isSheetOpen,
        setIsSheetOpen,
        confirmDelete,
        deleteTransaction,
        isConfirmDialogOpen,
        setIsConfirmDialogOpen,
        clientOptions,
        supplierOptions,
        getClientName,
        getSupplierName,
    } = useTransactions();

    const transactionQuantity = transactions.length;

    const { table } = useDataTable(
        columns({
            getClientName,
            getSupplierName,
            handleEdit,
            confirmDelete,
        }),
        transactions
    );

    const filters = ["transaction_type", "clientId"];

    const handleConfirmDelete = async () => {
        try {
            await deleteTransaction();
            toast("Transação excluído com sucesso!");
        } catch (error) {
            toast("Erro ao excluir transação.");
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl">Gerenciamento de transações</h1>
            <h3 className="font-light text-gray-500">
                Gerencie suas transações, podendo alterar, excluir ou criar novos.
            </h3>
            <div className="flex items-center space-x-4">
                <h1 className="font-bold text-2xl mt-20 -ml-0 flex mx-auto">
                    Transações <p className="ml-5 text-gray-400">{transactionQuantity}</p>
                </h1>

                <Button
                    variant={"outline"}
                    className="p-2 ml-2 mt-20"
                    onClick={fetchTransactions}
                ><RefreshCcw /></Button>

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
                    Nova transação
                </Button>
            </div>
            <DataTable columns={columns({ getClientName, handleEdit, confirmDelete, getSupplierName })} table={table} />
            <Sheets
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                title={editingTransaction ? "Editar pedido" : "Cadastro de pedido"}
                fields={fields}
                initialData={editingTransaction || {}}
                apiEndpoint={`http://localhost:3000/transactions${editingTransaction ? `?id=${editingTransaction.id}` : ""}`}
                method={editingTransaction ? "put" : "post"}
                onSuccess={() => {
                    fetchTransactions();
                    setIsSheetOpen(false);
                }}
                selectOptions={{ clientOptions, supplierOptions }} />
            <ConfirmationDialog
                isOpen={isConfirmDialogOpen}
                onClose={() => setIsConfirmDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar exclusão"
                description="Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita."
            />
            <Toaster />
        </div>
    )
}