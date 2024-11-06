import { db } from '../db.js';

export const insertProduct = (nome, descricao, preco, quantidade) => {
    try {
        const sql = 'INSERT INTO product (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)';
        db.prepare(sql).run(nome, descricao, preco, quantidade);

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

export const updateProduct = (id, nome, cnpj, contato, endereco) => {
    try {
        const sql = 'UPDATE product SET nome = ?, cnpj = ?, contato = ?, endereco =  ? WHERE id = ?';
        db.prepare(sql).run(nome, cnpj, contato, endereco, id);
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

export const findByDespcription = (descricao) => {
    const sql = 'SELECT * FROM product WHERE descricao = ?';
    return db.prepare(sql).get(descricao);
};