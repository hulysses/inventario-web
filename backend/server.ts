import cors from 'cors';
import express from 'express';
import loginRoutes from './routes/loginRoutes.ts';
import supplierRoutes from  './routes/supplierRoutes.ts';
import { runMigrations } from './database/migrations/index.ts';

runMigrations();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', loginRoutes);
app.use('/supplier', supplierRoutes);

app.listen(3000);