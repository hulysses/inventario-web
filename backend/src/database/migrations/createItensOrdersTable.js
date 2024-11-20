import { db } from "../db.js";

export const createItensOrdersTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS itens_order (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pedido_id INTEGER,
            produto_id INTEGER,
            quantidade INTEGER,
            preco_unitario REAL,
            FOREIGN KEY (produto_id) REFERENCES product(id),
            FOREIGN KEY (pedido_id) REFERENCES orders(id)
        )
    `;
  db.prepare(sql).run();
};

export const dropItensOrdersTable = () => {
  const sql = "DROP TABLE IF EXISTS itens_order";
  db.exec(sql);
  console.log('Tabela "itens_order" deletada com sucesso.');
};
