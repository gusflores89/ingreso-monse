import { requireMethod } from "@/lib/http";
import { hasAccess, requireAccess, requireOwnership } from "@/lib/access";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { resolverUsuario } from "@/lib/usuarios";
import { PLAN_FULL, getUserPlan } from "@/lib/planes";
import { corregirSimulacro, crearSimulacro, materiaValida } from "@/lib/simulacro";

function secretoSimulacro() {
  const secret = process.env.MONSE_AUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    const error = new Error("MONSE_AUTH_SECRET no configurado");
    error.codigo = "config";
    throw error;
  }
  return "monse-dev-only";
}

export default async function handler(req, res) {
  if (!requireMethod(req, res, "POST")) return;
  if (!requireAccess(req, res, ["student", "admin"])) return;

  const { accion, user_id: userId, materia } = req.body || {};
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "user_id es requerido." });
  }

  try {
    const usuario = await resolverUsuario(getSupabaseAdmin(), userId);
    if (!usuario) return res.status(404).json({ error: "No se encontró el estudiante." });
    if (!requireOwnership(req, res, usuario.id)) return;

    const esAdmin = hasAccess(req, "admin");
    if (!esAdmin && getUserPlan(usuario) !== PLAN_FULL) {
      return res.status(403).json({
        error: "Los simulacros cronometrados están incluidos en el Acceso Completo.",
        codigo: "plan_trial",
      });
    }

    if (accion === "iniciar") {
      if (!materiaValida(materia)) return res.status(400).json({ error: "Elegí Matemática o Lengua." });
      const simulacro = crearSimulacro({ materia, secreto: secretoSimulacro() });
      return res.status(200).json({ ok: true, ...simulacro });
    }

    if (accion === "corregir") {
      const respuestas = sanitizarRespuestas(req.body?.respuestas);
      const resultado = corregirSimulacro({
        token: req.body?.token,
        respuestas,
        secreto: secretoSimulacro(),
      });
      return res.status(200).json({ ok: true, ...resultado });
    }

    return res.status(400).json({ error: "Acción de simulacro no reconocida." });
  } catch (error) {
    const status = error.codigo === "expirado" ? 410 : error.codigo === "banco" ? 409 : error.codigo === "config" ? 500 : 400;
    if (status === 500) console.error("[simulacro]", error.message);
    return res.status(status).json({ error: error.codigo === "config" ? "El simulacro no está configurado." : error.message });
  }
}

function sanitizarRespuestas(valor) {
  if (!valor || typeof valor !== "object" || Array.isArray(valor)) return {};
  const limpio = {};
  for (const [id, respuesta] of Object.entries(valor).slice(0, 40)) {
    if (typeof id !== "string" || id.length > 80) continue;
    limpio[id] = String(respuesta ?? "").trim().slice(0, 200);
  }
  return limpio;
}
