import express from 'express';
import { getAllBarrios } from '../controllers/barriosController.js';

const router = express.Router();

router.get('/barrios', getAllBarrios);

export default router;
