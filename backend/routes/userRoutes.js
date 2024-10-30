import express from 'express';
import { registerUser, updateUsers, listUsers, deleteUsers } from '../controllers/userController.js';

const router = express.Router();
router.get('/', listUsers);
router.post('/', registerUser);
router.put('/', updateUsers);
router.delete('/', deleteUsers);

export default router;