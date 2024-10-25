import express from 'express';
import { getUserByEmail } from '../controllers/userController.ts';

const router = express.Router();
router.post('/', getUserByEmail);

export default router;