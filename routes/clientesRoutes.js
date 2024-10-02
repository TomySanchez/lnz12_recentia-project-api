import express from 'express';
import {
  createCliente,
  getAllClientes,
  updateClienteById
} from '../controllers/clientesController.js';

const router = express.Router();

router.get('/clientes', getAllClientes);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateClienteById);

export default router;
