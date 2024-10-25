import { db } from '../db.ts';

export const insertUser = (nome: string, email: string, senha: string) => {
    const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
    db.prepare(sql).run(nome, email, senha);
};

export const findUserByEmail = (email: string) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return db.prepare(sql).get(email);
};