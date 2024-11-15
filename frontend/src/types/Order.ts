export type Order = {
    pedidoId: number
    id: number,
    data: Date,
    clienteId: number,
    status: string, // Pendente ou Concluído
    total: number
}