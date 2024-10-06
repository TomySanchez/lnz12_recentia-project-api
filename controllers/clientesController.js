import {
  addCliente,
  disableCliente,
  enableCliente,
  getClientes,
  updateCliente
} from '../models/clientesModel.js';
import { addDireccion } from '../models/direccionesModel.js';

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await getClientes();

    const formattedClientes = clientes.map((cliente) => ({
      id: cliente.idCliente,
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      cuit_cuil: cliente.cuit_cuil,
      observaciones: cliente.observaciones,
      activo: cliente.activo,
      direccion: {
        idDireccion: cliente.idDireccion,
        calle: cliente.calle,
        numero: cliente.numero,
        piso: cliente.piso,
        departamento: cliente.departamento,
        idBarrio: cliente.idBarrio,
        barrio: cliente.barrio,
        idLocalidad: cliente.idLocalidad,
        localidad: cliente.localidad
      }
    }));

    res.status(200).json(formattedClientes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

export const createCliente = async (req, res) => {
  try {
    const nuevaDireccion = req.body.direccion;
    const nuevoCliente = req.body.cliente;

    // Crear dirección:
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

    const resultDireccion = await addDireccion(nuevaDireccion);
    const idDireccion = resultDireccion.insertId;

    if (!idDireccion) {
      return res.status(500).json({
        error: 'Error al añadir la dirección',
        result: resultDireccion
      });
    }

    // Crear cliente:
    if (!nuevoCliente.nombre) {
      return res.status(400).json({
        error: 'El nombre del cliente es un campo obligatorio'
      });
    }

    nuevoCliente.idDireccion = idDireccion;

    const resultCliente = await addCliente(nuevoCliente);

    res.status(201).json({
      message: 'Cliente añadido correctamente',
      clienteId: resultCliente.insertId,
      direccionId: idDireccion
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
