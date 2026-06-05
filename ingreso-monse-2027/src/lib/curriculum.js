export const CURRICULUM_MATEMATICA = [
  { semanas: "1-2", tema: "tablas_multiplicar_2_5", orden: 1, materia: "matematica", fase: 1 },
  { semanas: "3-4", tema: "tablas_multiplicar_6_8", orden: 2, materia: "matematica", fase: 1 },
  { semanas: "5-6", tema: "tablas_multiplicar_9_10", orden: 3, materia: "matematica", fase: 1 },
  { semanas: "7-8", tema: "division_1_digito", orden: 4, materia: "matematica", fase: 1 },
  { semanas: "9-10", tema: "fracciones_concepto", orden: 5, materia: "matematica", fase: 2 },
  { semanas: "11-12", tema: "fracciones_operaciones", orden: 6, materia: "matematica", fase: 2 },
  { semanas: "13-14", tema: "fracciones_del_resto", orden: 7, materia: "matematica", fase: 3 },
  { semanas: "15-16", tema: "decimales_conversion", orden: 8, materia: "matematica", fase: 3 },
  { semanas: "17-18", tema: "numeros_naturales_sistema_decimal", orden: 9, materia: "matematica", fase: 1 },
  { semanas: "18-19", tema: "numeros_romanos", orden: 10, materia: "matematica", fase: 1 },
  { semanas: "19-20", tema: "divisibilidad_primos_mcm_mcd", orden: 11, materia: "matematica", fase: 2 },
  { semanas: "21-23", tema: "geometria_angulos", orden: 12, materia: "matematica", fase: 4 },
  { semanas: "23-25", tema: "geometria_triangulos", orden: 13, materia: "matematica", fase: 4 },
  { semanas: "25-27", tema: "geometria_cuadrilateros_circunferencia", orden: 14, materia: "matematica", fase: 4 },
  { semanas: "27-29", tema: "perimetros_simples", orden: 15, materia: "matematica", fase: 4 },
  { semanas: "29-31", tema: "perimetros_compuestos", orden: 16, materia: "matematica", fase: 4 },
  { semanas: "31-32", tema: "si_me_la_longitud", orden: 17, materia: "matematica", fase: 3 },
  { semanas: "32-33", tema: "si_me_la_masa_capacidad_tiempo", orden: 18, materia: "matematica", fase: 4 },
  { semanas: "33-34", tema: "graficos_estadisticos", orden: 19, materia: "matematica", fase: 3 },
  { semanas: "34-35", tema: "proporcionalidad_regla_3", orden: 20, materia: "matematica", fase: 4 },
  { semanas: "35-36", tema: "secuencias_aritmeticas", orden: 21, materia: "matematica", fase: 4 },
  { semanas: "36-37", tema: "secuencias_geometricas_fibonacci", orden: 22, materia: "matematica", fase: 4 },
  { semanas: "37-38", tema: "ecuaciones_con_imagenes_2_incognitas", orden: 23, materia: "matematica", fase: 4 },
];

export const CURRICULUM_LENGUA = [
  { semanas: "1", tema: "ortografia_b_v", orden: 1, materia: "lengua", fase: 1 },
  { semanas: "2", tema: "ortografia_g_j_gu_gu", orden: 2, materia: "lengua", fase: 1 },
  { semanas: "3", tema: "ortografia_h", orden: 3, materia: "lengua", fase: 1 },
  { semanas: "4", tema: "ortografia_c_s_z", orden: 4, materia: "lengua", fase: 1 },
  { semanas: "5-6", tema: "tildes_generales_agudas_graves_esdrujulas", orden: 5, materia: "lengua", fase: 1 },
  { semanas: "6-7", tema: "diptongo_hiato", orden: 6, materia: "lengua", fase: 2 },
  { semanas: "7-8", tema: "tilde_diacritica_monosilabos", orden: 7, materia: "lengua", fase: 3 },
  { semanas: "9-10", tema: "sustantivos_genero_numero_tipo", orden: 8, materia: "lengua", fase: 2 },
  { semanas: "10-11", tema: "verbos_modo_indicativo_tiempos", orden: 9, materia: "lengua", fase: 2 },
  { semanas: "11-12", tema: "sujeto_predicado_nucleo", orden: 10, materia: "lengua", fase: 4 },
  { semanas: "12-13", tema: "concordancia_sujeto_verbo", orden: 11, materia: "lengua", fase: 4 },
  { semanas: "14-15", tema: "comprension_lectora_literal_inferida", orden: 12, materia: "lengua", fase: 3 },
  { semanas: "15-16", tema: "discurso_conectores_sinonimos", orden: 13, materia: "lengua", fase: 3 },
  { semanas: "16-20", tema: "produccion_escrita_narracion", orden: 14, materia: "lengua", fase: 4 },
];

export const DEFAULT_TOPIC = "tablas_multiplicar_2_5";

export function getCurriculumByMateria(materia) {
  return materia === "lengua" ? CURRICULUM_LENGUA : CURRICULUM_MATEMATICA;
}

export function getTopicMeta(currentTopic) {
  return [...CURRICULUM_MATEMATICA, ...CURRICULUM_LENGUA].find((item) => item.tema === currentTopic) || null;
}

export function getNextTopic(currentTopic, materia) {
  const topicMeta = getTopicMeta(currentTopic);
  const resolvedMateria = materia || topicMeta?.materia || "matematica";
  const curriculum = getCurriculumByMateria(resolvedMateria);
  const currentIndex = curriculum.findIndex((item) => item.tema === currentTopic);

  if (currentIndex === -1 || currentIndex === curriculum.length - 1) {
    const otraCurriculum = resolvedMateria === "matematica" ? CURRICULUM_LENGUA : CURRICULUM_MATEMATICA;
    return otraCurriculum[0].tema;
  }

  return curriculum[currentIndex + 1].tema;
}

export async function getProximoTemaAlternando(supabase, userId, temaActual) {
  const meta = getTopicMeta(temaActual);

  if (meta?.materia === "matematica") {
    return getProximoTemaNoCompletado(supabase, userId, "lengua");
  }

  if (meta?.materia === "lengua") {
    return getProximoTemaNoCompletado(supabase, userId, "matematica");
  }

  return CURRICULUM_MATEMATICA[0].tema;
}

export async function getProximoTemaNoCompletado(supabase, userId, materia) {
  const curriculum = getCurriculumByMateria(materia);
  const temas = curriculum.map((item) => item.tema);

  const { data, error } = await supabase
    .from("sesiones")
    .select("tema")
    .eq("user_id", userId)
    .eq("tipo_pregunta", "examen_final")
    .eq("es_correcta", true)
    .in("tema", temas);

  if (error) {
    throw new Error(`No se pudieron obtener examenes aprobados: ${error.message}`);
  }

  const temasCompletados = new Set((data || []).map((item) => item.tema));
  const proximo = curriculum.find((item) => !temasCompletados.has(item.tema));
  return proximo?.tema || curriculum[0].tema;
}

export function isCurriculumTopic(tema) {
  return Boolean(getTopicMeta(tema));
}
