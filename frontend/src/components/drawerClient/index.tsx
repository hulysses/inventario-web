import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { ClientDetails } from "@/types/ClientDetails";
import { DataTable } from "../userDetailsTable/data-table";
import { columns } from "../userDetailsTable/columnsTable/columnsTableUser";

const clientDetails: ClientDetails[] = [
    {
        data_compraId: 1,
        statusId: 1,
        fornecedorId: 1,
        precoId: 'R$221.45'
    },
    {
        data_compraId: 1,
        statusId: 1,
        fornecedorId: 1,
        precoId: 'R$221.45'
    },
]

function getClientDetails() {
    return clientDetails;
}

export const DrawerClient = () => {
    const data = getClientDetails();

    return (
        <Drawer>
            <DrawerTrigger type="button" className="flex rounded-md border-gray-200 pl-3 pt-3 pr-3 pb-2 mr-5">Mais detalhes <ArrowRight className="ml-1" /></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Histórico de Pedidos</DrawerTitle>
                    <DrawerDescription>Apenas visualização</DrawerDescription>

                    <DataTable columns={columns} data={data}></DataTable>

                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button type="submit" className="hover:bg-orangeHover bg-orange">Confirmar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}