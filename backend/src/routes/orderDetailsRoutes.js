import express from 'express';
import { listItensOrders, deleteItensOrders, registerItensOrders } from '../controllers/orderItensController.js';

const router = express.Router();

router.get('/itens-orders/:pedidoId', listItensOrders);
router.post('/itens-orders', registerItensOrders);
router.delete('/itens-orders/:id', deleteItensOrders);

export default router;