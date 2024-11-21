import { db } from "../db.js";

export const insertOrderS = (data, clienteId, status, total) => {
  try {
    const sql =
      "INSERT INTO orders (data, clienteId, status, total) VALUES (?, ?, ?, ?)";
    db.prepare(sql).run(data, clienteId, status, total);

    return true;
  } catch (error) {
    console.log("Erro ao inserir pedido:", error.message);
    return false;
  }
};

export const listOrderS = () => {
  try {
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

    const orders = db.prepare(sql).all();
    return orders;
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    throw new Error("Erro ao listar pedidos");
  }
};

export const updateOrderS = (id, data, clienteId, status, total) => {
  try {
    const sql =
      "UPDATE orders SET data = ?, clienteId = ?, status = ?, total =  ? WHERE id = ?";
    db.prepare(sql).run(data, clienteId, status, total, id);
    return true;
  } catch (error) {
    console.log("Erro ao atualizar pedido:", error.message);
    return false;
  }
};

export const deleteOrderS = (id) => {
  try {
    const sql = "DELETE FROM orders WHERE id = ?";
    db.prepare(sql).run(id);
    return true;
  } catch (error) {
    console.log("Erro ao deletar pedidos:", error.message);
    return false;
  }
};

export const getTotalOrder = (id) => {
  try {
    const sql = "SELECT total FROM orders WHERE id = ?";
    const result = db.prepare(sql).get(id);
    return result ? result.total : null;
  } catch (error) {
    console.error("Erro ao buscar total do pedido:", error);
    throw new Error("Erro ao buscar total do pedido");
  }
};

export const getSalesReportS = (startDate, endDate) => {
  try {
    const sql = `
      SELECT 
        DATE(data) AS groupByField, 
        SUM(total) AS totalSales 
      FROM orders 
      WHERE data BETWEEN ? AND ? 
        AND status = 'concluido'
      GROUP BY DATE(data)
    `;

    const salesReport = db.prepare(sql).all(startDate, endDate);
    return salesReport;
  } catch (error) {
    console.error("Erro ao buscar relatório de vendas:", error);
    throw new Error("Erro ao buscar relatório de vendas");
  }
};
