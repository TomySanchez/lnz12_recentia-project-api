import express from 'express';
import {
  createLocalidad,
  getAllLocalidades
} from '../controllers/localidadesController.js';

const router = express.Router();

router.get('/localidades', getAllLocalidades);
router.post('/localidades', createLocalidad);

export default router;
