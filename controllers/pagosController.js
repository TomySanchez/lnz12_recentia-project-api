import { getPagos } from '../models/pagosModel.js';

export const getAllPagos = async (req, res) => {
  try {
    const pagos = await getPagos();

    // Objeto para agrupar los pagos por idPago:
    const pagosMap = {};

    pagos.forEach((pago) => {
      // Si el pago ya está en el objeto, solo agrega un nuevo detalle:
      if (pagosMap[pago.idPago]) {
        if (pago.idDetallePago) {
          pagosMap[pago.idPago].detallesPago.push({
            idDetallePago: pago.idDetallePago,
            idPrecio: pago.idPrecio,
            idDetalleDeEntrega: pago.idDetalleDeEntrega
          });
        }
      } else {
        // Si el pago no está en el objeto, lo crea (con o sin detalles):
        pagosMap[pago.idPago] = {
          id: pago.idPago,
          fechaPago: pago.fechaPago,
          estado: pago.estado,
          idMetodoDePago: pago.idMetodoDePago,
          // Solo agrega la propiedad 'detallesPago' si hay detalles:
          detallesPago: pago.idDetallePago
            ? [
                {
                  idDetallePago: pago.idDetallePago,
                  idPrecio: pago.idPrecio,
                  idDetalleDeEntrega: pago.idDetalleDeEntrega
                }
              ]
            : []
        };
      }
    });

    // Convierte el objeto a un array de pagos:
    const formattedPagos = Object.values(pagosMap);

    res.status(200).json(formattedPagos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los pagos' });
  }
};
