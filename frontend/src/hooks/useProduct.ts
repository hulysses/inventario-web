import axios from "axios";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliers, setSuppliers] = useState<{ value: string; label: string }[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

    const fields = [
        { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'descricao', label: 'Descrição', type: 'text', placeholder: 'Digite a descrição' },
        { name: 'preco', label: 'Preço', type: 'text', placeholder: 'Digite o preço', },
        { name: 'quantidade', label: 'Quantidade', type: 'text', placeholder: 'Digite a quantidade em estoque' },
        { name: 'imagem', label: 'Imagem', type: 'image', placeholder: 'Informe a url da imagem' },
        {
            name: 'supplier_id', label: 'Fornecedor', type: 'select', placeholder: 'Selecione o fornecedor',
            selectOptions: suppliers
        },
    ];

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/suppliers');
            const supplierOptions = response.data.map((supplier: { id: number; nome: string }) => ({
                value: supplier.id.toString(),
                label: supplier.nome,
            }));
            setSuppliers(supplierOptions);
        } catch (error) {
            console.error('Erro ao buscar fornecedores:', error);
        }
    };

    const getSupplierName = (supplierId: number): string => {
        const supplier = suppliers.find((supplier) => supplier.value === supplierId.toString());
        return supplier ? supplier.label : 'Fornecedor desconhecido';
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsSheetOpen(true);
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setIsSheetOpen(true);
    };

    const confirmDelete = (productId: number) => {
        setProductToDelete(productId);
        setIsConfirmDialogOpen(true);
    };

    const deleteProduct = async () => {
        if (productToDelete === null) return;

        try {
            await axios.delete(`http://localhost:3000/products?id=${productToDelete}`);
            fetchProducts();
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        } finally {
            setIsConfirmDialogOpen(false);
            setProductToDelete(null);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

    return {
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
    };
};