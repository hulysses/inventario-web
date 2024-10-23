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

export const DrawerClient = () => {
    return (
        <Drawer>
            <DrawerTrigger type="button" className="flex border-solid rounded-md border-2 border-gray-200 pl-3 pt-3 pr-3 pb-2 mr-5">Mais detalhes <ArrowRight className="ml-1" /></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>




                </DrawerHeader>
                <DrawerFooter>
                    <Button type="submit" className="hover:bg-orangeHover bg-orange">Confirmar</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}