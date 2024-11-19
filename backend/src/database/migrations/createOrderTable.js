import { db } from "../db.js";

export const createOrderTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT,
            clienteId INTEGER,
            status TEXT,
            total REAL,
            FOREIGN KEY (clienteId) references clients(id)
        )
    `;
  db.prepare(sql).run();
};

export const dropOrderTable = () => {
  const sql = "DROP TABLE IF EXISTS orders";
  db.exec(sql);
  console.log('Tabela "orders" deletada com sucesso.');
};
