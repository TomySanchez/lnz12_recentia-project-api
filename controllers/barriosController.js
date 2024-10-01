import { addBarrio, getBarrios } from '../models/barriosModel.js';

export const getAllBarrios = async (req, res) => {
  try {
    const barrios = await getBarrios();
    res.status(200).json(barrios);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los barrios' });
  }
};

export const createBarrio = async (req, res) => {
  try {
    const nuevoBarrio = req.body;

    if (!nuevoBarrio.nombre || !nuevoBarrio.idLocalidad) {
      return res.status(400).json({
        error:
          'El nombre y el ID de la localidad del barrio son campos obligatorios'
      });
    }

    const result = await addBarrio(nuevoBarrio);

    res.status(201).json({
      message: 'Barrio añadido correctamente',
      barrioId: result.insertId
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al añadir el barrio' });
  }
};
