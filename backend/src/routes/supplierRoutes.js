import express from 'express';
import { registerSupplier, listSuppliers, updateSuppliers, deleteSuppliers } from '../controllers/supplierController.js';

const router = express.Router();
router.post('/', registerSupplier);
router.get('/', listSuppliers);
router.put('/', updateSuppliers);
router.delete('/', deleteSuppliers);

export default router;