import { promisePool } from '../config/db.js';

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
