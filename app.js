import cors from 'cors';
import express from 'express';
import clientesRoutes from './routes/clientesRoutes.js';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = express();

// MIDDLEWARES GLOBALES:
app.use(
  cors({
    origin: 'http://localhost:1573'
  })
);
app.use(helmet());
app.use(express.json());

// RUTAS:
app.get('/', (req, res) => {
  res.send('Funcionando');
});
app.use('/api', clientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
