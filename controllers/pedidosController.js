import { getPedidos } from '../models/pedidosModel.js';

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

    console.log('formattedPedidos:', formattedPedidos);

    res.status(200).json(formattedPedidos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};
