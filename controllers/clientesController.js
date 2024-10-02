import {
  addCliente,
  disableCliente,
  enableCliente,
  getClientes,
  updateCliente
} from '../models/clientesModel.js';

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

export const updateClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data.nombre || !data.idDireccion) {
      return res.status(400).json({
        error: 'El nombre y la dirección del cliente son campos obligatorios'
      });
    }

    const result = await updateCliente(id, data);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente actualizado correctamente' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

export const disableClienteById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await disableCliente(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente desactivado correctamente' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al desactivar el cliente' });
  }
};

export const enableClienteById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await enableCliente(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente activado correctamente' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al activar el cliente' });
  }
};
