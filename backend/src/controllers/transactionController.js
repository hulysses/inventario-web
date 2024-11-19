import { deleteTransactionS, insertTransactionS, listTransactionS, updateTransactionS } from "../database/services/transactionService.js";

export const registerTransaction = (req, res) => {
    const { clientId, supplierId, transaction_type, transaction_date, transaction_value } = req.body;

    if (insertTransactionS(clientId, supplierId, transaction_type, transaction_date, transaction_value)) {
        res.status(201).json({ message: "Transação cadastrado com sucesso" });
    } else {
        res.status(400).json({ message: "Erro ao cadastrar transação." });
    }
};

export const listTransaction = (req, res) => {
    try {
        const transactions = listTransactionS();
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Erro ao listar transações:', error);
        res.status(500).json({ message: 'Erro ao listar transações' });
    }
}

export const updateTransaction = (req, res) => {
    try {
        const { id } = req.query;
        const { clientId, supplierId, transaction_type, transaction_date, transaction_value } = req.body;

        updateTransactionS(id, clientId, supplierId, transaction_type, transaction_date, transaction_value);
        res.status(200).json({ message: "Transação atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar transação:", error);
        res.status(500).json({ message: "Erro ao atualizar transação" });
    }
};

export const deleteTransaction = (req, res) => {
    try {
        const { id } = req.query;
        deleteTransactionS(id);
        res.status(200).json({ message: "Transaction deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar transaction:", error);
        res.status(500).json({ message: "Erro ao deletar transaction" });
    }
};