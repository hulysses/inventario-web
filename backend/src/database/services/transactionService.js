import { db } from "../db.js";

export const insertTransactionS = (data, tipo, valor, product_id, order_id) => {
  try {
    const sql =
      "INSERT INTO transactions (data, tipo, valor, product_id, order_id) VALUES (?, ?, ?, ?, ?)";
    db.prepare(sql).run(data, tipo, valor, product_id, order_id);

    return true;
  } catch (error) {
    console.log("Erro ao inserir transação:", error.message);
    return false;
  }
};

export const listTransactionS = () => {
  try {
    const sql = "SELECT * FROM transactions";
    const transactions = db.prepare(sql).all();
    return transactions;
  } catch (error) {
    console.error("Erro ao listar transações:", error);
    throw new Error("Erro ao listar transações");
  }
};

export const updateTransactionS = (
  id,
  data,
  tipo,
  valor,
  product_id,
  order_id
) => {
  try {
    const sql =
      "UPDATE transactions SET data = ?, tipo = ?, valor = ?, product_id = ?, order_id = ? WHERE id = ?";
    db.prepare(sql).run(data, tipo, valor, product_id, order_id, id);
    return true;
  } catch (error) {
    console.log("Erro ao atualizar transação:", error.message);
    return false;
  }
};

export const deleteTransactionS = (id) => {
  try {
    const sql = "DELETE FROM transactions WHERE id = ?";
    db.prepare(sql).run(id);
    return true;
  } catch (error) {
    console.log("Erro ao deletar transações:", error.message);
    return false;
  }
};
