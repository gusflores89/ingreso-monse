export const CURRICULUM_MATEMATICA = [
  { semanas: "1", tema: "numeros_naturales_sistema_decimal", orden: 1, materia: "matematica", fase: 1 },
  { semanas: "2-3", tema: "tablas_multiplicar_2_5", orden: 2, materia: "matematica", fase: 1 },
  { semanas: "4-5", tema: "tablas_multiplicar_6_8", orden: 3, materia: "matematica", fase: 1 },
  { semanas: "6", tema: "tablas_multiplicar_9_10", orden: 4, materia: "matematica", fase: 1 },
  { semanas: "7", tema: "numeros_romanos", orden: 5, materia: "matematica", fase: 1 },
  { semanas: "8-9", tema: "division_1_digito", orden: 6, materia: "matematica", fase: 1 },
  { semanas: "10-11", tema: "divisibilidad_primos_mcm_mcd", orden: 7, materia: "matematica", fase: 2 },
  { semanas: "12-13", tema: "fracciones_concepto", orden: 8, materia: "matematica", fase: 2 },
  { semanas: "14-16", tema: "fracciones_operaciones", orden: 9, materia: "matematica", fase: 2 },
  { semanas: "17-18", tema: "fracciones_del_resto", orden: 10, materia: "matematica", fase: 3 },
  { semanas: "19-20", tema: "decimales_conversion", orden: 11, materia: "matematica", fase: 3 },
  { semanas: "21", tema: "potenciacion_y_raiz_cuadrada", orden: 12, materia: "matematica", fase: 3 },
  { semanas: "22", tema: "jerarquia_operaciones", orden: 13, materia: "matematica", fase: 3 },
  { semanas: "23", tema: "si_me_la_longitud", orden: 14, materia: "matematica", fase: 3 },
  { semanas: "24-25", tema: "si_me_la_masa_capacidad_tiempo", orden: 15, materia: "matematica", fase: 4 },
  { semanas: "26-27", tema: "geometria_angulos", orden: 16, materia: "matematica", fase: 4 },
  { semanas: "28", tema: "geometria_triangulos", orden: 17, materia: "matematica", fase: 4 },
  { semanas: "29-30", tema: "geometria_cuadrilateros_circunferencia", orden: 18, materia: "matematica", fase: 4 },
  { semanas: "31", tema: "perimetros_simples", orden: 19, materia: "matematica", fase: 4 },
  { semanas: "32-33", tema: "perimetros_compuestos", orden: 20, materia: "matematica", fase: 4 },
  { semanas: "34", tema: "graficos_estadisticos", orden: 21, materia: "matematica", fase: 3 },
  { semanas: "35", tema: "proporcionalidad_regla_3", orden: 22, materia: "matematica", fase: 4 },
  { semanas: "36", tema: "secuencias_aritmeticas", orden: 23, materia: "matematica", fase: 4 },
  { semanas: "37", tema: "secuencias_geometricas_fibonacci", orden: 24, materia: "matematica", fase: 4 },
  { semanas: "38", tema: "secuencias_alfanumericas_y_figuras", orden: 25, materia: "matematica", fase: 4 },
  { semanas: "39-40", tema: "ecuaciones_con_imagenes_2_incognitas", orden: 26, materia: "matematica", fase: 4 },
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

export const PRERREQUISITOS = {
  tablas_multiplicar_2_5: ["numeros_naturales_sistema_decimal"],
  tablas_multiplicar_6_8: ["tablas_multiplicar_2_5"],
  tablas_multiplicar_9_10: ["tablas_multiplicar_6_8"],
  division_1_digito: ["tablas_multiplicar_9_10"],
  fracciones_concepto: ["division_1_digito"],
  divisibilidad_primos_mcm_mcd: ["tablas_multiplicar_9_10", "division_1_digito"],
  fracciones_operaciones: ["fracciones_concepto", "divisibilidad_primos_mcm_mcd"],
  fracciones_del_resto: ["fracciones_operaciones"],
  decimales_conversion: ["fracciones_concepto", "division_1_digito"],
  numeros_romanos: ["numeros_naturales_sistema_decimal"],
  geometria_angulos: ["numeros_naturales_sistema_decimal"],
  geometria_triangulos: ["geometria_angulos"],
  geometria_cuadrilateros_circunferencia: ["geometria_triangulos", "geometria_angulos"],
  perimetros_simples: ["geometria_cuadrilateros_circunferencia", "si_me_la_longitud"],
  perimetros_compuestos: ["perimetros_simples"],
  si_me_la_longitud: ["numeros_naturales_sistema_decimal"],
  si_me_la_masa_capacidad_tiempo: ["si_me_la_longitud"],
  graficos_estadisticos: ["fracciones_concepto", "numeros_naturales_sistema_decimal"],
  proporcionalidad_regla_3: ["division_1_digito", "fracciones_operaciones"],
  secuencias_aritmeticas: ["numeros_naturales_sistema_decimal"],
  secuencias_geometricas_fibonacci: ["secuencias_aritmeticas"],
  ecuaciones_con_imagenes_2_incognitas: ["numeros_naturales_sistema_decimal"],
  potenciacion_y_raiz_cuadrada: ["numeros_naturales_sistema_decimal"],
  jerarquia_operaciones: ["potenciacion_y_raiz_cuadrada"],
  secuencias_alfanumericas_y_figuras: ["secuencias_aritmeticas", "secuencias_geometricas_fibonacci"],
};
