import express from 'express';
import { getAllLocalidades } from '../controllers/localidadesController.js';

const router = express.Router();

router.get('/localidades', getAllLocalidades);

export default router;
