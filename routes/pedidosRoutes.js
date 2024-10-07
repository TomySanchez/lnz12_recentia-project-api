import express from 'express';
import {
  createPedido,
  getAllPedidos,
  updatePedidoById
} from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/pedidos', getAllPedidos);
router.post('/pedidos', createPedido);
router.put('/pedidos/:id', updatePedidoById);

export default router;
