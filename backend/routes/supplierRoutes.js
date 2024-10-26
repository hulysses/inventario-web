import express from 'express';
import { registerSupplier, listSuppliers, updateSuppliers } from '../controllers/supplierController.js';

const router = express.Router();
router.post('/', registerSupplier);
router.get('/', listSuppliers);
router.put('/', updateSuppliers);

export default router;