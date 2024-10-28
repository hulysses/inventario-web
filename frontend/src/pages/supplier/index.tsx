import { Sheets } from '@/components/sheet';
import { useDialog } from '@/hooks/useDialog';
import { Button } from '@/components/ui/button';
import { useSuppliers } from '@/hooks/useSuppliers';
import { useDataTable } from '@/hooks/useDataTable';
import { DataTable } from '@/components/table/data-table';
import { SuccessDialog } from '@/components/dialog/success';
import { TableFilter } from '@/components/table/table-filter';
import { ConfirmationDialog } from '@/components/dialog/confirm';
import { columns } from '@/components/table/columnsTable/columnsTableSupplier';
import { Plus } from 'lucide-react';

export function Suppliers() {
  const {
    suppliers,
    fetchSuppliers,
    fields,
    editingSupplier,
    handleEdit,
    handleCreate,
    isSheetOpen,
    setIsSheetOpen,
    confirmDelete,
    deleteSupplier,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen
  } = useSuppliers();
  const { dialogOpen, setDialogOpen, cadastroSucesso, handleDialogOpen, handleCadastroSucesso } = useDialog();
  const { table } = useDataTable(columns(handleEdit, confirmDelete), suppliers);
  const filters = ['nome', 'contato'];

  const handleConfirmDelete = async () => {
    const success = await !!deleteSupplier();
    handleCadastroSucesso(success, fetchSuppliers);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 bg-background mx-7 mb-7 rounded-xl">
      <h1 className="font-bold text-2xl text-primary">Gerenciamento de fornecedores</h1>
      <h3 className="font-light text-muted-foreground">Gerencie seus fornecedores, podendo editar, excluir ou criar novos!</h3>
      <div className="flex items-center justify-end space-x-4">
        {filters.map((column) => (
          <TableFilter
            key={column}
            table={table}
            column={column}
            placeholder={`Filtrar ${column}...`}
          />
        ))}
        <Button onClick={handleCreate} className="bg-orange hover:bg-orangeHover text-white font-semibold mx-auto">
          <Plus className='w-4 mr-1'/>
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
        title={editingSupplier ? "Editar fornecedor" : "Cadastro de fornecedor"}
        fields={fields}
        initialData={editingSupplier || {}}
        apiEndpoint={`http://localhost:3000/suppliers${editingSupplier ? `?id=${editingSupplier.id}` : ''}`}
        method={editingSupplier ? 'put' : 'post'}
        onDialogOpen={handleDialogOpen}
        onCadastroSucesso={(sucesso) => handleCadastroSucesso(sucesso, fetchSuppliers)}
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
        description="Tem certeza que deseja excluir este fornecedor? Esta ação não pode ser desfeita."
      />
    </div>
  );
}