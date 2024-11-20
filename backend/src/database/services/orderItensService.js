import { db } from "../db.js";

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
    const getPedidoIdSql = `SELECT pedido_id FROM itens_order WHERE id = ?`;
    const result = db.prepare(getPedidoIdSql).get(id);

    if (!result) {
      console.log("Item não encontrado para exclusão");
      return false;
    }

    const { pedido_id } = result;

    const sql = "DELETE FROM itens_order WHERE id = ?";
    db.prepare(sql).run(id);

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
