import { deleteOrderS, insertOrderS, updateOrderS, listOrderS } from "../database/services/orderService.js";

export const registerOrder = (req, res) => {
    const { data, clienteId, status, total } = req.body;

    if (insertOrderS(data, clienteId, status, total)) {
        res.status(201).json({ message: 'Pedido cadastrado com sucesso' });
    } else {
        res.status(400).json({ message: 'Erro ao cadastrar pedido.' });
    }
}

export const listOrder = (req, res) => {
    try {
        const orders = listOrderS();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ message: 'Erro ao listar pedidos' });
    }
}

export const updateOrder = (req, res) => {
    try {
        const { id } = req.query;
        const { data, clienteId, status, total } = req.body;

        updateOrderS(id, data, clienteId, status, total);
        res.status(200).json({ message: 'Pedido atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ message: 'Erro ao atualizar pedido' });
    }
}

export const deleteOrder = (req, res) => {
    try {
        const { id } = req.query;
        deleteOrderS(id);
        res.status(200).json({ message: 'Pedido deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({ message: 'Erro ao deletar pedido' });
    }
}
