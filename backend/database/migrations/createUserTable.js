import { db } from '../db.js';

export const createUserTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT UNIQUE,
            senha TEXT,
            isAdmin BOOLEAN DEFAULT 0
        )
    `;
    db.prepare(sql).run();
};
