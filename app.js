import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import dotenv from 'dotenv';
import clientesRoutes from './routes/clientesRoutes.js';
import direccionesRoutes from './routes/direccionesRoutes.js';
import barriosRoutes from './routes/barriosRoutes.js';
import localidadesRoutes from './routes/localidadesRoutes.js';

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
app.use('/api', direccionesRoutes);
app.use('/api', barriosRoutes);
app.use('/api', localidadesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
