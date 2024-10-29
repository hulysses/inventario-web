import { db } from '../db.js';

export const insertClient = (nome, cpf_cnpj, contato, endereco) => {
    const sql = 'INSERT INTO clients (nome, cpf_cnpj, contato, endereco) VALUES (?, ?, ?, ?)';
    db.prepare(sql).run(nome, cpf_cnpj, contato, endereco);
};

export const listClient = () => {
    try {
        const sql = 'SELECT * FROM clients';
        const clients = db.prepare(sql).all();
        return clients;
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        throw new Error('Erro ao listar clientes');
    }
}
