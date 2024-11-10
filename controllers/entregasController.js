import { getEntregas } from '../models/entregasModel.js';

export const getAllEntregas = async (req, res) => {
  try {
    const entregas = await getEntregas();

    // Objeto para agrupar las entregas por idEntrega:
    const entregasMap = {};

    entregas.forEach((entrega) => {
      // Si la entrega ya está en el objeto, solo agrega un nuevo detalle:
      if (entregasMap[entrega.idEntrega]) {
        if (entrega.idDetalleEntrega) {
          entregasMap[entrega.idEntrega].detallesEntrega.push({
            idDetalleEntrega: entrega.idDetalleEntrega,
            cantidad: entrega.cantidad,
            idProducto: entrega.idProducto
          });
        }
      } else {
        // Si la entrega no está en el objeto, lo crea (con o sin detalles):
        entregasMap[entrega.idEntrega] = {
          id: entrega.idEntrega,
          fechaEntrega: entrega.fechaEntrega,
          idPedido: entrega.idPedido,
          idRecorrido: entrega.idRecorrido,
          idPago: entrega.idPago,
          estado: entrega.estado,
          // Solo agrega la propiedad 'detallesEntrega' si hay detalles:
          detallesEntrega: entrega.idDetalleEntrega
            ? [
                {
                  idDetalleEntrega: entrega.idDetalleEntrega,
                  cantidad: entrega.cantidad,
                  idProducto: entrega.idProducto
                }
              ]
            : []
        };
      }
    });

    // Convierte el objeto a un array de entregas:
    const formattedEntregas = Object.values(entregasMap);

    res.status(200).json(formattedEntregas);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener las entregas' });
  }
};
