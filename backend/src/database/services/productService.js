import { db } from '../db.js';

export const insertProduct = (nome, descricao, preco, quantidade, imagem, supplier_id) => {
    try {
        const sql = 'INSERT INTO product (nome, descricao, preco, quantidade, imagem, supplier_id) VALUES (?, ?, ?, ?, ?, ?)';
        db.prepare(sql).run(nome, descricao, preco, quantidade, imagem, supplier_id);

        return true;
    } catch (error) {
        console.log("Erro ao inserir produto:", error.message);
        return false;
    }
};

export const listProduct = () => {
    try {
        const sql = 'SELECT * FROM product';
        const products = db.prepare(sql).all();
        return products;
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        throw new Error('Erro ao listar produtos');
    }
}

export const updateProduct = (id, nome, descricao, preco, quantidade, imagem, supplier_id) => {
    try {
        const sql = 'UPDATE product SET nome = ?, descricao = ?, preco = ?, quantidade =  ?, imagem = ?, supplier_id = ? WHERE id = ?';
        db.prepare(sql).run(nome, descricao, preco, quantidade, imagem, supplier_id, id);
        return true;
    } catch (error) {
        console.log("Erro ao atualizar produto:", error.message);
        return false;
    }
}

export const deleteProduct = (id) => {
    try {
        const sql = 'DELETE FROM product WHERE id = ?';
        db.prepare(sql).run(id);
        return true;
    } catch (error) {
        console.log("Erro ao deletar produto:", error.message);
        return false;
    }
}