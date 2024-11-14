import {
    insertItensOrdersS, listItensOrdersS, deleteItensOrdersS
} from "../database/services/orderItensService.js";

export const registerItensOrders = (req, res) => {
    const { produtoNome, data_adicao, produtoValor, produtoId, pedidoId } = req.body;

    if (insertItensOrdersS(produtoNome, data_adicao, produtoValor, produtoId, pedidoId)) {
        res.status(201).json({ message: 'Item de pedido cadastrado com sucesso' });
    } else {
        res.status(400).json({ message: 'Erro ao cadastrar item de pedido.' });
    }
}

export const listItensOrders = (req, res) => {
    const pedidoId = req.params.pedidoId;

    try {
        const itensOrders = listItensOrdersS(pedidoId);
        res.status(200).json(itensOrders);
    } catch (error) {
        console.error('Erro ao listar itens do pedido:', error);
        res.status(500).json({ message: 'Erro ao listar itens do pedido' });
    }
}

export const deleteItensOrders = (req, res) => {
    try {

        const { id } = req.params;

        deleteItensOrdersS(id);

        res.status(200).json({ message: 'Item de pedido deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar item de pedido:', error);
        res.status(500).json({ message: 'Erro ao deletar item de pedido' });
    }
}