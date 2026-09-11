// Límite diario predeterminado de interacciones de IA (sesiones de estudio) por alumno
const DEFAULT_DAILY_LIMIT = 80;

export async function checkDailyRateLimit(supabase, userId) {
  // 1. Obtener el límite de las variables de entorno o usar el predeterminado
  const limit = process.env.DAILY_AI_LIMIT 
    ? parseInt(process.env.DAILY_AI_LIMIT, 10) 
    : DEFAULT_DAILY_LIMIT;

  // 2. Definir la marca de tiempo de hace exactamente 24 horas
  const timestamp24hAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // 3. Contar de forma eficiente los registros en Supabase
  const { count, error } = await supabase
    .from("sesiones")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", timestamp24hAgo);

  if (error) {
    console.error("[rateLimit] Error al contar sesiones del alumno:", error);
    // De forma resiliente, permitimos continuar si falla la base de datos temporalmente
    return { ok: true, count: 0, limit };
  }

  // 4. Si supera el límite, devolvemos el error amigable
  if (count >= limit) {
    return {
      ok: false,
      count,
      limit,
      error: `¡Has estudiado muchísimo por hoy! El tutor se está tomando un breve descanso para recargar energías. Vuelve mañana para seguir aprendiendo.`
    };
  }

  return { ok: true, count, limit };
}
