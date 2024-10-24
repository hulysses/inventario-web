import { DataTable } from "../../components/table/data-table";
import { columns } from "../../components/table/columnsTable/columnsTableClient";
import { format } from 'date-fns';
import { Client } from "../../types/Client";
import { Filter, Search } from "lucide-react";
import { SidebarSheet } from "@/components/sidebarSheet";

const dataAtual = new Date();
const dataFormatada = format(dataAtual, 'dd/MM/yyyy');
const clients: Client[] = [
    {
        id: 72852,
        nome: "Roberto",
        cpf_cnpj: "182732873-11",
        contato: "(45)9 9999 9999",
        endereco: "Rua Dois 23",
        createdAt: dataFormatada,
    },
    {
        id: 7285241,
        nome: "Eduarda",
        cpf_cnpj: "182732873-11",
        contato: "(45)9 9999 9999",
        endereco: "Rua Dois 23",
        createdAt: dataFormatada,
    },
    {
        id: 7285241,
        nome: "Eduarda",
        cpf_cnpj: "182732873-11",
        contato: "(45)9 9999 9999",
        endereco: "Rua Dois 23",
        createdAt: dataFormatada,
    },
]

// To do: Formatação de CPF/CNPJ e Contato (Telefone)


function getData() {
    return clients;
}

export const ClientTable = () => {
    const clientQuantity = clients.length;
    const data = getData();

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl">Gerenciamento de clientes</h1>
            <h3 className="font-light text-gray-500">Gerencie seus clientes, podendo alterar, excluir ou criar novos.</h3>
            <div className="flex items-center space-x-4">
                <h1 className="font-bold text-2xl mt-20 -ml-0 flex mx-auto">Clientes <p className="ml-5 text-gray-400">{clientQuantity}</p></h1>
                <div className="flex mx-auto mt-20">
                    <Search className="mt-1 mr-2" />
                    <input type="text" placeholder="Procurar" className="border rounded px-2 py-1 " />
                </div>
                <div className="mt-20 ml-10 flex">
                    <Filter className="mt-1 mr-2" />
                    <input type="text" placeholder="Filtrar" className="border rounded px-2 py-1" />
                </div>
                <SidebarSheet />
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
