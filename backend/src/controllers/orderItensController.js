import {
    insertItensOrdersS, listItensOrdersS, deleteItensOrdersS, updateValueOrderS,
} from "../database/services/orderItensService.js";

export const registerItensOrders = (req, res) => {
    const { produtoNome, data_adicao, produtoValor, produtoId, pedidoId } = req.body;

    try {
        const itemInserted = insertItensOrdersS(produtoNome, data_adicao, produtoValor, produtoId, pedidoId);

        if (itemInserted) {
            // Atualizar o valor total do pedido após a inserção
            const updatedTotal = updateValueOrderS(pedidoId);
            res.status(201).json({
                message: 'Item de pedido cadastrado com sucesso',
                updatedTotal,
            });
        } else {
            res.status(400).json({ message: 'Erro ao cadastrar item de pedido.' });
        }
    } catch (error) {
        console.error('Erro ao registrar item de pedido:', error);
        res.status(500).json({ message: 'Erro ao registrar item de pedido.' });
    }
};

export const listItensOrders = (req, res) => {
    const pedidoId = req.params.pedidoId;

    try {
        const itensOrders = listItensOrdersS(pedidoId);
        res.status(200).json(itensOrders);
    } catch (error) {
        console.error('Erro ao listar itens do pedido:', error);
        res.status(500).json({ message: 'Erro ao listar itens do pedido' });
    }
};

export const deleteItensOrders = (req, res) => {
    try {
        const { id } = req.params;

        // Deletar o item
        const itemDeleted = deleteItensOrdersS(id);

        if (itemDeleted) {
            const pedidoId = req.body.pedidoId; // Pode ser necessário passar o pedidoId para recalcular o valor
            // Atualizar o valor do pedido após a exclusão do item
            const updatedTotal = updateValueOrderS(pedidoId);
            res.status(200).json({
                message: 'Item de pedido deletado com sucesso',
                updatedTotal,
            });
        } else {
            res.status(400).json({ message: 'Erro ao deletar item de pedido.' });
        }
    } catch (error) {
        console.error('Erro ao deletar item de pedido:', error);
        res.status(500).json({ message: 'Erro ao deletar item de pedido' });
    }
};
