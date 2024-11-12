import { promisePool } from '../config/db.js';

export const addDetalleEntrega = async (data) => {
  const { idEntrega, idProducto, cantidad } = data;

  const query = `
    INSERT INTO DetallesDeEntregas (idEntrega, idProducto, cantidad)
    VALUES (?, ?, ?)
  `;

  const [result] = await promisePool.query(query, [
    idEntrega,
    idProducto,
    cantidad
  ]);

  return result;
};
