import express from 'express';
import { getAllDirecciones } from '../controllers/direccionesController.js';

const router = express.Router();

router.get('/direcciones', getAllDirecciones);

export default router;
