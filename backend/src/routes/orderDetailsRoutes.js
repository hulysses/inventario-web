import express from 'express';
import { db } from '../database/db.js';

const router = express.Router();

router.get('/orders/:id', (req, res) => {
    const orderId = req.params.id;

    try {
        const statement = db.prepare("SELECT * FROM orders WHERE orderId = ?");
        const orders = statement.all(orderId);
        res.json(orders);
    } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;