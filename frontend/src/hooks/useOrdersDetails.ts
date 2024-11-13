import axios from "axios";
import { OrderItens } from "@/types/OrderItens";

export const getProducts = async () => {
    return axios.get("http://localhost:3000/products");
};

export const addOrderItem = async (item: OrderItens) => {
    return axios.post("http://localhost:3000/itens-orders", item);
};