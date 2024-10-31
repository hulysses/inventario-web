'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const products = [
    { id: 1, name: 'A', quantity: 100, supplier: 'F 1' },
    { id: 2, name: 'B', quantity: 150, supplier: 'F 2' },
    { id: 3, name: 'C', quantity: 75, supplier: 'F 1' },
    { id: 4, name: 'D', quantity: 200, supplier: 'F 3' },
    { id: 5, name: 'E', quantity: 50, supplier: 'F 2' },
]

const suppliers = [...new Set(products.map(p => p.supplier))]

export function Home() {
    const [selectedSupplier, setSelectedSupplier] = useState('Todos')

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            (selectedSupplier === 'Todos' || product.supplier === selectedSupplier)
        )
    }, [selectedSupplier])

    const chartData = useMemo(() => {
        return filteredProducts.map(product => ({
            name: product.name,
            quantity: product.quantity
        }))
    }, [filteredProducts])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-7 mb-7">
            <Card className="flex flex-col h-[calc(100vh-5.6rem)] overflow-hidden">
                <CardHeader>
                    <CardTitle>Relatório de produtos</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden flex flex-col">
                    <div className="flex space-x-4 mb-4">
                        <Select onValueChange={setSelectedSupplier}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione fornecedor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Todos">Todos</SelectItem>
                                {suppliers.map(supplier => (
                                    <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="overflow-auto flex-grow">
                        <Table>
                            <TableHeader >
                                <TableRow>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Quantidade</TableHead>
                                    <TableHead>Fornecedor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell className='flex justify-end'>{product.quantity}</TableCell>
                                        <TableCell>{product.supplier}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <CardFooter className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardFooter>
            </Card>
            {[2, 3].map((cardNumber) => (
                <Card className="flex flex-col h-[calc(100vh-5.6rem)] overflow-hidden">
                    <CardHeader>
                        <CardTitle>Dashboard {cardNumber}</CardTitle>
                        <CardDescription>Performance Overview</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={products}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}