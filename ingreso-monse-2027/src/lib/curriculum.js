export const CURRICULUM_MATEMATICA = [
  { semanas: "1-2", tema: "tablas_multiplicar_2_5", orden: 1 },
  { semanas: "3-4", tema: "tablas_multiplicar_6_8", orden: 2 },
  { semanas: "5-6", tema: "tablas_multiplicar_9_10", orden: 3 },
  { semanas: "7-8", tema: "division_1_digito", orden: 4 },
  { semanas: "9-10", tema: "fracciones_concepto", orden: 5 },
  { semanas: "11-12", tema: "fracciones_operaciones", orden: 6 },
  { semanas: "13-14", tema: "fracciones_del_resto", orden: 7 },
  { semanas: "15-16", tema: "problemas_con_porcentajes", orden: 8 },
];

export const CURRICULUM_LENGUA = [
  { semanas: "1", tema: "ortografia_b_v", orden: 1 },
  { semanas: "2", tema: "ortografia_g_j", orden: 2 },
  { semanas: "3", tema: "ortografia_h", orden: 3 },
  { semanas: "4", tema: "ortografia_c_s_z", orden: 4 },
  { semanas: "5-6", tema: "concordancia_sujeto_verbo", orden: 5 },
  { semanas: "7-8", tema: "comprension_lectora", orden: 6 },
];

export const DEFAULT_TOPIC = "fracciones_concepto";

export function isCurriculumTopic(tema) {
  return [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].some((item) => item.tema === tema);
}
