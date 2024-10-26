import { db } from '../db.js';

export const insertClient = (nome, cpf_cnpj, contato, endereco) => {
    const sql = 'INSERT INTO clients (nome, cpf_cnpj, contato, endereco) VALUES (?, ?, ?, ?)';
    db.prepare(sql).run(nome, cpf_cnpj, contato, endereco);
};
