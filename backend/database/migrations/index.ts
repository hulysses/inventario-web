import { createSupllierTable } from "./createSupplierTable";
import { createUserTable } from "./createUserTable";

export const runMigrations = () => {
    createUserTable();
    createSupllierTable();
}