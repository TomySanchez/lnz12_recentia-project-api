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

export const updateDetallePedido = async (id, detallePedidoData) => {
  const { idPedido, idProducto, cantidad } = detallePedidoData;

  const query = `
    UPDATE DetallesDePedidos
    SET idPedido = ?, idProducto = ?, cantidad = ?
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [
    idPedido,
    idProducto,
    cantidad,
    id
  ]);
  return result;
};

export const getDetallesPedidoByPedidoId = async (idPedido) => {
  const query = `
    SELECT id AS idDetallePedido, idProducto, cantidad
    FROM DetallesDePedidos
    WHERE idPedido = ?
  `;

  const [rows] = await promisePool.query(query, [idPedido]);
  return rows;
};

export const deleteDetallePedido = async (idDetallePedido) => {
  const query = `
    DELETE FROM DetallesDePedidos
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [idDetallePedido]);
  return result;
};
