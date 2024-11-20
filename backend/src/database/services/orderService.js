import { db } from "../db.js";

const handleDatabaseOperation = (operation, errorMessage) => {
  try {
    return operation();
  } catch (error) {
    console.error(errorMessage, error.message);
    throw new Error(errorMessage);
  }
};

export const insertOrderS = async (data, clienteId, status, total) => {
  const sql =
    "INSERT INTO orders (data, clienteId, status, total) VALUES (?, ?, ?, ?)";
  return handleDatabaseOperation(() => {
    db.prepare(sql).run(data, clienteId, status, total);
    return true;
  }, "Erro ao inserir pedido");
};

export const listOrderS = async () => {
  const sql = `
    SELECT 
      orders.id AS pedidoId, 
      orders.data, 
      orders.status, 
      orders.clienteId,
      IFNULL(orders.total, 0) AS total,
      COUNT(itens_order.id) AS itemsCount
    FROM orders
    LEFT JOIN itens_order ON orders.id = itens_order.pedido_id
    GROUP BY orders.id
  `;
  return handleDatabaseOperation(
    () => db.prepare(sql).all(),
    "Erro ao listar pedidos"
  );
};

export const updateOrderS = async (id, data, clienteId, status, total) => {
  const sql =
    "UPDATE orders SET data = ?, clienteId = ?, status = ?, total = ? WHERE id = ?";
  return handleDatabaseOperation(() => {
    db.prepare(sql).run(data, clienteId, status, total, id);
    return true;
  }, "Erro ao atualizar pedido");
};

export const deleteOrderS = async (id) => {
  const sql = "DELETE FROM orders WHERE id = ?";
  return handleDatabaseOperation(() => {
    db.prepare(sql).run(id);
    return true;
  }, "Erro ao deletar pedidos");
};

export const getTotalOrder = async (id) => {
  const sql = "SELECT total FROM orders WHERE id = ?";
  return handleDatabaseOperation(() => {
    const result = db.prepare(sql).get(id);
    return result ? result.total : null;
  }, "Erro ao buscar total do pedido");
};

export const getSalesReportS = async (startDate, endDate) => {
  const sql = `
    SELECT 
      DATE(data) AS groupByField, 
      SUM(total) AS totalSales 
    FROM orders 
    WHERE data BETWEEN ? AND ? 
      AND status = 'concluido'
    GROUP BY DATE(data)
  `;
  return handleDatabaseOperation(
    () => db.prepare(sql).all(startDate, endDate),
    "Erro ao buscar relatório de vendas"
  );
};
