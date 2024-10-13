import express from 'express';
import {
  createPedido,
  disablePedidoById,
  getAllPedidos,
  updatePedidoById
} from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/pedidos', getAllPedidos);
router.post('/pedidos', createPedido);
router.put('/pedidos/:id', updatePedidoById);
router.delete('/pedidos/:id', disablePedidoById);

export default router;
