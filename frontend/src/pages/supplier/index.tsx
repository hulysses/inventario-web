import { Sheets } from '@/components/sheet';
import { useDialog } from '@/hooks/useDialog';
import { Button } from '@/components/ui/button';
import { useSuppliers } from '@/hooks/useSuppliers';
import { CheckCircle, XCircle } from "lucide-react";
import { DialogHeader } from '@/components/ui/dialog';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/table/columnsTable/columnsTableSupplier';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

export const Suppliers = () => {
  const { suppliers, fetchSuppliers, fields } = useSuppliers();
  const { dialogOpen, setDialogOpen, cadastroSucesso, handleDialogOpen, handleCadastroSucesso } = useDialog();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
      <h1 className="font-bold text-2xl text-blue">Gerenciamento de fornecedores</h1>
      <h3 className="font-light text-gray-500">Gerencie seus fornecedores, podendo editar, excluir ou criar novos!</h3>
      <DataTable
        columns={columns}
        data={suppliers}
        filters={['nome', 'contato']}
        actionComponent={
          <Sheets
            buttonText='Novo fornecedor'
            title='Cadastro de fornecedor'
            fields={fields}
            apiEndpoint='http://localhost:3000/suppliers'
            onDialogOpen={handleDialogOpen}
            onCadastroSucesso={(sucesso) => handleCadastroSucesso(sucesso, fetchSuppliers)}
          />
        }
      />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{cadastroSucesso ? "Cadastro Realizado" : "Erro no Cadastro"}</DialogTitle>
            <DialogDescription>
              {cadastroSucesso ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Cadastrado realizado com sucesso!
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <XCircle className="mr-2 h-5 w-5" />
                  Houve um erro ao cadastrar.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setDialogOpen(false)}>Fechar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
