import express from 'express';
import { registerSupplier } from '../controllers/supplierController.js';

const router = express.Router();
router.post('/', registerSupplier);

export default router;