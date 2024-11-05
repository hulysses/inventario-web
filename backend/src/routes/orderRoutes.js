import express from 'express';
import { deleteOrder, listOrder, registerOrder, updateOrder } from '../controllers/orderController.js';

const router = express.Router();
router.post('/', registerOrder);
router.get('/', listOrder);
router.put('/', updateOrder);
router.delete('/', deleteOrder);

export default router;