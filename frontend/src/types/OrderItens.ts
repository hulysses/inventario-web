export type OrderItens = {
    id?: number,
    data_adicao: Date,
    produtoNome: string,
    produtoValor: string;
    produtoId: number,
    pedidoId: number | null,
}