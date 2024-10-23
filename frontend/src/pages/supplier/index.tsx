import { DataTable } from '../../components/table/data-table';
import { columns, Supplier } from '../../components/table/columnsTable/columnsTableSupplier';

const supplier: Supplier[] = [
    {
        id: 1,
        nome: "Hulysses Danciger Magalhães Fogaça",
        cnpj: "54.840.829/0001-21",
        contato: "(44) 9 9995-2286",
        endereco: "R. Amarildo Passos, 635"
    }
]


export const Suppliers = () => {
    const data = supplier;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
