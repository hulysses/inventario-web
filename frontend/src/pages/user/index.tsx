import { useDataTable } from '@/hooks/useDataTable';
import { TableFilter } from '@/components/table/table-filter';
import { columns } from '@/components/table/columnsTable/columnsTableUser';
import { useUsers } from '@/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/table/data-table';
import { Sheets } from '@/components/sheet';
import { ConfirmationDialog } from '@/components/dialog/confirm';
import { toast, Toaster } from 'sonner';

export function Users() {
    const {
        users,
        editingUser,
        fields,
        handleCreate,
        handleEdit,
        confirmDelete,
        fetchUsers,
        isSheetOpen,
        setIsSheetOpen,
        isConfirmDialogOpen,
        deleteUser,
        setIsConfirmDialogOpen
    } = useUsers();
    const userQuantity = users.length;
    const { table } = useDataTable(columns(handleEdit, confirmDelete), users);
    const filters = ['nome', 'email'];

    const handleConfirmDelete = async () => {
        try {
            await deleteUser();
            toast('Usuário excluído com sucesso!');
        } catch (error) {
            toast('Erro ao excluir usuário.');
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-background mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl text-primary">Gerenciamento de usuários</h1>
            <h3 className="font-light text-muted-foreground">Gerencie seus usuários, podendo editar, excluir ou criar novos!</h3>
            <div className="flex items-center justify-end space-x-4 mt-7">
            <h1 className="font-bold text-2xl -ml-0 flex mx-auto">Usuários <p className="ml-5 text-gray-400">{userQuantity}</p></h1>
                {filters.map((column) => (
                    <TableFilter
                        key={column}
                        table={table}
                        column={column}
                        placeholder={`Filtrar ${column}...`}
                    />
                ))}
                <Button onClick={handleCreate} className="bg-orange hover:bg-orangeHover text-white font-semibold mx-auto">
                    <Plus className='w-4 mr-1' />
                    Novo usuário
                </Button>
            </div>
            <DataTable
                columns={columns(handleEdit, confirmDelete)}
                table={table}
            />
            <Sheets
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                title={editingUser ? "Editar usuário" : "Cadastro de usuário"}
                fields={fields}
                initialData={editingUser || {}}
                apiEndpoint={`http://localhost:3000/users${editingUser ? `?id=${editingUser.id}` : ''}`}
                method={editingUser ? 'put' : 'post'}
                onSuccess={() => {
                    fetchUsers();
                    setIsSheetOpen(false);
                }}
            />
            <ConfirmationDialog
                isOpen={isConfirmDialogOpen}
                onClose={() => setIsConfirmDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar exclusão"
                description="Tem certeza que deseja excluir este fornecedor? Esta ação não pode ser desfeita."
            />
            <Toaster />
        </div>
    )
}