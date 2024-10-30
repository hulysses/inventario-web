import express from 'express';

import { deleteClients, listClients, registerClients, updateClients } from '../controllers/clientController.js';

const router = express.Router();

router.get('/clients', listClients);
router.post('/clients', registerClients);
router.put('/clients', updateClients);
router.delete('/clients', deleteClients);

export default router;