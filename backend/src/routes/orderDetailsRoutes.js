import express from 'express';
import { listItensOrders, deleteItensOrders, registerItensOrders, updateItensOrders } from '../controllers/orderItensController.js';

const router = express.Router();

router.get('/itens-orders', listItensOrders);
router.post('/itens-orders', registerItensOrders);
router.put('/itens-orders', updateItensOrders);
router.delete('/itens-orders', deleteItensOrders);

export default router;