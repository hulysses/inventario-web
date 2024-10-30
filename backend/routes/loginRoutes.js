import express from 'express';
import { getUserLogin } from '../controllers/userController.js';

const router = express.Router();
router.post('/', getUserLogin);

export default router;