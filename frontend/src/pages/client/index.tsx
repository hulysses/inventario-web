import { DataTable } from "@/components/table/data-table"
import { columns } from "@/components/table/columnsTable/columnsTableClient";

import { Filter, Search } from "lucide-react";
import { SidebarSheet } from "@/components/sidebarSheet";

import { getData, clients } from "@/services/Client";


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
