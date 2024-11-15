"use client";

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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function Home() {
  const [products, setProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("Todos");

  useEffect(() => {
    fetch("http://localhost:3000/home/report")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

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

  const chartConfig = {
    quantidade: {
      label: "Quantidade",
      color: "#023E8A",
    },
  };

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
              <SelectTrigger className="mt-2 w-[180px]">
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
      {[2, 3].map((cardNumber) => (
        <Card
          key={cardNumber}
          className="flex flex-col h-[calc(100vh-5.6rem)] overflow-hidden"
        >
          <CardHeader>
            <CardTitle>Dashboard {cardNumber}</CardTitle>
            <CardDescription>Performance Overview</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart data={products}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="quantidade"
                  fill="var(--color-quantidade)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
