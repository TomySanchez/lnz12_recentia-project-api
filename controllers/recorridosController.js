import { getRecorridos } from '../models/recorridosModel.js';

export const getAllRecorridos = async (req, res) => {
  try {
    const recorridos = await getRecorridos();

    res.status(200).json(recorridos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los recorridos' });
  }
};
