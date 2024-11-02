import { promisePool } from '../config/db.js';

export const getDisponibilidadesByClienteId = async (clienteId) => {
  const query = `
    SELECT * FROM Disponibilidades
    WHERE idCliente = ?`;

  const [result] = await promisePool.query(query, [clienteId]);
  return result;
};

export const addDisponibilidad = async (data) => {
  const { idCliente, idDiaSemana, horaInicio, horaFin } = data;
  const query =
    'INSERT INTO Disponibilidades (idCliente, idDiaSemana, horaInicio, horaFin) VALUES (?, ?, ?, ?)';

  const [result] = await promisePool.query(query, [
    idCliente,
    idDiaSemana,
    horaInicio,
    horaFin
  ]);
  return result;
};

export const updateDisponibilidad = async (id, disponibilidadData) => {
  const { idDiaSemana, horaInicio, horaFin } = disponibilidadData;

  const query = `
    UPDATE Disponibilidades
    SET idDiaSemana = ?, horaInicio = ?, horaFin = ?
    WHERE id = ?
  `;

  const [result] = await promisePool.query(query, [
    idDiaSemana,
    horaInicio,
    horaFin,
    id
  ]);
  return result;
};

export const deleteDisponibilidad = async (id) => {
  const query = `
    DELETE FROM Disponibilidades
    WHERE id = ?`;

  const [result] = await promisePool.query(query, [id]);
  return result;
};
