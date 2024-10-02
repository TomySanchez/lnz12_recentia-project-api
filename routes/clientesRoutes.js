import express from 'express';
import {
  createCliente,
  disableClienteById,
  enableClienteById,
  getAllClientes,
  updateClienteById
} from '../controllers/clientesController.js';

const router = express.Router();

router.get('/clientes', getAllClientes);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateClienteById);
router.delete('/clientes/:id', disableClienteById);
router.patch('/clientes/:id', enableClienteById);

export default router;
