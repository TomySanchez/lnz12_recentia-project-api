import { getEntregas } from '../models/entregasModel.js';

export const getAllEntregas = async (req, res) => {
  try {
    const entregas = await getEntregas();

    res.status(200).json(entregas);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener las entregas' });
  }
};
