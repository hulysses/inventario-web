import db from './db.js';

export const createTable = () => {
    const sql = `
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            senha TEXT
        )
    `
    db.prepare(sql).run();
}

export const insertTable = (name, email, senha) => {
    const sql = `
        INSERT INTO users (nome, email, senha)
        VALUES(?,?,?)
    `
    db.prepare(sql).run(name, email, senha),
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Dados inseridos com sucesso.")
            }
        };
}

export const findByEmail = (email) => {
    const sql = `
        SELECT * FROM users WHERE email = ?
    `
    db.prepare(sql).get(email);
}
