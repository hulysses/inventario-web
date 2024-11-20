import { db } from "../db.js";
import { updateProductQuantity } from "./productService.js";
import { insertTransactionS } from "./transactionService.js";

export const insertItensOrdersS = (
  pedido_id,
  produto_id,
  quantidade,
  preco_unitario
) => {
  try {
    const sql =
      "INSERT INTO itens_order (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
    db.prepare(sql).run(pedido_id, produto_id, quantidade, preco_unitario);

    updateProductQuantity(produto_id, -quantidade);

    const valor = quantidade * parseFloat(preco_unitario);
    const data = new Date().toISOString().split("T")[0];
    const tipo = "Saída";
    insertTransactionS(data, tipo, valor, produto_id, pedido_id);

    updateValueOrderS(pedido_id);

    return true;
  } catch (error) {
    console.log("Erro ao inserir item do pedido:", error.message);
    return false;
  }
};

export const listItensOrdersS = (pedido_id) => {
  try {
    const sql = `
            SELECT 
                i.id,
                i.pedido_id,
                i.produto_id,
                p.nome,
                i.quantidade,
                i.preco_unitario
            FROM itens_order i
            JOIN product p ON i.produto_id = p.id
            JOIN orders o ON i.pedido_id = o.id
            WHERE i.pedido_id = ?
        `;
    const itensOrders = db.prepare(sql).all(pedido_id);
    return itensOrders;
  } catch (error) {
    console.error("Erro ao listar itens de pedido:", error);
    throw new Error("Erro ao listar itens de pedido");
  }
};

export const deleteItensOrdersS = (id) => {
  try {
    const getItemSql = `SELECT pedido_id, produto_id, quantidade, preco_unitario FROM itens_order WHERE id = ?`;
    const item = db.prepare(getItemSql).get(id);

    if (!item) {
      console.log("Item não encontrado para exclusão");
      return false;
    }

    const { pedido_id, produto_id, quantidade, preco_unitario } = item;

    const sql = "DELETE FROM itens_order WHERE id = ?";
    db.prepare(sql).run(id);

    updateProductQuantity(produto_id, quantidade);

    const deleteTransactionSql =
      "DELETE FROM transactions WHERE product_id = ? AND order_id = ?";
    db.prepare(deleteTransactionSql).run(produto_id, pedido_id);

    updateValueOrderS(pedido_id);

    return true;
  } catch (error) {
    console.log("Erro ao deletar item de pedido:", error.message);
    return false;
  }
};

export const deleteAllItensOrders = (pedido_id) => {
  try {
    const sql = "DELETE FROM itens_order WHERE pedido_id = ?";
    db.prepare(sql).run(pedido_id);
    return true;
  } catch (error) {
    console.error("Erro ao deletar todos os itens do pedido:", error.message);
    return false;
  }
};

export const updateValueOrderS = (pedido_id) => {
  try {
    const sql = `
            SELECT SUM(preco_unitario * quantidade) AS total
            FROM itens_order
            WHERE pedido_id = ?
        `;

    const result = db.prepare(sql).get(pedido_id);
    const totalPedido = result ? result.total : 0;

    const updateSql = `
            UPDATE orders
            SET total = ?
            WHERE id = ?
        `;
    db.prepare(updateSql).run(totalPedido, pedido_id);

    return totalPedido;
  } catch (error) {
    console.error("Erro ao atualizar valor do pedido:", error.message);
    throw new Error("Erro ao atualizar valor do pedido");
  }
};

export const returnItensToStock = (pedido_id) => {
  try {
    const sql =
      "SELECT produto_id, quantidade, preco_unitario FROM itens_order WHERE pedido_id = ?";
    const itens = db.prepare(sql).all(pedido_id);

    itens.forEach((item) => {
      updateProductQuantity(item.produto_id, item.quantidade);

      const valor = item.quantidade * parseFloat(item.preco_unitario);
      const data = new Date().toISOString().split("T")[0];
      const tipo = "Entrada";
      insertTransactionS(data, tipo, valor, item.produto_id, pedido_id);
    });

    return true;
  } catch (error) {
    console.log("Erro ao retornar itens ao estoque:", error.message);
    return false;
  }
};
