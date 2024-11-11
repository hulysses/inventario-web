import { Plus } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Sheets } from "@/components/sheet";
import { Button } from "@/components/ui/button";
import { useClients } from "@/hooks/useClients";
import { useDataTable } from "@/hooks/useDataTable";
import { DataTable } from "@/components/table/data-table"
import { TableFilter } from "@/components/table/table-filter";
import { ConfirmationDialog } from "@/components/dialog/confirm";
import { columns } from "@/components/table/columnsTable/columnsTableClient";

export const ClientTable = () => {
    const {
        clients,
        fetchClients,
        fields,
        editingClient,
        handleEdit,
        handleCreate,
        isSheetOpen,
        setIsSheetOpen,
        confirmDelete,
        deleteClient,
        isConfirmDialogOpen,
        setIsConfirmDialogOpen
    } = useClients();

    const clientQuantity = clients.length;

    const { table } = useDataTable(columns(handleEdit, confirmDelete), clients);
    const filters = ['nome', 'cpf_cnpj'];
    const isAdmin = localStorage.getItem('isAdmin') === '1';

    const handleConfirmDelete = async () => {
        try {
            await deleteClient();
            toast('Cliente excluído com sucesso!');
        } catch (error) {
            toast('Erro ao excluir cliente.');
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-background mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl text-primary">Gerenciamento de clientes</h1>
            <h3 className="font-light text-muted-foreground">Gerencie seus clientes, podendo alterar, excluir ou criar novos.</h3>
            <div className="flex items-center justify-end space-x-4 mt-7">
                <h1 className="font-bold text-2xl -ml-0 flex mx-auto">Clientes <p className="ml-5 text-gray-400">{clientQuantity}</p></h1>
                {filters.map((column) => (
                    <TableFilter
                        key={column}
                        table={table}
                        column={column}
                        placeholder={`Filtrar ${column} ...`}
                    />
                ))}
                <Button disabled={!isAdmin} onClick={handleCreate} className="bg-orange hover:bg-orangeHover text-white font-semibold mx-auto">
                    <Plus className='w-4 mr-1' />
                    Novo cliente
                </Button>
            </div>
            <DataTable
                columns={columns(handleEdit, confirmDelete)}
                table={table}
            />
            <Sheets
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                title={editingClient ? "Editar cliente" : "Cadastro de cliente"}
                fields={fields}
                initialData={editingClient || {}}
                apiEndpoint={`http://localhost:3000/clients${editingClient ? `?id=${editingClient.id}` : ''}`}
                method={editingClient ? 'put' : 'post'}
                onSuccess={() => {
                    fetchClients();
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
    )
}
