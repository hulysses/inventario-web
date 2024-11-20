import {
  insertProduct,
  listProduct,
  updateProduct,
  deleteProduct,
  listProductWithSuppliers,
} from "../database/services/productService.js";
import { insertTransactionS } from "../database/services/transactionService.js";

export const registerProduct = (req, res) => {
  const { nome, descricao, preco, quantidade, imagem, supplier_id } = req.body;

  const productId = insertProduct(
    nome,
    descricao,
    preco,
    quantidade,
    imagem,
    supplier_id
  );

  if (productId) {
    const valor = parseInt(quantidade) * parseFloat(preco);
    const data = new Date().toISOString().split("T")[0];
    const tipo = "Entrada";
    const order_id = null;

    if (insertTransactionS(data, tipo, valor, productId, order_id)) {
      res.status(201).json({ message: "Produto cadastrado com sucesso" });
    } else {
      res.status(400).json({ message: "Erro ao cadastrar transação." });
    }
  } else {
    res.status(400).json({ message: "Erro ao cadastrar produto." });
  }
};

export const listProducts = (req, res) => {
  try {
    const products = listProduct();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ message: "Erro ao listar produtos." });
  }
};

export const listProductsSupplier = (req, res) => {
  try {
    const products = listProductWithSuppliers();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ message: "Erro ao listar produtos." });
  }
};

export const updateProducts = (req, res) => {
  try {
    const { id } = req.query;
    const { nome, descricao, preco, quantidade, imagem, supplier_id } =
      req.body;

    updateProduct(id, nome, descricao, preco, quantidade, imagem, supplier_id);
    res.status(200).json({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar produtos:", error);
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};

export const deleteProducts = (req, res) => {
  try {
    const { id } = req.query;
    deleteProduct(id);
    res.status(200).json({ message: "Produto deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ message: "Erro ao deletar produto." });
  }
};
