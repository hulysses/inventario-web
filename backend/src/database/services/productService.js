import { db } from "../db.js";

export const insertProduct = (
  nome,
  descricao,
  preco,
  quantidade,
  imagem,
  supplier_id
) => {
  try {
    const sql =
      "INSERT INTO product (nome, descricao, preco, quantidade, imagem, supplier_id) VALUES (?, ?, ?, ?, ?, ?)";
    const result = db
      .prepare(sql)
      .run(nome, descricao, preco, quantidade, imagem, supplier_id);

    return result.lastInsertRowid;
  } catch (error) {
    console.log("Erro ao inserir produto:", error.message);
    return false;
  }
};

export const listProduct = () => {
  try {
    const sql = "SELECT * FROM product";
    const products = db.prepare(sql).all();
    return products;
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    throw new Error("Erro ao listar produtos");
  }
};

export const listProductWithSuppliers = () => {
  try {
    const sql =
      "SELECT p.id, p.nome, p.quantidade, s.nome as supplier_name FROM product p INNER JOIN supplier s ON p.supplier_id = s.id";
    const products = db.prepare(sql).all();

    return products;
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    throw new Error("Erro ao listar produtos");
  }
};

export const updateProduct = (
  id,
  nome,
  descricao,
  preco,
  quantidade,
  imagem,
  supplier_id
) => {
  try {
    const sql =
      "UPDATE product SET nome = ?, descricao = ?, preco = ?, quantidade =  ?, imagem = ?, supplier_id = ? WHERE id = ?";
    db.prepare(sql).run(
      nome,
      descricao,
      preco,
      quantidade,
      imagem,
      supplier_id,
      id
    );
    return true;
  } catch (error) {
    console.log("Erro ao atualizar produto:", error.message);
    return false;
  }
};

export const updateProductQuantity = (product_id, quantityChange) => {
  try {
    const sql = "UPDATE product SET quantidade = quantidade + ? WHERE id = ?";
    db.prepare(sql).run(quantityChange, product_id);
    return true;
  } catch (error) {
    console.log("Erro ao atualizar quantidade do produto:", error.message);
    return false;
  }
};

export const deleteProduct = (id) => {
  try {
    const sql = "DELETE FROM product WHERE id = ?";
    db.prepare(sql).run(id);
    return true;
  } catch (error) {
    console.log("Erro ao deletar produto:", error.message);
    return false;
  }
};

export const getProductById = (id) => {
  try {
    const sql = "SELECT * FROM product WHERE id = ?";
    const product = db.prepare(sql).get(id);
    return product;
  } catch (error) {
    console.log("Erro ao buscar produto:", error.message);
    return null;
  }
};