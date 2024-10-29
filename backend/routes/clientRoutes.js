import express from 'express';

import { listClients, registerClient } from '../controllers/clientController.js';

const router = express.Router();

router.post('/clients', registerClient);
router.get('/clients', listClients);

export default router;