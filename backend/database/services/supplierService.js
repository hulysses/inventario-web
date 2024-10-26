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

export const listSupplier = () => {
    try {
        const sql = 'SELECT * FROM supplier';
        const suppliers = db.prepare(sql).all();
        return suppliers;
    } catch (error) {
        console.error('Erro ao listar fornecedores:', error);
        throw new Error('Erro ao listar fornecedores'); 
    }
}