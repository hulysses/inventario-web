import { Order } from "@/types/Order";
import axios from "axios";
import { useEffect, useState } from "react";

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<number | null>(null);

    const fields = [
        { name: 'clienteId', label: 'Cliente', type: 'text', placeholder: 'Selecione o cliente' },
        { name: 'data', label: 'Data', type: 'text', placeholder: 'Selecione a data' },
        { name: 'status', label: 'Status', type: 'text', placeholder: 'Selecione o status' },
        { name: 'total', label: 'Total', type: 'number', placeholder: 'Informe o preço', length: 14 },
    ];

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        }
    };

    const handleEdit = (order: Order) => {
        setEditingOrder(order);
        setIsSheetOpen(true);
    }

    const handleCreate = () => {
        setEditingOrder(null);
        setIsSheetOpen(true);
    };

    const confirmDelete = (orderId: number) => {
        setOrderToDelete(orderId);
        setIsConfirmDialogOpen(true);
    }

    const deleteOrder = async () => {
        if (orderToDelete == null) return;

        try {
            await axios.delete(`http://localhost:3000/orders?id=${orderToDelete}`);
            fetchOrders();
            return true;
        } catch (error) {
            console.error("Erro ao deletar pedido:", error);
            return false;
        } finally {
            setIsConfirmDialogOpen(false);
            setOrderToDelete(null);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        fetchOrders,
        fields,
        editingOrder,
        handleEdit,
        handleCreate,
        isSheetOpen,
        setIsSheetOpen,
        confirmDelete,
        deleteOrder,
        isConfirmDialogOpen,
        setIsConfirmDialogOpen
    };
}