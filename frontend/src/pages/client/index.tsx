import { DataTable } from "@/components/table/data-table"
import { columns } from "@/components/table/columnsTable/columnsTableClient";

import { useDataTable } from "@/hooks/useDataTable";
import { TableFilter } from "@/components/table/table-filter";
import { useClients } from "@/hooks/useClients";
import { useDialog } from "@/hooks/useDialog";
import { Button } from "@/components/ui/button";
import { SuccessDialog } from "@/components/dialog/success";
import { ConfirmationDialog } from "@/components/dialog/confirm";
import { Plus } from "lucide-react";
import { Sheets } from "@/components/sheet";

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

    const { dialogOpen, setDialogOpen, cadastroSucesso, handleDialogOpen, handleCadastroSucesso } = useDialog();

    const clientQuantity = clients.length;
    const { table } = useDataTable(columns(handleEdit, confirmDelete), clients);
    const filters = ['nome', 'contato'];

    const handleConfirmDelete = async () => {
        const success = await !!deleteClient();
        handleCadastroSucesso(success, fetchClients);
        setDialogOpen(true);
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl">Gerenciamento de clientes</h1>
            <h3 className="font-light text-gray-500">Gerencie seus clientes, podendo alterar, excluir ou criar novos.</h3>
            <div className="flex items-center space-x-4">

                <h1 className="font-bold text-2xl mt-20 -ml-0 flex mx-auto">Clientes <p className="ml-5 text-gray-400">{clientQuantity}</p></h1>
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

                <Button onClick={handleCreate} className="bg-orange hover:bg-orangeHover text-white font-semibold mt-20">
                    <Plus className='w-4 mr-1' />
                    Novo fornecedor
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
                onDialogOpen={handleDialogOpen}
                onCadastroSucesso={(sucesso) => handleCadastroSucesso(sucesso, fetchClients)}
            />
            <SuccessDialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                isSuccess={cadastroSucesso}
            />
            <ConfirmationDialog
                isOpen={isConfirmDialogOpen}
                onClose={() => setIsConfirmDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar exclusão"
                description="Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
            />
        </div>
    )
}
