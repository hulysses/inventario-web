import { format } from 'date-fns';
import { Client } from "@/types/Client";

const dataAtual = new Date();
const dataFormatada = format(dataAtual, 'dd/MM/yyyy');

export const clients: Client[] = [
    {
        id: 72852,
        nome: "Roberto",
        cpf_cnpj: "182732873-11",
        contato: "(45)9 9999 9999",
        endereco: "Rua Dois 23",
        createdAt: dataFormatada,
    },
    {
        id: 7285241,
        nome: "Eduarda",
        cpf_cnpj: "182732873-11",
        contato: "(45)9 9999 9999",
        endereco: "Rua Dois 23",
        createdAt: dataFormatada,
    },
    {
        id: 7285241,
        nome: "Eduarda",
        cpf_cnpj: "182732873-11",
        contato: "(45)9 9999 9999",
        endereco: "Rua Dois 23",
        createdAt: dataFormatada,
    },
]

export function getData() {
    return clients;
}