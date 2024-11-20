import express from 'express';
import { deleteOrder, listOrder, registerOrder, updateOrder, getSalesReport } from '../controllers/orderController.js';

const router = express.Router();
router.post('/', registerOrder);
router.get('/', listOrder);
router.get('/home/reportsales', getSalesReport);
router.put('/', updateOrder);
router.delete('/', deleteOrder);

export default router;