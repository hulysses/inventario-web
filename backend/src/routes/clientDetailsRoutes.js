import express from 'express';
import { db } from '../database/db.js';

const router = express.Router();

router.get('/clients/:id', (req, res) => {
    const clienteId = req.params.id;
    console.log("Buscando pedidos para clienteId:", clienteId);

    try {
        const statement = db.prepare("SELECT * FROM orders WHERE clienteId = ?");
        const orders = statement.all(clienteId);
        res.json(orders);
    } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
