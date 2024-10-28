import axios from 'axios';
import { Supplier } from '@/types/Supplier';
import { useState, useEffect } from 'react';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<number | null>(null);

  const fields = [
    { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
    { name: 'cnpj', label: 'CNPJ', type: 'text', placeholder: 'Digite o CNPJ' },
    { name: 'contato', label: 'Telefone', type: 'text', placeholder: 'Digite o telefone' },
    { name: 'endereco', label: 'Endereço', type: 'text', placeholder: 'Digite o endereço' },
  ];

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsSheetOpen(true);
  };

  const handleCreate = () => {
    setEditingSupplier(null);
    setIsSheetOpen(true);
  };

  const confirmDelete = (supplierId: number) => {
    setSupplierToDelete(supplierId);
    setIsConfirmDialogOpen(true);
  };

  const deleteSupplier = async () => {
    if (supplierToDelete === null) return;

    try {
      await axios.delete(`http://localhost:3000/suppliers?id=${supplierToDelete}`);
      fetchSuppliers();
      return true;
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
      return false;
    } finally {
      setIsConfirmDialogOpen(false);
      setSupplierToDelete(null);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
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
  };
};