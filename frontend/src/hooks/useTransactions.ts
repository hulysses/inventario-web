import { Client } from "@/types/Client";
import { Supplier } from "@/types/Supplier";
import { Transaction } from "@/types/Transaction";
import axios from "axios";
import { useEffect, useState } from "react";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);

    const fields = [
        { name: 'clienteId', label: 'Cliente', type: 'select', placeholder: 'Selecione o cliente', options: [] },
        { name: 'supplierId', label: 'Fornecedor', type: 'select', placeholder: 'Selecione o fornecedor' },
        { name: 'transaction_date', label: 'Data', type: 'data', placeholder: 'Selecione a data' },
        { name: 'transaction_type', label: 'Transação', type: 'select', placeholder: 'Selecione entrada ou saída' },
        { name: 'transaction_value', label: "Valor", type: 'input', placeholder: 'Informe o valor da transação' }
    ];

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Erro ao buscar transações:', error);
        }
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/clients');
                setClients(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/suppliers');
                setSuppliers(response.data);
            } catch (error) {
                console.error("Erro ao buscar fornecedores.");
            }
        }
    }, []);

    const getClientName = (clientId: number): string => {
        const client = clients.find((client) => client.id === clientId);
        return client ? client.nome : 'Cliente desconhecido';
    }

    const getSupplierName = (supplierId: number): string => {
        const supplier = suppliers.find((supplier) => supplier.id === supplierId);
        return supplier ? supplier.nome : 'Fornecedor desconhecido';
    }

    const selectOptions = {
        clienteId: clients && clients.length > 0 ? clients.map(client => ({
            value: client.id.toString(),
            label: client.nome
        })) : []
    };

    const handleEdit = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsSheetOpen(true);
    }

    const handleCreate = () => {
        setEditingTransaction(null);
        setIsSheetOpen(true);
    };

    const confirmDelete = (transactionId: number) => {
        setTransactionToDelete(transactionId);
        setIsConfirmDialogOpen(true);
    }

    const deleteTransaction = async () => {
        if (transactionToDelete == null) return;

        try {
            await axios.delete(`http://localhost:3000/transactions?id=${transactionToDelete}`);
            fetchTransactions();
            return true;
        } catch (error) {
            console.error("Erro ao deletar pedido:", error);
            return false;
        } finally {
            setIsConfirmDialogOpen(false);
            setTransactionToDelete(null);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return {
        transactions,
        fetchTransactions,
        fields,
        editingTransaction,
        handleEdit,
        handleCreate,
        isSheetOpen,
        setIsSheetOpen,
        confirmDelete,
        deleteTransaction,
        isConfirmDialogOpen,
        setIsConfirmDialogOpen,
        selectOptions,
        getClientName,
        getSupplierName
    };
}