
import { Plus } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Sheets } from '@/components/sheet';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProduct';
import { useDataTable } from '@/hooks/useDataTable';
import { DataTable } from '@/components/table/data-table';
import { TableFilter } from '@/components/table/table-filter';
import { ConfirmationDialog } from '@/components/dialog/confirm';
import { columns } from '@/components/table/columnsTable/columnsTableProduct';

export function Products() {
    const {
        products,
        fetchProducts,
        fields,
        editingProduct,
        handleEdit,
        handleCreate,
        isSheetOpen,
        setIsSheetOpen,
        confirmDelete,
        deleteProduct,
        isConfirmDialogOpen,
        setIsConfirmDialogOpen,
        getSupplierName
    } = useProducts();
    const productQuantity = products.length;
    const filters = ['nome', 'fornecedor', 'preco'];
    const { table } = useDataTable(columns(handleEdit, confirmDelete, getSupplierName), products);
    const isAdmin = localStorage.getItem('isAdmin') === '1';

    const handleConfirmDelete = async () => {
        try {
            await deleteProduct();
            toast('Produto excluído com sucesso!');
        } catch (error) {
            toast('Erro ao excluir produto.');
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-background mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl text-primary">Gerenciamento de produtos</h1>
            <h3 className="font-light text-muted-foreground">Gerencie seus produtos, podendo editar, excluir ou criar novos!</h3>
            <div className="flex items-center justify-end space-x-4 mt-7">
                <h1 className="font-bold text-2xl -ml-0 flex mx-auto">
                    Produtos
                    <p className="ml-5 text-gray-400">{productQuantity}</p>
                </h1>
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
                    Novo Produto
                </Button>
            </div>
            <DataTable
                columns={columns(handleEdit, confirmDelete, getSupplierName)}
                table={table}
            />
            <Sheets
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                title={editingProduct ? "Editar produto" : "Cadastro de produto"}
                fields={fields}
                initialData={editingProduct || {}}
                apiEndpoint={`http://localhost:3000/products${editingProduct ? `?id=${editingProduct.id}` : ''}`}
                method={editingProduct ? 'put' : 'post'}
                onSuccess={() => {
                    fetchProducts();
                    setIsSheetOpen(false);
                }}
            />
            <ConfirmationDialog
                isOpen={isConfirmDialogOpen}
                onClose={() => setIsConfirmDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar exclusão"
                description="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
            />

            <Toaster />
        </div>
    )
}