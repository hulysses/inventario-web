import { Sheets } from '@/components/sheet';
import { useDialog } from '@/hooks/useDialog';
import { Button } from '@/components/ui/button';
import { useSuppliers } from '@/hooks/useSuppliers';
import { CheckCircle, XCircle } from "lucide-react";
import { DialogHeader } from '@/components/ui/dialog';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/table/columnsTable/columnsTableSupplier';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { TableFilter } from '@/components/table/table-filter';
import { useDataTable } from '@/hooks/useDataTable';

export function Suppliers() {
  const { 
    suppliers, 
    fetchSuppliers, 
    fields, 
    editingSupplier, 
    handleEdit, 
    handleCreate, 
    isSheetOpen, 
    setIsSheetOpen 
  } = useSuppliers();
  const { dialogOpen, setDialogOpen, cadastroSucesso, handleDialogOpen, handleCadastroSucesso } = useDialog();
  const { table } = useDataTable(columns(handleEdit), suppliers);
  const filters = ['nome', 'contato'];

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
          Novo fornecedor
        </Button>
      </div>
      <DataTable
        columns={columns(handleEdit)}
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{cadastroSucesso ? "Operação Realizada" : "Erro na Operação"}</DialogTitle>
            <DialogDescription>
              {cadastroSucesso ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Operação realizada com sucesso!
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <XCircle className="mr-2 h-5 w-4" />
                  Houve um erro na operação.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setDialogOpen(false)}>Fechar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}