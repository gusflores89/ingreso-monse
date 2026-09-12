import { requireMethod } from "@/lib/http";
import { requireAccess, requireOwnership } from "@/lib/access";
import { assertSupabaseOk, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { tarea_id, resultado, cantidad_errores, comentario } = req.body || {};

  const resultados = ["correcta", "con_errores", "mejorar_caligrafia"];
  const errores = cantidad_errores === "" || cantidad_errores == null ? null : Number(cantidad_errores);
  if (typeof tarea_id !== "string" || !tarea_id || tarea_id.length > 100 || !resultados.includes(resultado) || (errores !== null && (!Number.isInteger(errores) || errores < 0 || errores > 1000)) || (comentario != null && (typeof comentario !== "string" || comentario.length > 2000))) {
    return res.status(400).json({ error: "Revisá el resultado, la cantidad de errores y el comentario (máximo 2000 caracteres)." });
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data: tareaExistente, error: errorFetch } = await supabase
      .from("tareas_manuscritas")
      .select("user_id, estado, resultado, cantidad_errores, comentario_revisor")
      .eq("id", tarea_id)
      .single();

    if (errorFetch || !tareaExistente) {
      return res.status(404).json({ error: "Tarea manuscrita no encontrada." });
    }

    if (!requireOwnership(req, res, tareaExistente.user_id)) return;

    const texto = comentario?.trim() || null;
    if (tareaExistente.estado === "revisada" && tareaExistente.resultado === resultado && tareaExistente.cantidad_errores === errores && tareaExistente.comentario_revisor === texto) return res.status(200).json({tarea:{id:tarea_id,...tareaExistente}});
    if (tareaExistente.estado !== "completada") return res.status(409).json({error:"La tarea ya fue revisada o todavía no se entregó. Actualizá el panel."});

    const tarea = assertSupabaseOk(
      await supabase
        .from("tareas_manuscritas")
        .update({
          estado: "revisada",
          resultado,
          cantidad_errores: errores,
          comentario_revisor: texto,
          fecha_revisada: new Date().toISOString(),
        })
        .eq("id", tarea_id)
        .eq("user_id", tareaExistente.user_id)
        .eq("estado", "completada")
        .select()
        .maybeSingle(),
      "No se pudo revisar tarea"
    );

    if (!tarea) return res.status(409).json({error:"La tarea cambió durante la revisión. Actualizá el panel."});
    res.status(200).json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
