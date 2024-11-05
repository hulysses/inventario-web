import { Client } from "@/types/Client";
import { Order } from "@/types/Order";
import axios from "axios";
import { useEffect, useState } from "react";

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
    const [clients, setClients] = useState<Client[]>([]);

    const fields = [
        { name: 'clienteId', label: 'Cliente', type: 'select', placeholder: 'Selecione o cliente', options: [] },
        { name: 'data', label: 'Data', type: 'text', placeholder: 'Selecione a data' },
        { name: 'status', label: 'Status', type: 'text', placeholder: 'Selecione o status' },
        { name: 'total', label: 'Total', type: 'text', placeholder: 'Informe o preço', length: 14 },
    ];

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:3000/clients');
            setClients(response.data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    const ordersData = {
        clienteId: clients.map(client => ({
            value: client.id, label: client.id.toString(),
        }))
    }

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
        setIsConfirmDialogOpen,
        ordersData
    };
}