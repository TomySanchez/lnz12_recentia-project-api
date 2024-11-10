import express from 'express';
import { getAllEntregas } from '../controllers/entregasController.js';

const router = express.Router();

router.get('/entregas', getAllEntregas);

export default router;
