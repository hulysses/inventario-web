import express from 'express';
import loginRoutes from './routes/loginRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import cors from 'cors';
import { createUserTable } from './database/migrations/createUserTable.js';
import { createClientTable, dropClientTable } from './database/migrations/createClientTable.js';

createUserTable();
dropClientTable();
createClientTable();

const app = express();
app.use(cors());
app.use(express.json())

app.use('/', loginRoutes);
app.use('/', clientRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});