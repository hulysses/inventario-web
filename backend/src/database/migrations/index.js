import { createUserTable } from "./createUserTable.js";
import { createOrderTable } from "./createOrderTable.js";
import { createClientTable } from "./createClientTable.js";
import { createProductTable } from "./createProductTable.js";
import { createSupllierTable } from "./createSupplierTable.js";
import { createItensOrdersTable } from "./createItensOrdersTable.js";
import { createTransactionTable } from "./createTransactionTable.js";

export const runMigrations = () => {
  createUserTable();
  createSupllierTable();
  createClientTable();
  createOrderTable();
  createProductTable();
  createItensOrdersTable();
  createTransactionTable();
};

// Usado para excluir tabelas em caso de algum erro.
export const dropaTabelas = () => {};
