import express from 'express';
import { registerSupplier, listSuppliers } from '../controllers/supplierController.js';

const router = express.Router();
router.post('/', registerSupplier);
router.get('/', listSuppliers);

export default router;