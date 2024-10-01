import { getLocalidades } from '../models/localidadesModel.js';

export const getAllLocalidades = async (req, res) => {
  try {
    const localidades = await getLocalidades();
    res.status(200).json(localidades);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener las localidades' });
  }
};
