import { db } from '../db.ts';

export const createSupllierTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS supllier (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            cnpj TEXT UNIQUE,
            contato TEXT,
            endereco TEXT
        )
    `;
    db.prepare(sql).run();
};
