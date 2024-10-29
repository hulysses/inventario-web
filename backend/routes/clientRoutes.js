import express from 'express';

import { deleteClients, listClients, registerClient, updateClients } from '../controllers/clientController.js';

const router = express.Router();

router.post('/clients', registerClient);
router.get('/clients', listClients);
router.put('/clients', updateClients);
router.delete('/clients', deleteClients);

export default router;