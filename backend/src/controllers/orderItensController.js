import {
    insertItensOrdersS, listItensOrdersS, updateItensOrdersS, deleteItensOrdersS
} from "../database/services/orderItensService.js";

export const registerItensOrders = (req, res) => {
    const { produtoNome, data_adicao, preco, produtoId } = req.body;

    if (insertItensOrdersS(produtoNome, data_adicao, preco, produtoId)) {
        res.status(201).json({ message: 'Item de pedido cadastrado com sucesso' });
    } else {
        res.status(400).json({ message: 'Erro ao cadastrar item de pedido.' });
    }
}

export const listItensOrders = (req, res) => {
    try {
        const itensOrders = listItensOrdersS();

        res.status(200).json(itensOrders);
    } catch (error) {
        console.error('Erro ao listar item de pedido:', error);
        res.status(500).json({ message: 'Erro ao listar item de pedido' });
    }
}

export const updateItensOrders = (req, res) => {
    try {
        const { id } = req.query;
        const { data, clienteId, status, total } = req.body;

        updateItensOrdersS(id, data, clienteId, status, total);
        res.status(200).json({ message: 'Item de pedido atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar item de pedido:', error);
        res.status(500).json({ message: 'Erro ao atualizar item de pedido' });
    }
}

export const deleteItensOrders = (req, res) => {
    try {
        const { id } = req.query;
        deleteItensOrdersS(id);
        res.status(200).json({ message: 'Item de pedido deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar item de pedido:', error);
        res.status(500).json({ message: 'Erro ao deletar item de pedido' });
    }
}