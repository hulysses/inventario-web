import { db } from "../db.js";

export const createItensOrdersTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS itens_order (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            produtoNome TEXT,
            produtoValor INTEGER,
            produtoId INTEGER,
            pedidoId INTEGER,
            data_adicao TEXT,
            FOREIGN KEY (produtoId) REFERENCES product(id)
            FOREIGN KEY (pedidoId) REFERENCES orders(id)
        )
    `;
    db.prepare(sql).run();
};

export const dropItensOrdersTable = () => {
    const sql = 'DROP TABLE IF EXISTS itens_order';
    db.exec(sql);
    console.log('Tabela "itens_order" deletada com sucesso.');
}