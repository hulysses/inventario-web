import { db } from '../db.js';

export const createClientTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            cpf_cnpj TEXT,
            contato TEXT,
            endereco TEXT
        )
    `;
    db.prepare(sql).run();
};

export const dropClientTable = () => {
    const sql = 'DROP TABLE IF EXISTS clients';
    db.exec(sql);
    console.log('Tabela "clients" deletada com sucesso.');
}
