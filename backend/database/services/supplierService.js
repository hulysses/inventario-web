import { db } from '../db.js';

export const insertSupplier = (nome, cnpj, contato, endereco) => {
    try {
        const sql = 'INSERT INTO supplier (nome, cnpj, contato, endereco) VALUES (?, ?, ?, ?)';
        db.prepare(sql).run(nome, cnpj, contato, endereco);

        return true;
    } catch (error) {
        console.log("Erro ao inserir fornecedor:", error.message);
        return false;
    }
};