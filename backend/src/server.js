import cors from 'cors';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import loginRoutes from './routes/loginRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import clientDetailsRoutes from './routes/clientDetailsRoutes.js'
import { runMigrations } from './database/migrations/index.js';

runMigrations();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', loginRoutes);
app.use('/users', userRoutes);
app.use('/', clientRoutes);
app.use('/', clientDetailsRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(3000);
console.log("Servidor rodando.")