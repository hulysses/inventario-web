import { db } from '../db.js';

export const createTransactionTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clientId INTEGER,
        supplierId INTEGER,
        transaction_type TEXT,
        transaction_date TEXT,
        transaction_value TEXT,
        FOREIGN KEY (clientId) REFERENCES clients(id)
        FOREIGN KEY (supplierId) REFERENCES supplier(id)
        )
    `;
    db.prepare(sql).run();
};

export const dropTransactionTable = () => {
    const sql = 'DROP TABLE IF EXISTS transactions';
    db.exec(sql);
    console.log('Tabela "transactions" deletada com sucesso.');
}