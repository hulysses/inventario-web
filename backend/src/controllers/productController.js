import { insertProduct, listProduct, updateProduct, deleteProduct } from "../database/services/productService.js";

export const registerProduct = (req, res) => {
    const { nome, descricao, preco, quantidade } = req.body;

    if (insertProduct(nome, descricao, preco, quantidade)) {
        res.status(201).json({ message: 'Produto cadastrado com sucesso' });
    } else {
        res.status(400).json({ message: 'Erro ao cadastrar produto.' });
    }
}

export const listProducts = (req, res) => {
    try {
        const products = listProduct();
        res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ message: 'Erro ao listar produtos.' });
    }
}

export const updateProducts = (req, res) => {
    try {
        const { id } = req.query;
        const { nome, descricao, preco, quantidade } = req.body;

        updateProduct(id, nome, descricao, preco, quantidade);
        res.status(200).json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar produtos:', error);
        res.status(500).json({ message: 'Erro ao atualizar produto.' });
    }
}

export const deleteProducts = (req, res) => {
    try {
        const { id } = req.query;
        deleteProduct(id);
        res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ message: 'Erro ao deletar produto.' });
    }
}