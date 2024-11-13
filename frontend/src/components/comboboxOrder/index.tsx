import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Product } from "@/types/Product"
import { OrderItens } from "@/types/OrderItens"

type ItemToAdd = {
    value: string,
    label: string
}

export const ComboboxOrder = () => {

    const [produtos, setProdutos] = useState<Product[]>([]);
    const [itens, setItens] = useState<OrderItens[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Product | null>(null);
    const [itensToAdd, setItensToAdd] = useState<ItemToAdd[]>([]);
    const [loading, setLoading] = useState(false);

    // TO DO: Organizar e separar código 

    const handleAddItem = async () => {
        if (produtoSelecionado) {
            const novoItem: OrderItens = {
                produtoNome: produtoSelecionado.nome,
                produtoValor: produtoSelecionado.preco,
                produtoId: produtoSelecionado.id,
                data_adicao: new Date().toISOString(),
            };

            setItens((prevItens) => [...prevItens, novoItem]);

            try {
                setLoading(true);
                await axios.post("http://localhost:3000/itens-orders", novoItem);
                console.log("Item adicionado com sucesso.");
            } catch (error) {
                console.error("Erro ao adicionar item:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        axios
            .get('http://localhost:3000/products')
            .then((response) => {
                const transformedItens = response.data.map((produto: Product) => ({
                    value: produto.nome,
                }));

                setItensToAdd(transformedItens);
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar produtos', error);
            });
    }, []);

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between opacity-90 mx-auto right-0"

                    >
                        {value
                            ? itensToAdd.find((item) => item.value === value)?.value
                            : "Adicione um item..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Procure um item..." />
                        <CommandList>
                            <CommandEmpty>Nenhum item achado.</CommandEmpty>
                            <CommandGroup>
                                {itensToAdd.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        value={item.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)

                                            const selectedProduct = produtos.find(
                                                (produto) => produto.nome === currentValue
                                            );
                                            setProdutoSelecionado(selectedProduct || null);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.value}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button
                className="bg-green-500 hover:bg-green-400"
                onClick={handleAddItem}
                disabled={!produtoSelecionado || loading}
            >Adicionar Item</Button>
        </>
    )
}