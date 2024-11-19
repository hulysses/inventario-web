import { createUserTable } from "./createUserTable.js";
import { createSupllierTable } from "./createSupplierTable.js";
import { createProductTable, dropProductTable } from "./createProductTable.js";
import { createOrderTable, dropOrderTable } from "./createOrderTable.js";
import { createClientTable, dropClientTable } from './createClientTable.js';
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
}

// Usado para excluir tabelas em caso de algum erro.
export const dropaTabelas = () => {
    dropClientTable();
    dropItensOrdersOrders();
    dropProductTable();
}