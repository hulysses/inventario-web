import { db } from "../db.js";

export const createTransactionTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT,
        tipo TEXT,
        valor REAL,
        product_id INTEGER,
        order_id INTEGER,
        FOREIGN KEY (product_id) REFERENCES product(id)
        FOREIGN KEY (order_id) REFERENCES orders(id)
        )
    `;
  db.prepare(sql).run();
};

export const dropTransactionTable = () => {
  const sql = "DROP TABLE IF EXISTS transactions";
  db.exec(sql);
  console.log('Tabela "transactions" deletada com sucesso.');
};
