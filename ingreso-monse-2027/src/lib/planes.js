import { CURRICULUM_LENGUA, CURRICULUM_MATEMATICA, DEFAULT_TOPIC, getTopicMeta } from "@/lib/curriculum";

export const PLAN_TRIAL = "trial";
export const PLAN_FULL = "full";

export const TRIAL_TOPICS = [
  ...CURRICULUM_MATEMATICA.slice(0, 2).map((item) => item.tema),
  ...CURRICULUM_LENGUA.slice(0, 2).map((item) => item.tema),
];

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
  const meta = getTopicMeta(preferredTopic);
  if (meta?.materia === "lengua") return CURRICULUM_LENGUA[0].tema;
  return DEFAULT_TOPIC;
}

export function getTrialLimitPayload() {
  return {
    plan: PLAN_TRIAL,
    trial_topics: TRIAL_TOPICS,
    trial_descripcion: "El plan gratuito incluye los primeros temas de matematica y lengua.",
  };
}
