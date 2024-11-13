import { db } from '../db.js';

export const insertItensOrdersS = (produtoNome, data_adicao, produtoValor, produtoId) => {
    try {
        const sql = 'INSERT INTO itens_order (produtoNome, data_adicao, produtoValor, produtoId) VALUES (?, ?, ?, ?)';
        db.prepare(sql).run(produtoNome, data_adicao, produtoValor, produtoId);

        return true;
    } catch (error) {
        console.log("Erro ao inserir item do pedido:", error.message);
        return false;
    }
};

export const listItensOrdersS = () => {
    try {
        const sql = `
            SELECT 
                io.produtoNome,
                io.produtoValor,
                io.produtoId,
                p.nome AS produtoNome, 
                p.preco AS produtoPreco
            FROM 
                itens_order io
            INNER JOIN 
                products p ON io.produtoId = p.id
        `;
        const itensOrders = db.prepare(sql).all();
        return itensOrders;
    } catch (error) {
        console.error('Erro ao listar items de pedido:', error);
        throw new Error('Erro ao listar items de pedido');
    }
}

export const updateItensOrdersS = (id, produtoNome, data_adicao, produtoValor, produtoId) => {
    try {
        const sql = 'UPDATE itens_orders SET produtoNome = ?, data_adicao = ?, produtoValor = ?, produtoId = ? WHERE id = ?, ';
        db.prepare(sql).run(produtoNome, data_adicao, produtoValor, produtoId, id);
        return true;
    } catch (error) {
        console.log("Erro ao atualizar item de pedido:", error.message);
        return false;
    }
}

export const deleteItensOrdersS = (id) => {
    try {
        const sql = 'DELETE FROM itens_orders WHERE id = ?';
        db.prepare(sql).run(id);
        return true;
    } catch (error) {
        console.log("Erro ao deletar item de pedido:", error.message);
        return false;
    }
}
