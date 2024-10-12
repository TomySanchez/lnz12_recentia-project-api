import { promisePool } from '../config/db.js';

export const getPedidos = async () => {
  const [rows] = await promisePool.query(`
      SELECT
        p.id AS idPedido,
        p.fechaRegistro,
        p.esRecurrente,
        p.cantSemanas,
        p.estado,
        p.idCliente,
        dp.id AS idDetallePedido,
        dp.cantidad,
        dp.idProducto
      FROM Pedidos p
      LEFT JOIN DetallesDePedidos dp ON dp.idPedido = p.id;
    `);

  return rows;
};

export const addPedido = async (data) => {
  const { fechaRegistro, esRecurrente, cantSemanas, estado, idCliente } = data;

  const formattedFechaRegistro = new Date(fechaRegistro)
    .toISOString()
    .split('T')[0];

  const query = `
    INSERT INTO Pedidos (fechaRegistro, esRecurrente, cantSemanas, estado, idCliente)
    VALUES (?, ?, ?, ?, ?);
  `;

  const [result] = await promisePool.query(query, [
    formattedFechaRegistro,
    esRecurrente,
    cantSemanas,
    estado,
    idCliente
  ]);

  return result;
};

export const updatePedido = async (id, pedidoData) => {
  const { fechaRegistro, esRecurrente, cantSemanas, estado, idCliente } =
    pedidoData;

  const formattedFechaRegistro = new Date(fechaRegistro)
    .toISOString()
    .split('T')[0];

  const query = `
    UPDATE Pedidos
    SET fechaRegistro = ?, esRecurrente = ?, cantSemanas = ?, estado = ?, idCliente = ?
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [
    formattedFechaRegistro,
    esRecurrente,
    cantSemanas,
    estado,
    idCliente,
    id
  ]);
  return result;
};
