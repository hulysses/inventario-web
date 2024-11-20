import { useDataTable } from "@/hooks/useDataTable";
import { useTransactions } from "@/hooks/useTransactions";
import { DataTable } from "@/components/table/data-table";
import { TableFilter } from "@/components/table/table-filter";
import { columns } from "@/components/table/columnsTable/columnsTableTransaction";

export const Transactions = () => {
  const { transactions } = useTransactions();
  const { table } = useDataTable(columns, transactions);
  const transactionQuantity = transactions.length;
  const filters = ["tipo"];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 bg-background mx-7 mb-7 rounded-xl">
      <h1 className="font-bold text-2xl text-primary">
        Gerenciamento de transações
      </h1>
      <h3 className="font-light text-muted-foreground">
        Gerencie suas transações, podendo alterar, excluir ou criar novos.
      </h3>
      <div className="flex items-center justify-end space-x-4 mt-7">
        <h1 className="font-bold text-2xl -ml-0 flex mx-auto">
          Transações <p className="ml-5 text-gray-400">{transactionQuantity}</p>
        </h1>
        {filters.map((column) => (
          <TableFilter
            key={column}
            table={table}
            column={column}
            placeholder={`Filtrar ${column}...`}
          />
        ))}
      </div>
      <DataTable columns={columns} table={table} />
    </div>
  );
};
