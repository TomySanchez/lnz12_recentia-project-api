import express from 'express';
import {
  createPedido,
  getAllPedidos
} from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/pedidos', getAllPedidos);
router.post('/pedidos', createPedido);

export default router;
