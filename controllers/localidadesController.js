import { addLocalidad, getLocalidades } from '../models/localidadesModel.js';

export const getAllLocalidades = async (req, res) => {
  try {
    const localidades = await getLocalidades();
    res.status(200).json(localidades);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener las localidades' });
  }
};

export const createLocalidad = async (req, res) => {
  try {
    const nuevaLocalidad = req.body;

    if (!nuevaLocalidad.nombre) {
      return res.status(400).json({
        error: 'El nombre de la localidad es un campo obligatorio'
      });
    }

    const result = await addLocalidad(nuevaLocalidad);

    res.status(201).json({
      message: 'Localidad añadida correctamente',
      localidadId: result.insertId
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al añadir el localidad' });
  }
};
