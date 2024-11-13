import { db } from "../db.js";

export const createItensOrdersTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS itens_order (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            produtoNome TEXT,
            produtoValor INTEGER,
            produtoId INTEGER,
            data_adicao TEXT,
            FOREIGN KEY (produtoId) REFERENCES product(id)
        )
    `;
    db.prepare(sql).run();
};