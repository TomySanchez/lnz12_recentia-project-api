import express from 'express';
import { getAllRecorridos } from '../controllers/recorridosController.js';

const router = express.Router();

router.get('/recorridos', getAllRecorridos);

export default router;
