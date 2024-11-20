import axios from "axios";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderItens } from "@/types/OrderItens";
import { DataTable } from "../table/data-table";
import { DrawerOrderProps } from "../../types/DrawerOrder";
import { ComboboxOrder } from "../comboboxOrder";
import { useDataTable } from "@/hooks/useDataTable";
import { columns as columnsTemplate } from "../table/columnsTable/columnsTableOrderDetails";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const DrawerOrder = ({ pedidoId }: DrawerOrderProps) => {
  const [data, setData] = useState<OrderItens[]>([]);

  const fetchOrderItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/itens-orders/${pedidoId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar item do pedido");
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/itens-orders/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  };

  const columns = columnsTemplate(handleDeleteItem);
  const { table } = useDataTable(columns, data);

  useEffect(() => {
    fetchOrderItems();
  }, [pedidoId]);

  return (
    <Drawer>
      <DrawerTrigger
        type="button"
        className="flex rounded-md border-gray-200 "
      >
        Visualizar <ArrowRight className="ml-1" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between space-x-2">
            <DrawerTitle>Itens do pedido</DrawerTitle>
            <div className="flex items-center justify-end space-x-2">
              <ComboboxOrder pedidoId={pedidoId} />
            </div>
          </div>
          <DataTable columns={columns} table={table} />
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button type="submit" className="hover:bg-orangeHover bg-orange">
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
