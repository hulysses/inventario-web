import { db } from '../db.js';

export const insertClientS = (nome, cpf_cnpj, contato, endereco) => {
    try {
        const sql = 'INSERT INTO clients (nome, cpf_cnpj, contato, endereco) VALUES (?, ?, ?, ?)';
        db.prepare(sql).run(nome, cpf_cnpj, contato, endereco);

        return true;
    } catch (error) {
        console.log("Erro ao inserir cliente:", error.message);
        return false;
    }
};

export const listClientS = () => {
    try {
        const sql = 'SELECT * FROM clients';
        const clients = db.prepare(sql).all();
        return clients;
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        throw new Error('Erro ao listar clientes');
    }
}

export const updateClientS = (id, nome, cpf_cnpj, contato, endereco) => {
    try {
        const sql = 'UPDATE clients SET nome = ?, cpf_cnpj = ?, contato = ?, endereco =  ? WHERE id = ?';
        db.prepare(sql).run(nome, cpf_cnpj, contato, endereco, id);
        return true;
    } catch (error) {
        console.log("Erro ao atualizar cliente:", error.message);
        return false;
    }
}

export const deleteClientS = (id) => {
    try {
        const sql = 'DELETE FROM clients WHERE id = ?';
        db.prepare(sql).run(id);
        return true;
    } catch (error) {
        console.log("Erro ao deletar cliente:", error.message);
        return false;
    }
}
