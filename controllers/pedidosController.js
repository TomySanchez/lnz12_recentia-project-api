import { addDetallePedido } from '../models/detallesPedidosModel.js';
import { addPedido, getPedidos } from '../models/pedidosModel.js';

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
    const { pedido: nuevoPedido, detallesPedido: nuevosDetallesPedido } =
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
