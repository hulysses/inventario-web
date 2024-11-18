import express from 'express';

import { listTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/transactions', listTransaction);

export default router;