import { promisePool } from '../config/db.js';

export const getEntregas = async () => {
  const [rows] = await promisePool.query(`
    SELECT
        e.id AS idEntrega,
        e.fechaEntrega,
        e.idPedido,
        e.idRecorrido,
        e.idPago,
        e.estado,
        de.id AS idDetalleEntrega,
        de.cantidad,
        de.idProducto
      FROM Entregas e
      LEFT JOIN DetallesDeEntregas de ON de.idEntrega = e.id;
  `);

  return rows;
};
