import { db } from '../db.js';

export const insertUser = (nome, email, senha, isAdmin) => {
    try {
        const sql = 'INSERT INTO user (nome, email, senha, isAdmin) VALUES (?, ?, ?, ?)';
        db.prepare(sql).run(nome, email, senha, isAdmin);
    } catch (error) {
        console.log('Erro ao inserir usuário', error.message);
    }
};

export const updateUser = (id, nome, email, senha, isAdmin) => {
    try {
        const sql = 'UPDATE user SET nome = ?, email = ?, senha = ?, isAdmin =  ? WHERE id = ?';
        db.prepare(sql).run(nome, email, senha, isAdmin, id)
    } catch (error) {
        console.log("Erro ao atualizar usuário:", error.message);
    }
}

export const listUser = () => {
    try {
        const sql = 'SELECT * FROM user';
        const users = db.prepare(sql).all();
        return users;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        throw new Error('Erro ao listar usuários');
    }
}

export const findUserByEmail = (email) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    return db.prepare(sql).get(email);
};

export const deleteUser = (id) => {
    try {
        const sql = 'DELETE FROM user WHERE id = ?';
        db.prepare(sql).run(id);
        return true;
    } catch (error) {
        return false;
    }
}