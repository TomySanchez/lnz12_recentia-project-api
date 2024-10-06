import express from 'express';
import { getAllPedidos } from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/pedidos', getAllPedidos);

export default router;
