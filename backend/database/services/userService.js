import { db } from '../db.js';

export const insertUser = (nome, email, senha, administrador) => {
    const sql = 'INSERT INTO users (nome, email, senha, administrador) VALUES (?, ?, ?, ?)';
    db.prepare(sql).run(nome, email, senha, administrador);
};

export const findUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return db.prepare(sql).get(email);
};

// insertUser("Suporte", "suporte@suporte.com", "suporte123", 1);