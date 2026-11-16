import { requireAccess, requireOwnership } from "@/lib/access";
import { UNIDADES_BASES, VERSION_BASES, evaluarActividadBase } from "@/lib/contenido-bases";
import { quitarClaves } from "@/lib/contrato-actividad";
import { CURRICULUM_LENGUA, CURRICULUM_MATEMATICA } from "@/lib/curriculum";
import { requireMethod } from "@/lib/http";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { loadUser } from "@/lib/usuarios";

const FALLBACK_MAT = [
  "numeros_naturales_sistema_decimal",
  "tablas_multiplicar_2_5",
  "fracciones_concepto",
];
const FALLBACK_LEN = [
  "ortografia_b_v",
  "comprension_lectora_literal_inferida",
  "ortografia_h",
];

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { accion = "iniciar", user_id, preguntas_ids = [], respuestas = {} } = req.body || {};
  if (!user_id) {
    return res.status(400).json({ error: "user_id es obligatorio." });
  }
  if (!requireOwnership(req, res, user_id)) return;

  try {
    const supabase = getSupabaseAdmin();
    const usuario = assertSupabaseOk(await loadUser(supabase, user_id), "No se pudo cargar el usuario");

    if (accion === "iniciar") {
      const { data: sesionesPrevias } = await supabase
        .from("sesiones")
        .select("tema")
        .eq("user_id", user_id)
        .not("es_correcta", "is", null)
        .order("created_at", { ascending: false })
        .limit(120);

      const matSet = new Set(CURRICULUM_MATEMATICA.map((t) => t.tema));
      const lenSet = new Set(CURRICULUM_LENGUA.map((t) => t.tema));

      const practicadosMat = [];
      const practicadosLen = [];
      for (const s of sesionesPrevias || []) {
        if (matSet.has(s.tema) && !practicadosMat.includes(s.tema)) practicadosMat.push(s.tema);
        if (lenSet.has(s.tema) && !practicadosLen.includes(s.tema)) practicadosLen.push(s.tema);
      }

      const temasMat = completarListaTemas(practicadosMat, FALLBACK_MAT, 3);
      const temasLen = completarListaTemas(practicadosLen, FALLBACK_LEN, 3);

      const seleccionMat = seleccionarPreguntasDeTemas(temasMat, "matematica", 3);
      const seleccionLen = seleccionarPreguntasDeTemas(temasLen, "lengua", 3);
      const seleccionadas = [...seleccionMat, ...seleccionLen];

      return res.status(200).json({
        ok: true,
        preguntas: seleccionadas.map((item) =>
          quitarClaves({
            actividad_id: item.actividad.id,
            objetivo_id: item.unidad.id,
            tema: item.unidad.tema,
            materia: item.materia,
            unidad_titulo: item.unidad.titulo,
            pregunta: item.actividad.pregunta || item.actividad.enunciado,
            opciones: item.actividad.opciones || null,
            visual_apoyo: item.actividad.visual || item.unidad.visual || null,
            tipo_pregunta: item.actividad.tipo_pregunta || "multiple",
          })
        ),
      });
    }

    if (accion === "evaluar") {
      const matSet = new Set(CURRICULUM_MATEMATICA.map((t) => t.tema));
      const detalle = [];
      let correctasTotal = 0;
      let correctasMat = 0;
      let correctasLen = 0;
      let totalMat = 0;
      let totalLen = 0;

      for (const itemRef of preguntas_ids) {
        const actId = typeof itemRef === "string" ? itemRef : itemRef?.actividad_id;
        const objId = typeof itemRef === "object" ? itemRef?.objetivo_id : null;
        if (!actId) continue;

        const unidad = objId
          ? UNIDADES_BASES.find((u) => u.id === objId)
          : UNIDADES_BASES.find((u) => (u.actividades || []).some((a) => a.id === actId));
        const actividad = unidad?.actividades?.find((a) => a.id === actId);
        if (!unidad || !actividad) continue;

        const materia = matSet.has(unidad.tema) ? "matematica" : "lengua";
        if (materia === "matematica") totalMat += 1;
        else totalLen += 1;

        const respUsuario = String(respuestas[actId] || "");
        const evalRes = evaluarActividadBase(
          {
            ia_parametros_usados: {
              contenido_version: VERSION_BASES,
              objetivo_id: unidad.id,
              actividad_id: actividad.id,
              modo_sesion: "practica",
            },
          },
          respUsuario,
          false
        );

        const esCorrecta = Boolean(evalRes?.es_correcta);
        if (esCorrecta) {
          correctasTotal += 1;
          if (materia === "matematica") correctasMat += 1;
          else correctasLen += 1;
        }

        detalle.push({
          actividad_id: actId,
          tema: unidad.tema,
          materia,
          unidad_titulo: unidad.titulo,
          enunciado: actividad.pregunta || actividad.enunciado,
          respuesta_usuario: respUsuario,
          respuesta_correcta: actividad.respuesta_correcta,
          es_correcta: esCorrecta,
          explicacion: evalRes?.paso_resuelto || evalRes?.pista_concreta || unidad.explicacion,
        });
      }

      const total = detalle.length || 1;
      const puntaje = Math.round((correctasTotal / total) * 100);
      const aprobado = correctasTotal >= Math.min(4, total);
      const estrellasGanadas = aprobado ? 10 : 2;

      await acreditarEstrellasSimulacro(supabase, usuario, estrellasGanadas);

      return res.status(200).json({
        ok: true,
        puntaje,
        correctas: correctasTotal,
        total: detalle.length,
        aprobado,
        estrellas_ganadas: estrellasGanadas,
        matematica: { correctas: correctasMat, total: totalMat },
        lengua: { correctas: correctasLen, total: totalLen },
        detalle,
      });
    }

    return res.status(400).json({ error: "Acción no soportada." });
  } catch (error) {
    console.error("[api/sesion/simulacro] Error:", error);
    return res.status(500).json({ error: "No pudimos procesar el Mini-Simulacro Monserrat." });
  }
}

