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

import { DataTable } from "../userDetailsTable/data-table";
import { columns } from "../userDetailsTable/columnsTable/columnsTableUser";
import { getClientDetails } from "@/services/ClientDetails";

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