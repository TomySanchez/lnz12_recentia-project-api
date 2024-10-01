import express from 'express';
import {
  createDireccion,
  getAllDirecciones
} from '../controllers/direccionesController.js';

const router = express.Router();

router.get('/direcciones', getAllDirecciones);
router.post('/direcciones', createDireccion);

export default router;
