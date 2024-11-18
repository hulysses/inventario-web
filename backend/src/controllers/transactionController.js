import { listTransactionS } from "../database/services/transactionService.js";

export const listTransaction = (req, res) => {
    try {
        const transactions = listTransactionS();
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Erro ao listar transações:', error);
        res.status(500).json({ message: 'Erro ao listar transações' });
    }
}