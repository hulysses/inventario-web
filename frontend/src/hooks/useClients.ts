import { Client } from "@/types/Client";
import axios from "axios";
import { useEffect, useState } from "react";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  const fields = [
    { name: "nome", label: "Nome", type: "text", placeholder: "Digite o nome" },
    {
      name: "cpf_cnpj",
      label: "CPF/CNPJ",
      type: "text",
      placeholder: "Digite o CPF/CNPJ",
      length: 18,
    },
    {
      name: "contato",
      label: "Telefone",
      type: "text",
      placeholder: "Digite o telefone",
      length: 14,
    },
    {
      name: "endereco",
      label: "Endereço",
      type: "text",
      placeholder: "Digite o endereço",
    },
  ];

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsSheetOpen(true);
  };

  const handleCreate = () => {
    setEditingClient(null);
    setIsSheetOpen(true);
  };

  const confirmDelete = (clientId: number) => {
    setClientToDelete(clientId);
    setIsConfirmDialogOpen(true);
  };

  const deleteClient = async () => {
    if (clientToDelete == null) return;

    try {
      await axios.delete(`http://localhost:3000/clients?id=${clientToDelete}`);
      fetchClients();
      return true;
      
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      return false;
    } finally {
      setIsConfirmDialogOpen(false);
      setClientToDelete(null);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    fetchClients,
    fields,
    editingClient,
    handleEdit,
    handleCreate,
    isSheetOpen,
    setIsSheetOpen,
    confirmDelete,
    deleteClient,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
  };
};
