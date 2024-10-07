import { promisePool } from '../config/db.js';

export const addDetallePedido = async (data) => {
  const { idPedido, idProducto, cantidad } = data;

  const query = `
    INSERT INTO DetallesDePedidos (idPedido, idProducto, cantidad)
    VALUES (?, ?, ?)
  `;

  const [result] = await promisePool.query(query, [
    idPedido,
    idProducto,
    cantidad
  ]);

  return result;
};
