import { db } from '../db.js';

export const insertUser = (nome, email, senha, administrador) => {
    try {
        const sql = 'INSERT INTO users (nome, email, senha, administrador) VALUES (?, ?, ?, ?)';
        db.prepare(sql).run(nome, email, senha, administrador);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const updateUser = (id, nome, email, senha, administrador) => {
    try {
        const sql = 'UPDATE users SET nome = ?, email = ?, senha = ?, administrador =  ? WHERE id = ?';
        db.prepare(sql).run(nome, email, senha, administrador, id)
    } catch (error) {
        console.log("Erro ao atualizar usuário:", error.message);
    }
}

export const listUser = () => {
    try {
        const sql = 'SELECT * FROM users';
        const users = db.prepare(sql).all();
        return users;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        throw new Error('Erro ao listar usuários');
    }
}

export const findUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return db.prepare(sql).get(email);
};

export const deleteUser = (id) => {
    try {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.prepare(sql).run(id);
        return true;
    } catch (error) {
        return false;
    }
}

//insertUser("Suporte", "suporte@suporte.com", "suporte123", 1);