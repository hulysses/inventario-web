import axios from "axios";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/Transaction";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduto();
  }, []);

  const getProductName = (product_id: number): string => {
    const product = products.find((product) => product.id === product_id);
    return product ? product.nome : "Produto desconhecido";
  };

  return {
    transactions,
    fetchTransactions,
    getProductName,
  };
};
