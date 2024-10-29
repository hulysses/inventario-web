import { insertClient, listClient } from "../database/services/clientService.js";

export const registerClient = (req, res) => {
    const { nome, cpf_cnpj, contato, endereco } = req.body;

    if (insertClient(nome, cpf_cnpj, contato, endereco)) {
        res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
    } else {
        res.status(400).json({ message: 'Erro ao cadastrar cliente.' });
    }
}

export const listClients = (req, res) => {
    try {
        const clients = listClient();
        res.status(200).json(clients);
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        res.status(500).json({ message: 'Erro ao listar clientes' });
    }
}