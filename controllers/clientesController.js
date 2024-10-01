import { addCliente, getClientes } from '../models/clientesModel.js';

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await getClientes();
    res.status(200).json(clientes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

export const createCliente = async (req, res) => {
  try {
    const nuevoCliente = req.body;

    if (!nuevoCliente.nombre || !nuevoCliente.idDireccion) {
      return res.status(400).json({
        error: 'El nombre y la dirección del cliente son campos obligatorios'
      });
    }

    const result = await addCliente(nuevoCliente);

    res.status(201).json({
      message: 'Cliente añadido correctamente',
      clienteId: result.insertId
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al añadir el cliente' });
  }
};
