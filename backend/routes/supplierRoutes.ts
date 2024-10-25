import express from 'express';
import { registerSupplier } from '../controllers/supplierController';

const router = express.Router();
router.post('/supllier', registerSupplier);

export default router;