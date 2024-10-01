import { getDirecciones } from '../models/direccionesModel.js';

export const getAllDirecciones = async (req, res) => {
  try {
    const direcciones = await getDirecciones();
    res.status(200).json(direcciones);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener las direcciones' });
  }
};
