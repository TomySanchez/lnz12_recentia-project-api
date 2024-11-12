import { promisePool } from '../config/db.js';

export const addDetallePago = async (data) => {
  const { idPago, idDetalleDeEntrega, idPrecio } = data;

  const query = `
    INSERT INTO DetallesDePagos (idPago, idDetalleDeEntrega, idPrecio)
    VALUES (?, ?, ?)
  `;

  const [result] = await promisePool.query(query, [
    idPago,
    idDetalleDeEntrega,
    idPrecio
  ]);

  return result;
};
