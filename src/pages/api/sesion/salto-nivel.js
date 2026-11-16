import { requireAccess, requireOwnership } from "@/lib/access";
import { UNIDADES_BASES, VERSION_BASES, evaluarActividadBase } from "@/lib/contenido-bases";
import { quitarClaves } from "@/lib/contrato-actividad";
import { isCurriculumTopic } from "@/lib/curriculum";
import { requireMethod } from "@/lib/http";
import { determinarProximoObjetivo, getObjetivosParaTema } from "@/lib/objetivos-pedagogicos";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { loadUser } from "@/lib/usuarios";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { accion = "obtener", user_id, tema, respuestas = {} } = req.body || {};
  if (!user_id || !tema || !isCurriculumTopic(tema)) {
    return res.status(400).json({ error: "user_id y tema válido son obligatorios." });
  }
  if (!requireOwnership(req, res, user_id)) return;

  try {
    const supabase = getSupabaseAdmin();
    const usuario = assertSupabaseOk(await loadUser(supabase, user_id), "No se pudo cargar el usuario");

    const { data: sesionesTema, error: sesErr } = await supabase
      .from("sesiones")
      .select("id, tema, tipo_pregunta, es_correcta, created_at, ia_parametros_usados")
      .eq("user_id", user_id)
      .eq("tema", tema);
    if (sesErr) throw sesErr;

    const info = determinarProximoObjetivo(tema, sesionesTema || []);
    const objetivos = getObjetivosParaTema(tema);
    const hastaIndice = Math.min(info.indiceObjetivo + 3, objetivos.length - 1);

    if (info.temaCompletado || hastaIndice <= info.indiceObjetivo) {
      return res.status(200).json({ ok: true, disponible: false });
    }

    const bloqueObjetivos = objetivos.slice(info.indiceObjetivo, hastaIndice + 1);
    const candidatos = bloqueObjetivos
      .map((obj) => {
        const unidad = UNIDADES_BASES.find((u) => u.id === obj.id);
        if (!unidad) return null;
        const actividad =
          unidad.actividades.slice(1).find((a) => !a.rubrica_escritura && Array.isArray(a.opciones) && a.opciones.length > 0) ||
          unidad.actividades.find((a) => !a.rubrica_escritura && Array.isArray(a.opciones) && a.opciones.length > 0);
        if (!actividad) return null;
        return { obj, unidad, actividad };
      })
      .filter(Boolean);

    const seleccion = candidatos.slice(-2);

    if (accion === "obtener") {
      return res.status(200).json({
        ok: true,
        disponible: seleccion.length > 0,
        tema,
        escalon_actual: info.indiceObjetivo + 1,
        escalon_destino: hastaIndice + 1,
        total_escalones: objetivos.length,
        preguntas: seleccion.map((p) =>
          quitarClaves({
            actividad_id: p.actividad.id,
            objetivo_id: p.unidad.id,
            unidad_titulo: p.unidad.titulo,
            pregunta: p.actividad.pregunta || p.actividad.enunciado,
            opciones: p.actividad.opciones || null,
            visual_apoyo: p.actividad.visual || p.unidad.visual || null,
            tipo_pregunta: p.actividad.tipo_pregunta || "multiple",
          })
        ),
      });
    }

    if (accion === "evaluar") {
      const resultados = seleccion.map((p) => {
        const resp = String(respuestas[p.actividad.id] || "");
        const evalRes = evaluarActividadBase(
          {
            ia_parametros_usados: {
              contenido_version: VERSION_BASES,
              objetivo_id: p.unidad.id,
              actividad_id: p.actividad.id,
              modo_sesion: "practica",
            },
          },
          resp,
          false
        );
        return {
          actividad_id: p.actividad.id,
          unidad_titulo: p.unidad.titulo,
          es_correcta: Boolean(evalRes?.es_correcta),
        };
      });

      const todasCorrectas = resultados.length > 0 && resultados.every((r) => r.es_correcta);
      let estrellasBono = 0;

      if (todasCorrectas) {
        const objetivosASaltar = objetivos.slice(info.indiceObjetivo, hastaIndice);
        const nowIso = new Date().toISOString();
        const filasInsertar = [];

        for (const obj of objetivosASaltar) {
          filasInsertar.push(
            {
              user_id,
              tema,
              capa: 1,
              modo: "SALTO",
              tipo_pregunta: "leccion",
              pregunta_generada: `Salto de nivelación: ${obj.titulo}`,
              respuesta_usuario: "Aprobado por salto de nivel",
              es_correcta: true,
              created_at: nowIso,
              ia_parametros_usados: {
                provider: "salto_nivelacion",
                modo_sesion: "leccion",
                objetivo_id: obj.id,
                contenido_version: VERSION_BASES,
                actividad_id: `${obj.id}-salto-lec`,
                explicacion_vista: true,
              },
            },
            {
              user_id,
              tema,
              capa: 1,
              modo: "SALTO",
              tipo_pregunta: "multiple",
              pregunta_generada: `Salto de nivelación 1: ${obj.titulo}`,
              respuesta_usuario: "Aprobado por salto de nivel",
              es_correcta: true,
              created_at: nowIso,
              ia_parametros_usados: {
                provider: "salto_nivelacion",
                modo_sesion: "practica",
                objetivo_id: obj.id,
                contenido_version: VERSION_BASES,
                actividad_id: `${obj.id}-salto-1`,
                resuelto_con_ayuda: false,
                ayuda_utilizada: false,
              },
            },
            {
              user_id,
              tema,
              capa: 1,
              modo: "SALTO",
              tipo_pregunta: "multiple",
              pregunta_generada: `Salto de nivelación 2: ${obj.titulo}`,
              respuesta_usuario: "Aprobado por salto de nivel",
              es_correcta: true,
              created_at: nowIso,
              ia_parametros_usados: {
                provider: "salto_nivelacion",
                modo_sesion: "practica",
                objetivo_id: obj.id,
                contenido_version: VERSION_BASES,
                actividad_id: `${obj.id}-salto-2`,
                resuelto_con_ayuda: false,
                ayuda_utilizada: false,
              },
            }
          );
        }

        for (const fila of filasInsertar) {
          assertSupabaseOk(await supabase.from("sesiones").insert(fila), "No se pudo registrar el salto de nivel");
        }

        estrellasBono = 5;
        await acreditarEstrellasUsuario(supabase, usuario, estrellasBono);
      }

      return res.status(200).json({
        ok: true,
        aprobado: todasCorrectas,
        escalon_destino: todasCorrectas ? hastaIndice + 1 : info.indiceObjetivo + 1,
        estrellas_bono: estrellasBono,
        resultados,
        mensaje: todasCorrectas
          ? `¡Excelente nivel! Demostraste que ya dominás estos conceptos y saltaste directo al Escalón ${hastaIndice + 1} (+5 ⭐).`
          : "Todavía hay algún detalle por afianzar en estos pasos. ¡Vamos a recorrer este escalón paso a paso sin apuro!",
      });
    }

    return res.status(400).json({ error: "Acción no soportada." });
  } catch (error) {
    console.error("[api/sesion/salto-nivel] Error:", error);
    return res.status(500).json({ error: "No pudimos preparar la prueba rápida de nivelación." });
  }
}

async function acreditarEstrellasUsuario(supabase, usuario, delta) {
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
