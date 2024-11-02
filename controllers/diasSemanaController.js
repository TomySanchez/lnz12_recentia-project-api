import { getDiasSemana } from '../models/diasSemanaModel.js';

export const getAllDiasSemana = async (req, res) => {
  try {
    const diasSemana = await getDiasSemana();
    res.status(200).json(diasSemana);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los días de la semana' });
  }
};
