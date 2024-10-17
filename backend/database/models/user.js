import { db } from '../db.js';

export const insertUser = (nome, email, senha) => {
    const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
    db.prepare(sql).run(nome, email, senha);
};

export const findUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return db.prepare(sql).get(email);
};