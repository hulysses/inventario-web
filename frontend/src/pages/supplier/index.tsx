import { DataTable } from '../../components/table/data-table';
import { columns, Supplier } from '../../components/table/columnsTable/columnsTableSupplier';

const supplier: Supplier[] = [
    {
        id: 1,
        nome: "Hulysses Danciger Magalhães Fogaça",
        cnpj: "54840829000121",
        contato: "44999952286",
        endereco: "R. Amarildo Passos, 635"
    },
    {
        id: 2,
        nome: "Karlla Danciger Magalhães Fogaça",
        cnpj: "14840829000121",
        contato: "34999952286",
        endereco: "Av. Amarildo Passos, 635"
    }
]

export const Suppliers = () => {
    const data = supplier;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl text-blue">Gerenciamento de fornecedores</h1>
            <h3 className="font-light text-gray-500">Gerencie seus fornecedores, podendo editar, excluir ou criar novos!</h3>
            <DataTable
                columns={columns}
                data={data}
                filters={['nome', 'contato']}
            />
        </div>
    )
}
