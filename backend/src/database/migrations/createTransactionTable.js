import { db } from '../db.js';

export const createTransactionTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderId INTEGER,
        supplierId INTEGER,
        transaction_type TEXT,
        transaction_date TEXT,
        transaction_value TEXT,
        FOREIGN KEY (orderId) REFERENCES orders(id)
        FOREIGN KEY (supplierId) REFERENCES supplier(id)
        )
    `;
    db.prepare(sql).run();
};