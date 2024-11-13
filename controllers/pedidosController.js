import { addDetalleEntrega } from '../models/detallesEntregasModel.js';
import {
  addDetallePedido,
  deleteDetallePedido,
  getDetallesPedidoByPedidoId,
  updateDetallePedido
} from '../models/detallesPedidosModel.js';
import { addEntrega } from '../models/entregasModel.js';
import { addPago } from '../models/pagosModel.js';
import {
  addPedido,
  disablePedido,
  getPedidos,
  updatePedido
} from '../models/pedidosModel.js';

export const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await getPedidos();

    // Objeto para agrupar los pedidos por idPedido:
    const pedidosMap = {};

    pedidos.forEach((pedido) => {
      // Si el pedido ya está en el objeto, solo agrega un nuevo detalle:
      if (pedidosMap[pedido.idPedido]) {
        if (pedido.idDetallePedido) {
          pedidosMap[pedido.idPedido].detallesPedido.push({
            idDetallePedido: pedido.idDetallePedido,
            cantidad: pedido.cantidad,
            idProducto: pedido.idProducto
          });
        }
      } else {
        // Si el pedido no está en el objeto, lo crea (con o sin detalles):
        pedidosMap[pedido.idPedido] = {
          id: pedido.idPedido,
          fechaRegistro: pedido.fechaRegistro,
          esRecurrente: pedido.esRecurrente,
          cantSemanas: pedido.cantSemanas,
          estado: pedido.estado,
          idCliente: pedido.idCliente,
          activo: pedido.activo,
          // Solo agrega la propiedad 'detallesPedido' si hay detalles:
          detallesPedido: pedido.idDetallePedido
            ? [
                {
                  idDetallePedido: pedido.idDetallePedido,
                  cantidad: pedido.cantidad,
                  idProducto: pedido.idProducto
                }
              ]
            : []
        };
      }
    });

    // Convierte el objeto a un array de pedidos:
    const formattedPedidos = Object.values(pedidosMap);

    res.status(200).json(formattedPedidos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

export const createPedido = async (req, res) => {
  try {
    const { pedido: nuevoPedido, detallesPedido: nuevosDetallesPedido = [] } =
      req.body;

    // Crear pedido:
    if (
      !nuevoPedido.fechaRegistro ||
      !nuevoPedido.estado ||
      !nuevoPedido.idCliente
    ) {
      return res.status(400).json({
        error:
          'El ID del cliente, la fecha de registro y el estado del pedido son campos obligatorios'
      });
    }

    const resultPedido = await addPedido(nuevoPedido);
    const idPedido = resultPedido.insertId;

    if (!idPedido) {
      return res.status(500).json({
        error: 'Error al añadir el pedido',
        result: resultPedido
      });
    }

    // Crear detalles de pedido:
    let detallesPedidoIds = [];

    if (nuevosDetallesPedido && nuevosDetallesPedido.length > 0) {
      // Itera sobre el array de detalles y los agrega a la base de datos:
      for (const detalle of nuevosDetallesPedido) {
        if (!detalle.idProducto || !detalle.cantidad) {
          return res.status(400).json({
            error:
              'El ID del producto y la cantidad son campos obligatorios en los detalles del pedido'
          });
        }

        // Añade el idPedido a cada detalle:
        detalle.idPedido = idPedido;

        const resultDetalle = await addDetallePedido(detalle);
        detallesPedidoIds.push(resultDetalle.insertId); // Guarda cada insertId de los detalles
      }
    }

    // Crear pago:
    const resultPago = await addPago({ estado: 'Pendiente' });
    const idPago = resultPago.insertId;

    if (!idPago) {
      return res.status(500).json({
        error: 'Error al añadir el pago asociado al pedido',
        result: resultEntrega
      });
    }

    // Crear entrega:
    const resultEntrega = await addEntrega({
      estado: 'Sin programar',
      idPedido: idPedido,
      idPago: idPago
    });
    const idEntrega = resultEntrega.insertId;

    if (!idEntrega) {
      return res.status(500).json({
        error: 'Error al añadir la entrega asociada al pedido',
        result: resultEntrega
      });
    }

    // Crear detalles de entrega:
    let detallesEntregaIds = [];
    for (const detallePedido of nuevosDetallesPedido) {
      const detalleEntrega = {
        idEntrega: idEntrega,
        idProducto: detallePedido.idProducto,
        cantidad: detallePedido.cantidad
      };

      const resultDetalleEntrega = await addDetalleEntrega(detalleEntrega);
      detallesEntregaIds.push(resultDetalleEntrega.insertId);
    }

    res.status(201).json({
      message: 'Pedido añadido correctamente',
      pedidoId: idPedido,
      detallesPedidoIds: detallesPedidoIds.length > 0 ? detallesPedidoIds : []
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al añadir el pedido' });
  }
};

export const updatePedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { pedido: dataPedido, detallesPedido: dataDetallesPedido } = req.body;

    // Editar pedido:
    if (
      !dataPedido.fechaRegistro ||
      !dataPedido.estado ||
      !dataPedido.idCliente
    ) {
      return res.status(400).json({
        error:
          'El ID del cliente, la fecha de registro y el estado del pedido son campos obligatorios'
      });
    }

    const resultPedido = await updatePedido(id, dataPedido);

    if (resultPedido.affectedRows === 0) {
      return res.status(404).json({
        error:
          'Pedido no encontrado. No se actualizó el pedido ni los detalles.'
      });
    }

    // Editar detalles de pedido:

    // Obtiene los IDs de los detalles existentes en la base de datos:
    const detallesExistentes = await getDetallesPedidoByPedidoId(id);
    const idsDetallesExistentes = detallesExistentes.map(
      (detalle) => detalle.idDetallePedido
    );

    // Si hay detalles, los procesa:
    let detallesActualizados = [];

    if (dataDetallesPedido && dataDetallesPedido.length > 0) {
      for (const detalle of dataDetallesPedido) {
        if (!detalle.idProducto || !detalle.cantidad) {
          return res.status(400).json({
            error:
              'El ID del producto y la cantidad son campos obligatorios en los detalles del pedido'
          });
        }

        // Si el detalle tiene un idDetallePedido, se actualiza. Sino se inserta:
        if (detalle.idDetallePedido) {
          const resultDetalle = await updateDetallePedido(
            detalle.idDetallePedido,
            {
              idPedido: id,
              idProducto: detalle.idProducto,
              cantidad: detalle.cantidad
            }
          );

          if (resultDetalle.affectedRows === 0) {
            return res.status(404).json({
              error: `Detalle de pedido con ID ${detalle.idDetallePedido} no encontrado. No se actualizó el detalle.`
            });
          }
          detallesActualizados.push(detalle.idDetallePedido);

          // Elimina el ID de los detalles existentes que se están actualizando:
          idsDetallesExistentes.splice(
            idsDetallesExistentes.indexOf(detalle.idDetallePedido),
            1
          );
        } else {
          // Si no tiene un idDetallePedido, lo agrega:
          const resultNuevoDetalle = await addDetallePedido({
            idPedido: id,
            idProducto: detalle.idProducto,
            cantidad: detalle.cantidad
          });

          detallesActualizados.push(resultNuevoDetalle.insertId);
        }
      }
    }

    // Elimina los detalles que ya no están en el cuerpo de la solicitud:
    if (idsDetallesExistentes.length > 0) {
      for (const idDetalleEliminar of idsDetallesExistentes) {
        await deleteDetallePedido(idDetalleEliminar);
      }
    }

    res.status(200).json({
      message: 'Pedido y sus detalles actualizados correctamente',
      detallesActualizados:
        detallesActualizados.length > 0 ? detallesActualizados : [],
      detallesEliminados:
        idsDetallesExistentes.length > 0 ? idsDetallesExistentes : []
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

export const disablePedidoById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await disablePedido(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.status(200).json({ message: 'Pedido desactivado correctamente' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al desactivar el pedido' });
  }
};
