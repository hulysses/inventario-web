import { Plus } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Sheets } from '@/components/sheet';
import { Button } from '@/components/ui/button';
import { useSuppliers } from '@/hooks/useSuppliers';
import { useDataTable } from '@/hooks/useDataTable';
import { DataTable } from '@/components/table/data-table';
import { TableFilter } from '@/components/table/table-filter';
import { ConfirmationDialog } from '@/components/dialog/confirm';
import { columns } from '@/components/table/columnsTable/columnsTableSupplier';

export function Suppliers() {
  //Hook que controla a tabela de fornecedores
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
  const supplierQuantity = suppliers.length;
  const { table } = useDataTable(columns(handleEdit, confirmDelete), suppliers); // Inicializa a tabela de dados
  const filters = ['nome', 'contato']; //  Inicializa os filtros da tabela
  const isAdmin = localStorage.getItem('isAdmin') === '1';

  // Função para confirmar a exclusão de um fornecedor
  const handleConfirmDelete = async () => {
    try {
      const response = await deleteSupplier();
      if (response) {
        toast('Fornecedor excluído com sucesso!');
      } else {
        toast('Erro ao excluir fornecedor. O mesmo pode ter produtos vinculados.');
      }
    } catch (error) {
      toast('Erro ao excluir fornecedor. O mesmo pode ter produtos vinculados.');
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 bg-background mx-7 mb-7 rounded-xl">
      <h1 className="font-bold text-2xl text-primary">Gerenciamento de fornecedores</h1>
      <h3 className="font-light text-muted-foreground">Gerencie seus fornecedores, podendo editar, excluir ou criar novos!</h3>
      <div className="flex items-center justify-end space-x-4 mt-7">
        <h1 className="font-bold text-2xl -ml-0 flex mx-auto">Fornecedores <p className="ml-5 text-gray-400">{supplierQuantity}</p></h1>
        {filters.map((column) => ( // Mapeia os filtros e os renderiza
          <TableFilter
            key={column}
            table={table}
            column={column}
            placeholder={`Filtrar ${column} ...`}
          />
        ))}
        <Button disabled={!isAdmin} onClick={handleCreate} className="bg-orange hover:bg-orangeHover text-white font-semibold mx-auto">
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
        title={editingSupplier ? "Editar fornecedor" : "Cadastro de fornecedor"}
        fields={fields}
        initialData={editingSupplier || {}}
        apiEndpoint={`http://localhost:3000/suppliers${editingSupplier ? `?id=${editingSupplier.id}` : ''}`}
        method={editingSupplier ? 'put' : 'post'}
        onSuccess={() => {
          fetchSuppliers();
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
  );
}