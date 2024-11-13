export type OrderItens = {
    id?: number,
    data_adicao: string,
    produtoNome: string,
    produtoValor: string;
    produtoId: number,
    pedidoId: number | null,
}