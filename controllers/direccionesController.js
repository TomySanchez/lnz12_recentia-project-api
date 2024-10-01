import { addDireccion, getDirecciones } from '../models/direccionesModel.js';

export const getAllDirecciones = async (req, res) => {
  try {
    const direcciones = await getDirecciones();
    res.status(200).json(direcciones);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener las direcciones' });
  }
};

export const createDireccion = async (req, res) => {
  try {
    const nuevaDireccion = req.body;

    if (
      !nuevaDireccion.calle ||
      !nuevaDireccion.numero ||
      !nuevaDireccion.idBarrio
    ) {
      return res.status(400).json({
        error:
          'La calle, el número y el ID del barrio de la dirección son campos obligatorios'
      });
    }

    const result = await addDireccion(nuevaDireccion);

    res.status(201).json({
      message: 'Dirección añadida correctamente',
      direccionId: result.insertId
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al añadir la dirección' });
  }
};
