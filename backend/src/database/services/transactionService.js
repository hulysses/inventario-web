import { db } from "../db.js";

export const listTransactionS = () => {
    try {
        const sql = 'SELECT * FROM transactions';
        const transactions = db.prepare(sql).all();
        return transactions;
    } catch (error) {
        console.error('Erro ao listar transações:', error);
        throw new Error('Erro ao listar transações');
    }
}