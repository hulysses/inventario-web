// hooks/useClients.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { Client } from "@/types/Client";
import { Order } from "@/types/Order";

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [clientOrders, setClientOrders] = useState<Order[]>([]);

    const fetchClients = async () => {
        try {
            const response = await axios.get("http://localhost:3000/clients");
            setClients(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    const fetchOrdersByClient = async (clientId: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/clients/${clientId}`);
            setClientOrders(response.data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return {
        clients,
        clientOrders,
        fetchOrdersByClient,
    };
};
