import { DataTable } from '../../components/table/data-table';
import { columns } from '../../components/table/columnsTable/columnsTableSupplier';
import { Supplier } from '@/types/Supplier';
import { Sheets } from '@/components/sheet';

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
    const fields = [
        { name: 'fornecedor', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'cnpj', label: 'CNPJ', type: 'text', placeholder: 'Digite o CNPJ', length: 18 },
        { name: 'contato', label: 'Telefone', type: 'text', placeholder: 'Digite o telefone', length: 15},
        { name: 'endereco', label: 'Endereço', type: 'text', placeholder: 'Digite o endereço' },
    ];

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 bg-white mx-7 mb-7 rounded-xl">
            <h1 className="font-bold text-2xl text-blue">Gerenciamento de fornecedores</h1>
            <h3 className="font-light text-gray-500">Gerencie seus fornecedores, podendo editar, excluir ou criar novos!</h3>
            <DataTable
                columns={columns}
                data={data}
                filters={['nome', 'contato']}
                actionComponent={
                    <Sheets
                        buttonText='Novo fornecedor'
                        title='Cadastro de fornecedor'
                        fields={fields}
                    />
                }
            />
        </div>
    )
}
