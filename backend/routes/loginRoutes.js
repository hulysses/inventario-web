import express from 'express';
import { getUserByEmail } from '../controllers/userController.js';

const router = express.Router();

router.post('/', getUserByEmail);

export default router;