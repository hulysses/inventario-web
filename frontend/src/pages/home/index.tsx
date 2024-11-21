import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Home() {
  const [products, setProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("Todos");
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("Todos");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesReport, setSalesReport] = useState([]);
  const [reportStartDate, setReportStartDate] = useState(null);
  const [reportEndDate, setReportEndDate] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/home/reportproduct")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/home/reporttransaction")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  useEffect(() => {
    if (reportStartDate && reportEndDate) {
      fetch(
        `http://localhost:3000/orders/home/reportsales?startDate=${reportStartDate.toISOString()}&endDate=${reportEndDate.toISOString()}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Format date to Brazilian standard
          data.forEach(report => {
            report.groupByField = new Date(report.groupByField).toLocaleDateString("pt-BR");
          });
          setSalesReport(data);
        })
        .catch(error => {
          console.error("Erro ao buscar relatório de vendas:", error);
          setSalesReport([]);
        });
    }
  }, [reportStartDate, reportEndDate]);

  const suppliers = useMemo(
    () => ["Todos", ...new Set(products.map((p) => p.supplier_name))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        selectedSupplier === "Todos" ||
        product.supplier_name === selectedSupplier
    );
  }, [selectedSupplier, products]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const isTypeMatch =
        transactionType === "Todos" || transaction.tipo === transactionType;
      const isDateMatch =
        (!startDate || new Date(transaction.data) >= new Date(startDate)) &&
        (!endDate || new Date(transaction.data) <= new Date(endDate));
      return isTypeMatch && isDateMatch;
    });
  }, [transactionType, startDate, endDate, transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-7 mb-7">
      <Card className="flex flex-col h-[calc(100vh-5.6rem)] overflow-hidden">
        <CardHeader>
          <CardTitle>Relatório de produtos</CardTitle>
          <CardDescription>
            Quantidade de produtos por fornecedor. Selecione um fornecedor:
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden flex flex-col">
          <div className="flex mb-6 justify-end">
            <Select
              onValueChange={setSelectedSupplier}
              value={selectedSupplier}
            >
              <SelectTrigger className="h-11 w-[144px]">
                <SelectValue placeholder="Selecione fornecedor" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier} value={supplier}>
                    {supplier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-auto flex-grow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Fornecedor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.nome}</TableCell>
                    <TableCell className="text-right">
                      {product.quantidade}
                    </TableCell>
                    <TableCell>{product.supplier_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col h-[calc(100vh-5.6rem)] overflow-hidden">
        <CardHeader>
          <CardTitle>Relatório de Transações</CardTitle>
          <CardDescription>
            Exibe todas as transações financeiras. Filtre por tipo e período:
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden flex flex-col">
          <div className="flex mb-6 justify-end gap-1">
            <Select onValueChange={setTransactionType} value={transactionType}>
              <SelectTrigger className="h-11 w-[144px]">
                <SelectValue placeholder="Selecione tipo" />
              </SelectTrigger>
              <SelectContent>
                {["Todos", "Entrada", "Saída"].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setStartDate(e.target.value ? new Date(e.target.value) : null)
              }
              className="border rounded p-2"
              placeholder="Data Inicial"
            />
            <input
              type="date"
              value={endDate ? endDate.toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setEndDate(e.target.value ? new Date(e.target.value) : null)
              }
              className="border rounded p-2"
              placeholder="Data Final"
            />
          </div>
          <div className="overflow-auto flex-grow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(
                        new Date(transaction.data).getTime() +
                          new Date(transaction.data).getTimezoneOffset() * 60000
                      ).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell
                      className={
                        transaction.tipo === "Entrada"
                          ? "font-bold text-red-500"
                          : transaction.tipo === "Saída"
                          ? "font-bold text-green-500"
                          : ""
                      }
                    >
                      {transaction.tipo}
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col h-[calc(100vh-5.6rem)] overflow-hidden">
        <CardHeader>
          <CardTitle>Relatório de Vendas</CardTitle>
          <CardDescription>
            Total de vendas realizadas em um período:
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden flex flex-col">
          <div className="flex mb-6 justify-end gap-1">
            <input
              type="date"
              value={
                reportStartDate
                  ? reportStartDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setReportStartDate(
                  e.target.value ? new Date(e.target.value) : null
                )
              }
              className="border rounded p-2"
              placeholder="Data Inicial"
            />
            <input
              type="date"
              value={
                reportEndDate ? reportEndDate.toISOString().split("T")[0] : ""
              }
              onChange={(e) =>
                setReportEndDate(
                  e.target.value ? new Date(e.target.value) : null
                )
              }
              className="border rounded p-2"
              placeholder="Data Final"
            />
          </div>
          <div className="overflow-auto flex-grow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Total de Vendas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(salesReport) && salesReport.length > 0 ? (
                  salesReport.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>{report.groupByField}</TableCell>
                      <TableCell className="text-right">
                        {report.totalSales.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      Nenhum dado encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}