import { createSupllierTable } from "./createSupplierTable.js";
import { createUserTable } from "./createUserTable.js";

export const runMigrations = () => {
    createUserTable();
    createSupllierTable();
}