import express from 'express';

import { deleteTransaction, listTransaction, registerTransaction, updateTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/transactions', listTransaction);
router.get('/home/reporttransaction', listTransaction);
router.post('/transactions', registerTransaction);
router.put('/transactions', updateTransaction);
router.delete('/transactions', deleteTransaction);

export default router;