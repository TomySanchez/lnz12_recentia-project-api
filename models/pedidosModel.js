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

  console.log('rows:', rows);
  return rows;
};
