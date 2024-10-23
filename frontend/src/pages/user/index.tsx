import { Button } from "@/components/ui/button";
import { DataTable } from "../../components/table/data-table";
import { columns, Payment } from "../../components/table/columnsTable/columnsTableUser";

const payments: Payment[] = [
    {
        id: 72852,
        nome: "Roberto",
        createdAt: new Date('2024-10-21'),
        email: "robertonandes@example.com"
    },
    {
        id: 7285241,
        nome: "Eduarda",
        createdAt: new Date('2024-10-21'),
        email: "eduardaguido@example.com"
    },
]

function getData() {
    return payments;
}

export const ClientTable = () => {
    const data = getData();

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl">Gerenciamento de usuários</h1>
            <h3 className="font-light text-gray-500">Gerencie seus usuários, podendo alterar, excluir ou criar novos!</h3>

            <div className="flex items-center space-x-4">
                <h1 className="font-bold text-2xl mt-20 -ml-0 flex mx-auto">Usuários <p className="ml-5 text-gray-400">2</p></h1>
                <input type="text" placeholder="Procurar" className="border rounded px-2 py-1 mt-20 ml-16" />
                <input type="text" placeholder="Filtrar" className="border rounded px-2 py-1 mt-20 ml-16" />
                <Button type="button" className="border rounded px-2 py-1 mt-20 ml-16">Adicionar usuário</Button>
            </div>

            <DataTable columns={columns} data={data} />
        </div>
    )
}
