import { getBarrios } from '../models/barriosModel.js';

export const getAllBarrios = async (req, res) => {
  try {
    const barrios = await getBarrios();
    res.status(200).json(barrios);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los barrios' });
  }
};
