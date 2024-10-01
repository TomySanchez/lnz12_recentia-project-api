import { getClientes } from '../models/clientesModel.js';

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await getClientes();
    res.status(200).json(clientes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};
