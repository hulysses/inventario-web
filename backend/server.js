import express from 'express';
import loginRoutes from './routes/loginRoutes.js';
import cors from 'cors'; 
import { createUserTable } from './database/migrations/createUserTable.js';

createUserTable();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', loginRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});