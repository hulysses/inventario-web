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

export const SidebarSheet = () => {
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
                            <Input id="nome" value="" placeholder="Pedro Duarte" className="col-span-3 border-solid border-2 border-blue" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="e-mail" className="text-right">
                                E-mail
                            </Label>
                            <Input id="e-mail" value="" placeholder="peduarte@hotmail.com" className="col-span-3 border-solid border-2 border-blue" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="e-mail" className="text-right">
                                CPF/CNPJ
                            </Label>
                            <Input id="e-mail" placeholder="782.321.243-12" className="col-span-3 border-solid border-2 border-blue" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="e-mail" className="text-right">
                                Contato
                            </Label>
                            <Input id="e-mail" value="" placeholder="(99)9 9999 9999" className="col-span-3 border-solid border-2 border-blue" />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="e-mail" className="text-right">
                                Endereço
                            </Label>
                            <Input id="e-mail" value="" placeholder="Rua Dois 243" className="col-span-3 border-solid border-2 border-blue" />
                        </div>

                        <Button type="submit" className="hover:bg-orangeHover bg-orange">Confirmar</Button>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )



}