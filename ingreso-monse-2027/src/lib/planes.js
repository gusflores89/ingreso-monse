import { DEFAULT_TOPIC, getTopicMeta } from "@/lib/curriculum";

export const PLAN_TRIAL = "trial";
export const PLAN_FULL = "full";

export const TRIAL_TOPICS = [
  "fracciones_del_resto",
  "graficos_estadisticos",
  "comprension_lectora_literal_inferida",
  "ortografia_b_v",
];

export const TRIAL_DEFAULT_TOPIC = "fracciones_del_resto";

export function getUserPlan(usuario = {}) {
  if (usuario.plan) return usuario.plan;
  if (usuario.rasgos_especiales?.plan) return usuario.rasgos_especiales.plan;
  if (usuario.codigo_acceso === "ABRIL") return PLAN_FULL;
  return PLAN_TRIAL;
}

export function canAccessTopicByPlan(usuario, tema) {
  const plan = getUserPlan(usuario);
  if (plan === PLAN_FULL) return true;
  return TRIAL_TOPICS.includes(tema);
}

export function getDefaultTopicForPlan(usuario, preferredTopic = DEFAULT_TOPIC) {
  if (canAccessTopicByPlan(usuario, preferredTopic)) return preferredTopic;
  return TRIAL_DEFAULT_TOPIC;
}

export function getTrialLimitPayload() {
  return {
    plan: PLAN_TRIAL,
    trial_topics: TRIAL_TOPICS,
    trial_descripcion: "El plan gratuito muestra una experiencia real del metodo: problemas guiados y temas estilo Monserrat.",
  };
}
