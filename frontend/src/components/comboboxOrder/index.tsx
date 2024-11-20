import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/Product";
import { OrderItens } from "@/types/OrderItens";
import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type ItemToAdd = {
  value: string;
  label: string;
};

type ComboboxOrderProps = {
  pedidoId: number | null;
};

export const ComboboxOrder = ({ pedidoId }: ComboboxOrderProps) => {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [itensToAdd, setItensToAdd] = useState<ItemToAdd[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<OrderItens[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const transformedItens = response.data.map((produto: Product) => ({
          value: produto.nome,
          label: produto.nome,
        }));

        setItensToAdd(transformedItens);
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos", error);
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
        const response = await axios.post(
          "http://localhost:3000/itens-orders",
          {
            produto_id: selectedProductId,
            pedido_id: pedidoId,
            nome: produtoSelecionado.nome,
            quantidade: quantity,
            preco_unitario: produtoSelecionado.preco,
          }
        );

        setSelectedProduct((prevItems) => [...prevItems, response.data]);
        setValue("");
        setSelectedProductId(null);
        setQuantity(1);
      }
    } catch (error) {
      console.error("Erro ao adicionar item ao pedido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, selectedProduct);

  return (
    <div className="flex items-center space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between opacity-90"
          >
            {value
              ? itensToAdd.find((item) => item.value === value)?.value
              : "Selecione um item..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Procure um item..." />
            <CommandList>
              <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
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
      <Input
        type="number"
        value={quantity}
        onChange={(e) =>
          setQuantity(Math.max(1, parseInt(e.target.value) || 0))
        }
        className="w-20 border"
        min="1"
      />
      <Button
        className="bg-orange hover:bg-orangeHover text-white font-semibold"
        disabled={!selectedProductId || quantity <= 0 || loading}
        onClick={handleAddItemOrder}
      >
        <Plus className="w-4 mr-1" />
        Adicionar
      </Button>
    </div>
  );
};
