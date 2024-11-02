import express from 'express';
import { getAllDiasSemana } from '../controllers/diasSemanaController.js';

const router = express.Router();

router.get('/diasSemana', getAllDiasSemana);

export default router;
