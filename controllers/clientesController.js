import {
  addCliente,
  disableCliente,
  enableCliente,
  getClientes,
  updateCliente
} from '../models/clientesModel.js';
import { addDireccion, updateDireccion } from '../models/direccionesModel.js';
import {
  addDisponibilidad,
  deleteDisponibilidad,
  getDisponibilidadesByClienteId,
  updateDisponibilidad
} from '../models/disponibilidadesModel.js';

export const getAllClientes = async (req, res) => {
  try {
    const clientesData = await getClientes();

    const clientes = [];
    const clientesMap = {};

    clientesData.forEach((cliente) => {
      if (!clientesMap[cliente.idCliente]) {
        clientesMap[cliente.idCliente] = {
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
          },
          disponibilidades: []
        };
        clientes.push(clientesMap[cliente.idCliente]);
      }

      // Agregar disponibilidad (si existe):
      if (cliente.idDiaSemana) {
        clientesMap[cliente.idCliente].disponibilidades.push({
          idDisponibilidad: cliente.idDisponibilidad,
          idDiaSemana: cliente.idDiaSemana,
          nroDiaSemana: cliente.nroOrdenSemana,
          diaSemana: cliente.diaSemana,
          horaInicio: cliente.horaInicio,
          horaFin: cliente.horaFin
        });
      }
    });

    res.status(200).json(clientes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

export const createCliente = async (req, res) => {
  try {
    const nuevaDireccion = req.body.direccion;
    const nuevoCliente = req.body.cliente;
    const disponibilidades = req.body.disponibilidades;

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
    const idCliente = resultCliente.insertId;

    // Crear disponibilidades:
    const idsDisponibilidades = [];

    if (disponibilidades && Array.isArray(disponibilidades)) {
      const disponibilidadPromises = disponibilidades.map((disp) => {
        if (!disp.idDiaSemana || !disp.horaInicio || !disp.horaFin) {
          return Promise.reject(
            new Error(
              'Cada disponibilidad debe tener idDiaSemana, horaInicio y horaFin'
            )
          );
        }

        return addDisponibilidad({
          idCliente,
          idDiaSemana: disp.idDiaSemana,
          horaInicio: disp.horaInicio,
          horaFin: disp.horaFin
        }).then((result) => {
          idsDisponibilidades.push(result.insertId);
        });
      });

      await Promise.all(disponibilidadPromises).catch((err) => {
        console.error('Error al añadir las disponibilidades del cliente:', err);
        return res.status(500).json({
          error: 'Error al añadir las disponibilidades del cliente'
        });
      });
    }

    res.status(201).json({
      message: 'Cliente añadido correctamente',
      clienteId: idCliente,
      direccionId: idDireccion,
      disponibilidadesIds: idsDisponibilidades
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al añadir el cliente' });
  }
};

export const updateClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataCliente = req.body.cliente;
    const dataDireccion = req.body.direccion;
    const dataDisponibilidades = req.body.disponibilidades;

    // Editar dirección:
    if (
      !dataDireccion.calle ||
      !dataDireccion.numero ||
      !dataDireccion.idBarrio
    ) {
      return res.status(400).json({
        error:
          'La calle, el número y el ID del barrio de la dirección son campos obligatorios'
      });
    }

    const idDireccion = dataDireccion.idDireccion;

    const resultDireccion = await updateDireccion(idDireccion, dataDireccion);

    if (resultDireccion.affectedRows === 0) {
      return res.status(404).json({
        error:
          'Dirección no encontrada. No se actualizó la dirección ni el cliente'
      });
    }

    // Editar cliente:
    if (!dataCliente.nombre) {
      return res.status(400).json({
        error: 'El nombre del cliente es un campo obligatorio'
      });
    }

    const resultCliente = await updateCliente(id, dataCliente);

    if (resultCliente.affectedRows === 0) {
      return res.status(404).json({
        error:
          'Cliente no encontrado. Se actualizó la dirección pero no el cliente'
      });
    }

    // Editar disponibilidades:
    if (dataDisponibilidades && Array.isArray(dataDisponibilidades)) {
      // Obtener disponibilidades existentes:
      const existingDisponibilidades = await getDisponibilidadesByClienteId(id);
      const existingIds = existingDisponibilidades.map((disp) => disp.id);

      const updatedIds = [];

      for (const disp of dataDisponibilidades) {
        // Verificar que los campos requeridos estén presentes, pero permitir que `id` sea opcional
        if (!disp.idDiaSemana || !disp.horaInicio || !disp.horaFin) {
          return res.status(400).json({
            error:
              'Cada disponibilidad debe tener idDiaSemana, horaInicio y horaFin'
          });
        }

        // Si el ID es proporcionado, validar que se esté tratando de actualizar o insertar correctamente
        if (disp.id) {
          // Si la disponibilidad ya existe, se actualiza:
          if (existingIds.includes(disp.id)) {
            await updateDisponibilidad(disp.id, {
              idDiaSemana: disp.idDiaSemana,
              horaInicio: disp.horaInicio,
              horaFin: disp.horaFin
            });
            updatedIds.push(disp.id);
          } else {
            return res.status(400).json({
              error: `La disponibilidad con ID ${disp.id} no existe`
            });
          }
        } else {
          // Si no se proporciona un ID, se inserta como nueva disponibilidad
          const resultNuevo = await addDisponibilidad({
            idCliente: id,
            idDiaSemana: disp.idDiaSemana,
            horaInicio: disp.horaInicio,
            horaFin: disp.horaFin
          });
          updatedIds.push(resultNuevo.insertId);
        }
      }

      // Eliminar las disponibilidades que faltan:
      const idsToDelete = existingIds.filter((id) => !updatedIds.includes(id));
      for (const idEliminar of idsToDelete) {
        await deleteDisponibilidad(idEliminar);
      }
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
