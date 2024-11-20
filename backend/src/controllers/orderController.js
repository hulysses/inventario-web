import {
  deleteOrderS,
  insertOrderS,
  updateOrderS,
  listOrderS,
  getTotalOrder,
  getSalesReportS,
} from "../database/services/orderService.js";
import {
  deleteAllItensOrders,
  returnItensToStock,
} from "../database/services/orderItensService.js";
import { deleteTransactionsByOrderId } from "../database/services/transactionService.js";

export const registerOrder = (req, res) => {
  const { data, clienteId, status, total } = req.body;

  if (insertOrderS(data, clienteId, status, total)) {
    res.status(201).json({ message: "Pedido cadastrado com sucesso" });
  } else {
    res.status(400).json({ message: "Erro ao cadastrar pedido." });
  }
};

export const listOrder = (req, res) => {
  try {
    const orders = listOrderS();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ message: "Erro ao listar pedidos" });
  }
};

export const updateOrder = (req, res) => {
  try {
    const { id } = req.query;
    const { data, clienteId, status } = req.body;
    const total = getTotalOrder(id);

    if (total === null) {
      return res.status(400).json({ message: "Pedido não encontrado." });
    }

    const order = listOrderS().find((order) => order.pedidoId === parseInt(id));
    if (status === "concluido" && order.itemsCount === 0) {
      return res
        .status(400)
        .json({ message: "Não é possível concluir um pedido sem itens." });
    }

    updateOrderS(id, data, clienteId, status, total);
    res.status(200).json({ message: "Pedido atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({ message: "Erro ao atualizar pedido" });
  }
};

export const deleteOrder = (req, res) => {
  try {
    const { id } = req.query;

    if (returnItensToStock(id)) {
      if (deleteAllItensOrders(id)) {
        deleteTransactionsByOrderId(id);
        deleteOrderS(id);
        res.status(200).json({ message: "Pedido deletado com sucesso" });
      } else {
        res.status(400).json({ message: "Erro ao deletar itens do pedido." });
      }
    } else {
      res.status(400).json({ message: "Erro ao retornar itens ao estoque." });
    }
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ message: "Erro ao deletar pedido" });
  }
};

export const getSalesReport = (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const salesReport = getSalesReportS(startDate, endDate);
    res.status(200).json(salesReport);
  } catch (error) {
    console.error("Erro ao buscar relatório de vendas:", error);
    res.status(500).json({ message: "Erro ao buscar relatório de vendas" });
  }
};
