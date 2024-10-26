import { insertSupplier, listSupplier, updateSupplier } from "../database/services/supplierService.js";

export const registerSupplier = (req, res) => {
    const { nome, cnpj, contato, endereco } = req.body;

    if (insertSupplier(nome, cnpj, contato, endereco)) {
        res.status(201).json({ message: 'Fornecedor cadastrado com sucesso' });
    } else {
        res.status(400).json({ message: 'Erro ao cadastrar fornecedor.' });
    }
}

export const listSuppliers = (req, res) => {
    try {
        const suppliers = listSupplier();
        res.status(200).json(suppliers);
    } catch (error) {
        console.error('Erro ao listar fornecedores:', error);
        res.status(500).json({ message: 'Erro ao listar fornecedores' });
    }
}

export const updateSuppliers = (req, res) => {
    try {
        const { id } = req.query;
        const { nome, cnpj, contato, endereco } = req.body;

        updateSupplier(id, nome, cnpj, contato, endereco);
        res.status(200).json({ message: 'Fornecedor atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        res.status(500).json({ message: 'Erro ao atualizar fornecedor' });
    }
}
