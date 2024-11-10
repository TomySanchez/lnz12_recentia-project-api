import express from 'express';
import { getAllPagos } from '../controllers/pagosController.js';

const router = express.Router();

router.get('/pagos', getAllPagos);

export default router;
