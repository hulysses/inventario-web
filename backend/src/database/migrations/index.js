import { createSupllierTable } from "./createSupplierTable.js";
import { createUserTable } from "./createUserTable.js";
import { createClientTable, dropClientTable } from './createClientTable.js';
import { createOrderTable, dropOrderTable } from "./createOrderTable.js";

export const runMigrations = () => {
    createUserTable();
    createSupllierTable();
    createClientTable();
    createOrderTable();
}

// Usado para excluir tabelas em caso de algum erro.
export const dropaTabelas = () => {
    dropClientTable();
    dropOrderTable();
}