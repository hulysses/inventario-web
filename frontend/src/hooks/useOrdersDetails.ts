import { OrderItens } from "@/types/OrderItens";
import axios from "axios";
import { useState } from "react";

export const useOrdersDetails = () => {

    const fetchOrderItems = async (pedidoId: number) => {
        const [data, setData] = useState<OrderItens[]>([]);

        try {
            const response = await axios.get(`http://localhost:3000/itens-orders/${pedidoId}`);
            setData(response.data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar item do pedido');
        }

        return data;
    }

    return {
        fetchOrderItems
    }
}

