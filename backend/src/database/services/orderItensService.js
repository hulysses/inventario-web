import { db } from '../db.js';

export const insertItensOrdersS = (produtoNome, data_adicao, produtoValor, produtoId, pedidoId) => {
    try {
        const sql = 'INSERT INTO itens_order (produtoNome, data_adicao, produtoValor, produtoId, pedidoId) VALUES (?, ?, ?, ?, ?)';
        db.prepare(sql).run(produtoNome, data_adicao, produtoValor, produtoId, pedidoId);

        return true;
    } catch (error) {
        console.log("Erro ao inserir item do pedido:", error.message);
        return false;
    }
};

export const listItensOrdersS = (pedidoId) => {
    try {
        const sql = `
            SELECT 
                i.id,
                i.produtoId,
                i.pedidoId,
                p.nome AS produtoNome,
                p.preco AS produtoValor,
                i.data_adicao AS data_adicao
            FROM itens_order i
            JOIN product p ON i.produtoId = p.id
            JOIN orders o ON i.pedidoId = o.id
            WHERE i.pedidoId = ?
        `;
        const itensOrders = db.prepare(sql).all(pedidoId);
        return itensOrders;
    } catch (error) {
        console.error('Erro ao listar itens de pedido:', error);
        throw new Error('Erro ao listar itens de pedido');
    }
}

export const deleteItensOrdersS = (id) => {
    try {
        const sql = 'DELETE FROM itens_order WHERE id = ?';
        db.prepare(sql).run(id);
        return true;
    } catch (error) {
        console.log("Erro ao deletar item de pedido:", error.message);
        return false;
    }
}