function completarListaTemas(practicados, fallbacks, objetivoCantidad) {
  const resultado = [...practicados];
  for (const fb of fallbacks) {
    if (resultado.length >= objetivoCantidad) break;
    if (!resultado.includes(fb)) resultado.push(fb);
  }
  return resultado.slice(0, objetivoCantidad);
}

function seleccionarPreguntasDeTemas(temas, materia, limite) {
  const seleccion = [];
  const usadas = new Set();

  for (const tema of temas) {
    if (seleccion.length >= limite) break;
    const unidadesTema = UNIDADES_BASES.filter((u) => u.tema === tema);
    const candidatas = [];
    for (const u of unidadesTema) {
      const acts = (u.actividades || []).slice(1).filter(
        (a) => !a.rubrica_escritura && Array.isArray(a.opciones) && a.opciones.length > 0 && !usadas.has(a.id)
      );
      if (acts.length > 0) {
        const actElegida = acts[Math.floor(Math.random() * acts.length)];
        candidatas.push({ unidad: u, actividad: actElegida, materia });
      }
    }
    if (candidatas.length > 0) {
      const elegida = candidatas[Math.floor(Math.random() * candidatas.length)];
      usadas.add(elegida.actividad.id);
      seleccion.push(elegida);
    }
  }

  return seleccion;
}

async function acreditarEstrellasSimulacro(supabase, usuario, delta) {
  const rasgos = usuario.rasgos_especiales || {};
  let estrellasActuales = Number(rasgos.estrellas_totales || 0);
  const { data: cont } = await supabase
    .from("continuidad_misiones")
    .select("estado")
    .eq("user_id", usuario.id)
    .maybeSingle();
  if (cont?.estado?.estrellas) {
    estrellasActuales = Math.max(estrellasActuales, Number(cont.estado.estrellas));
  }
  const nuevasEstrellas = estrellasActuales + delta;
  await supabase
    .from("usuarios")
    .update({
      rasgos_especiales: { ...rasgos, estrellas_totales: nuevasEstrellas },
      updated_at: new Date().toISOString(),
    })
    .eq("id", usuario.id);

  if (cont?.estado) {
    await supabase
      .from("continuidad_misiones")
      .update({
        estado: { ...cont.estado, estrellas: nuevasEstrellas },
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", usuario.id);
  }
}
