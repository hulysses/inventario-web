import { Table } from "@tanstack/react-table";

export interface FilterProps {
  table: Table<any>;
  column: string;
  placeholder?: string;
}
