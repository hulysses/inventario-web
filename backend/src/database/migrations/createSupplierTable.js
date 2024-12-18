import { db } from '../db.js';

export const createSupllierTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS supplier (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            cnpj TEXT UNIQUE,
            contato TEXT,
            endereco TEXT
        )
    `;
    db.prepare(sql).run();
};
