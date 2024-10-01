import express from 'express';
import {
  createCliente,
  getAllClientes
} from '../controllers/clientesController.js';

const router = express.Router();

router.get('/clientes', getAllClientes);
router.post('/clientes', createCliente);

export default router;
