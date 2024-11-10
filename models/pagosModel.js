import { promisePool } from '../config/db.js';

export const getPagos = async () => {
  const [rows] = await promisePool.query(`
    SELECT
      p.id AS idPago,
      p.fechaPago,
      p.estado,
      p.idMetodoDePago,
      dp.id AS idDetallePago,
      dp.idDetalleDeEntrega,
      dp.idPrecio
    FROM Pagos p
    LEFT JOIN DetallesDePagos dp ON dp.idPago = p.id;
  `);
  return rows;
};
