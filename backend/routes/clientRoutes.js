import express from 'express';
import { insertClient } from '../database/services/clientService.js';

const router = express.Router();

router.post('/clients', async (req, res) => {
    const { nome, cpf_cnpj, contato, endereco } = req.body;

    try {
        const result = await insertClient(nome, cpf_cnpj, contato, endereco);
        res.status(201).json({ message: 'Cliente inserido com sucesso', result });
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        res.status(500).json({ error: 'Erro ao inserir cliente', error: error.message });
    }
});

export default router;