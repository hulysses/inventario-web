import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

export default function SidebarSheet() {
    const baseUrl = 'http://localhost:3000/clients'

    const [nome, setNome] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [contato, setContato] = useState('');
    const [clientAdded, setClientAdded] = useState<boolean | null>(null);

    async function handleSubmit(event: any) {
        event.preventDefault();
        setClientAdded(false);

        axios.post(baseUrl, {
            nome: nome,
            cpf_cnpj: cpfCnpj,
            endereco: endereco,
            contato: contato
        }).then((response) => {
            console.log(response.data);
            setClientAdded(true);
        }).catch((error) => {
            setClientAdded(false);
            console.log("Erro ao inserir cliente: ", error);
        })
    }

    return (
        <Sheet>
            <SheetTrigger type="button" className="rounded-sm
                    px-2 py-1 mt-20 ml-16 bg-orange hover:bg-orangeHover text-white">Adicionar cliente</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Adicionar cliente</SheetTitle>
                    <SheetDescription>
                        Após adicionar os dados, confirme clicando em "Confirmar" para adicionar seu novo cliente.
                    </SheetDescription>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nome" className="text-right">
                                Nome
                            </Label>
                            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Pedro Duarte" className="col-span-3 border-solid border-2 border-blue" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                CPF/CNPJ
                            </Label>
                            <Input value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} placeholder="123-456-789-11" className="col-span-3 border-solid border-2 border-blue" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Contato
                            </Label>
                            <Input value={contato} onChange={(e) => setContato(e.target.value)} placeholder="(99)9 9999 9999" className="col-span-3 border-solid border-2 border-blue" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Endereço
                            </Label>
                            <Input id="e-mail" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Rua Dois 243" className="col-span-3 border-solid border-2 border-blue" />
                        </div>

                        <Button type="submit" onClick={handleSubmit} className="hover:bg-orangeHover bg-orange">Confirmar</Button>

                        <Toaster />

                        {/* {clientAdded !== null && (
                            <div className="text-white">
                                {clientAdded
                                    ? toast("Usuário inserido com sucesso.")
                                    : toast("Falha ao inserir usuário.")
                                }
                            </div>
                        )}
                        <Toaster /> */}

                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet >
    )
}