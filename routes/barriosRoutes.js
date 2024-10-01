import express from 'express';
import {
  createBarrio,
  getAllBarrios
} from '../controllers/barriosController.js';

const router = express.Router();

router.get('/barrios', getAllBarrios);
router.post('/barrios', createBarrio);

export default router;
