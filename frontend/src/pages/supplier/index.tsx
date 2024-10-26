'use client'

import { useState } from 'react';
import { DataTable } from '../../components/table/data-table';
import { columns } from '../../components/table/columnsTable/columnsTableSupplier';
import { Supplier } from '@/types/Supplier';
import { Sheets } from '@/components/sheet';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from "lucide-react";

const supplier: Supplier[] = [
    {
        id: 1,
        nome: "Hulysses Danciger Magalhães Fogaça",
        cnpj: "54840829000121",
        contato: "44999952286",
        endereco: "R. Amarildo Passos, 635"
    },
    {
        id: 2,
        nome: "Karlla Danciger Magalhães Fogaça",
        cnpj: "14840829000121",
        contato: "34999952286",
        endereco: "Av. Amarildo Passos, 635"
    }
];

export const Suppliers = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const data = supplier;
    const fields = [
        { name: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'cnpj', label: 'CNPJ', type: 'text', placeholder: 'Digite o CNPJ', length: 18 },
        { name: 'contato', label: 'Telefone', type: 'text', placeholder: 'Digite o telefone', length: 15},
        { name: 'endereco', label: 'Endereço', type: 'text', placeholder: 'Digite o endereço' },
    ];

    const handleDialogOpen = (isOpen: boolean) => {
        setDialogOpen(isOpen);
    };

    const handleCadastroSucesso = (sucesso: boolean) => {
        setCadastroSucesso(sucesso);
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl text-blue">Gerenciamento de fornecedores</h1>
            <h3 className="font-light text-gray-500">Gerencie seus fornecedores, podendo editar, excluir ou criar novos!</h3>
            <DataTable
                columns={columns}
                data={data}
                filters={['nome', 'contato']}
                actionComponent={
                    <Sheets
                        buttonText='Novo fornecedor'
                        title='Cadastro de fornecedor'
                        fields={fields}
                        apiEndpoint='http://localhost:3000/supplier'
                        onDialogOpen={handleDialogOpen}
                        onCadastroSucesso={handleCadastroSucesso}
                    />
                }
            />
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{cadastroSucesso ? "Cadastro Realizado" : "Erro no Cadastro"}</DialogTitle>
                        <DialogDescription>
                            {cadastroSucesso ? (
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    Cadastrado realizado com sucesso!
                                </div>
                            ) : (
                                <div className="flex items-center text-red-600">
                                    <XCircle className="mr-2 h-5 w-5" />
                                    Houve um erro ao cadastrar.
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <Button onClick={() => setDialogOpen(false)}>Fechar</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}