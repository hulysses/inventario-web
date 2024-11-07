import { db } from '../db.js';

export const createProductTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT,
            preco REAL,
            quantidade INTEGER,
            supplier_id INTEGER,
            imagem TEXT,
            FOREIGN KEY (supplier_id) REFERENCES supplier(id)
        )
    `;
    db.prepare(sql).run();
};

export const dropProductTable = () => {
    const sql = 'DROP TABLE IF EXISTS product';
    db.exec(sql);
    console.log('Tabela "product" deletada com sucesso.');
}
