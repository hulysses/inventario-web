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

type ComboboxOrderProps = {
    pedidoId: number | null,
}

export const ComboboxOrder = ({ pedidoId }: ComboboxOrderProps) => {

    const [produtos, setProdutos] = useState<Product[]>([]);
    const [itensToAdd, setItensToAdd] = useState<ItemToAdd[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<OrderItens[]>([]);
    // TO DO: Organizar e separar código 

    useEffect(() => {
        axios
            .get('http://localhost:3000/products')
            .then((response) => {
                const transformedItens = response.data.map((produto: Product) => ({
                    value: produto.nome,
                    label: produto.nome
                }));

                setItensToAdd(transformedItens);
                setProdutos(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar produtos', error);
            });
    }, []);

    const handleAddItemOrder = async () => {
        if (!selectedProductId) return;

        setLoading(true);

        try {
            const produtoSelecionado = produtos.find(
                (produto) => produto.id === selectedProductId
            );

            if (produtoSelecionado) {
                const response = await axios.post('http://localhost:3000/itens-orders', {
                    produtoId: selectedProductId,
                    pedidoId: pedidoId,
                    produtoNome: produtoSelecionado.nome,
                    produtoValor: produtoSelecionado.preco,
                    data_adicao: new Date().toISOString(),
                });
                setSelectedProduct([...selectedProduct, response.data]);
            }

        } catch (error) {
            console.error('Erro ao adicionar item ao pedioo');
        } finally {
            setLoading(false);
        }
    }

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
                                            const selectedProduct = produtos.find(
                                                (produto) => produto.nome === currentValue
                                            );
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);

                                            if (selectedProduct) {
                                                setSelectedProductId(selectedProduct.id);
                                            }
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
                disabled={!selectedProduct || loading}
                onClick={handleAddItemOrder}
            >Adicionar Item</Button>
        </>
    )
}