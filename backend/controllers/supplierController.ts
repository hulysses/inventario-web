import { Response } from 'express';
import { Supplier } from '../types/supplier';
import { insertSupplier } from "../database/services/supplierService";

export const registerSupplier = (req: Supplier, res: Response): void => {
    const { nome, cnpj, contato, endereco } = req.body;

    if (insertSupplier(nome, cnpj, contato, endereco)) {
        res.status(201).json({ message: 'Fornecedor cadastrado com sucesso' });
    } else {
        res.status(400).json({ message: 'Erro ao cadastrar fornecedor.' });
    }
}