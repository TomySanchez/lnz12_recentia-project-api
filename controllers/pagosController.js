import { getPagos } from '../models/pagosModel.js';

export const getAllPagos = async (req, res) => {
  try {
    const pagos = await getPagos();

    res.status(200).json(pagos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los pagos' });
  }
};
