import { Product } from "@/types/Product.ts";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EllipsisVertical, ImageOff } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const columns = (
    handleEdit: (product: Product) => void,
    deleteSupplier: (productId: number) => void,
    getClientName: (clienteId: number) => string
): ColumnDef<Product>[] => [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "imagem",
            header: ({ }) => {
                return (
                    <p className="text-base font-semibold text-white">
                        Imagem
                    </p>
                )
            },
            cell: ({ row }) => {
                const imageUrl = row.original.imagem;
                return (
                    <div className="w-12 h-12 relative flex items-center justify-center bg-gray-100 rounded-md">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={`Imagem do produto`}
                                className="w-full h-full object-cover rounded-md"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <ImageOff className="w-6 h-6 text-gray-400" />
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "nome",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nome
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "descricao",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Descrição
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "preco",
            header: ({ column }) => {
                return (
                    <div className="text-center">
                        <Button
                            className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Preço
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => {
                let preco = row.getValue("preco");

                if (typeof preco === 'string') {
                    preco = parseFloat(preco.replace(',', '.'));
                }

                if (typeof preco === 'number' && !isNaN(preco)) {
                    const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco);
                    return <div className="text-right">{formatted}</div>;
                }

                return <div className="text-right">Valor inválido</div>;
            }
        },
        {
            accessorKey: "quantidade",
            header: ({ column }) => {
                return (
                    <div className="text-center">
                        <Button
                            className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Quantidade
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => {
                const quantidade = row.getValue("quantidade") as number;
                return <div className="text-right">{quantidade}</div>
            }
        },
        {
            accessorKey: "fornecedor",
            header: ({ column }) => {
                return (
                    <Button
                        className="text-base font-semibold bg-inherit hover:bg-inherit pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Fornecedor
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const supplierId = row.original.supplier_id;
                const supplierNome = getClientName(supplierId);
        
                return <span>{supplierNome}</span>
              }
        },
        {
            header: ({ }) => {
                return (
                    <p className="text-base font-semibold text-white">
                        Ações
                    </p>
                )
            },
            id: "actions",
            cell: ({ row }) => {
                const isAdmin = localStorage.getItem('isAdmin') === '1';
                const data = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button disabled={!isAdmin} variant="ghost" className="h-8 w-8 p-0">
                                <EllipsisVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(data)}>
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteSupplier(data.id)}>
                                Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];