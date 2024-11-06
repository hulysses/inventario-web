import { db } from '../db.js';

export const createProductTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT,
            preco INTEGER,
            quantidade INTEGER,
            supplier_id INTEGER,
            FOREIGN KEY (supplier_id) REFERENCES supplier(id)
        )
    `;
    db.prepare(sql).run();
};
