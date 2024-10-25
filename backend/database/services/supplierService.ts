import { db } from '../db.ts';

export const insertSupplier = (nome: string, cnpj: string, contato: string, endereco: string) => {
    try {
        const sql = 'INSERT INTO supplier (nome, cnpj, contato, endereco) VALUES (?, ?, ?, ?)';
        db.prepare(sql).run(nome, cnpj, contato, endereco);

        return true;
    } catch (error) {
        return false;
    }
};