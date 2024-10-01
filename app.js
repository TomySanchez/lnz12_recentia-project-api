import express from 'express';
import dotenv from 'dotenv';
import { promisePool } from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});

app.get('/', (req, res) => {
  res.send('Funcionando');
});

console.log('promisePool:', promisePool);
