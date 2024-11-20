import { db } from "../db.js";

const executeQuery = (sql, params = []) => {
  try {
    return db.prepare(sql).run(...params);
  } catch (error) {
    console.error("Database error:", error.message);
    throw new Error("Database operation failed");
  }
};

const fetchAll = (sql, params = []) => {
  try {
    return db.prepare(sql).all(...params);
  } catch (error) {
    console.error("Database error:", error.message);
    throw new Error("Database operation failed");
  }
};

const fetchOne = (sql, params = []) => {
  try {
    return db.prepare(sql).get(...params);
  } catch (error) {
    console.error("Database error:", error.message);
    throw new Error("Database operation failed");
  }
};

export const insertClientS = (nome, cpf_cnpj, contato, endereco) => {
  const sql =
    "INSERT INTO clients (nome, cpf_cnpj, contato, endereco) VALUES (?, ?, ?, ?)";
  executeQuery(sql, [nome, cpf_cnpj, contato, endereco]);
  return true;
};

export const listClientS = () => {
  const sql = "SELECT * FROM clients";
  return fetchAll(sql);
};

export const updateClientS = (id, nome, cpf_cnpj, contato, endereco) => {
  const sql =
    "UPDATE clients SET nome = ?, cpf_cnpj = ?, contato = ?, endereco = ? WHERE id = ?";
  executeQuery(sql, [nome, cpf_cnpj, contato, endereco, id]);
  return true;
};

export const deleteClientS = (id) => {
  const sql = "DELETE FROM clients WHERE id = ?";
  executeQuery(sql, [id]);
  return true;
};

export const findByCpfCnpj = (cpf_cnpj) => {
  const sql = "SELECT * FROM clients WHERE cpf_cnpj = ?";
  return fetchOne(sql, [cpf_cnpj]);
};
