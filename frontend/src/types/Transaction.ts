export type Transaction = {
    id: number,
    supplierId: number,
    clientId: number,
    transaction_type: string,
    transaction_date: Date
    transaction_value: number
}