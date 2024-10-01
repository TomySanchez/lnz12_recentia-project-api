import express from 'express';
import { getAllClientes } from '../controllers/clientesController.js';

const router = express.Router();

router.get('/clientes', getAllClientes);

export default router;
