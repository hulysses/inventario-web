import { Order } from "@/types/Order";
import { useState } from "react";
import { OrderDetails } from '@/types/OrderItens';
import axios from "axios";

const pedidoId = 1;

export const useOrderDetails = () => {
    const [produtos, setProdutos] = useState<Order[]>([]);
    const [itensPedido, setItensPedido] = useState<OrderDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchProdutos = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get('http://localhost:3000/products');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos', error);
        }
    }

    // const fetchItensPedido = 
}