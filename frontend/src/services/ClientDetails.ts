import { ClientDetails } from "@/types/ClientDetails";

const clientDetails: ClientDetails[] = [
    {
        data_compraId: 1,
        statusId: 1,
        fornecedorId: 1,
        precoId: 'R$221.45'
    },
    {
        data_compraId: 1,
        statusId: 1,
        fornecedorId: 1,
        precoId: 'R$221.45'
    },
]

export function getClientDetails() {
    return clientDetails;
}