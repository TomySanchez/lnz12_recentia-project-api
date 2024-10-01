import express from 'express';
import clientesRoutes from './routes/clientesRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Funcionando');
});

app.get('/api', (req, res) => {
  res.send('Funcionando');
});

app.use('/api', clientesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
