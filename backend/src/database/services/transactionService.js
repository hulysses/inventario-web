import { db } from "../db.js";

export const insertTransactionS = (
  clientId,
  supplierId,
  transaction_type,
  transaction_date,
  transaction_value
) => {
  try {
    const sql =
      "INSERT INTO transactions (clientId, supplierId, transaction_type, transaction_date, transaction_value) VALUES (?, ?, ?, ?, ?)";
    db.prepare(sql).run(
      clientId,
      supplierId,
      transaction_type,
      transaction_date,
      transaction_value
    );

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
  clientId,
  supplierId,
  transaction_type,
  transaction_date,
  transaction_value
) => {
  try {
    const sql =
      "UPDATE transactions SET clientId = ?, supplierId = ?, transaction_type = ?, transaction_date =  ?, transaction_value WHERE id = ?";
    db.prepare(sql).run(
      clientId,
      supplierId,
      transaction_type,
      transaction_date,
      transaction_value
    );
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
