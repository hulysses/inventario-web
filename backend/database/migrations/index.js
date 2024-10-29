import { createSupllierTable } from "./createSupplierTable.js";
import { createUserTable } from "./createUserTable.js";
import { createClientTable, dropClientTable } from './createClientTable.js';

export const runMigrations = () => {
    createUserTable();
    createSupllierTable();
    dropClientTable();
    createClientTable();
}