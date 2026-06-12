export async function loadUser(supabase, userId) {
  return supabase.from("usuarios")
    .select("id, nombre, email, edad, grado, fecha_examen, nivel_inicial, avatar, nombre_tutor, color_tema, estilo_aprendizaje, rasgos_especiales, codigo_acceso")
    .eq("id", userId)
    .single();
}

export async function loadUserByCode(supabase, code) {
  return supabase.from("usuarios")
    .select("id, nombre, email, edad, grado, fecha_examen, nivel_inicial, avatar, nombre_tutor, color_tema, estilo_aprendizaje, rasgos_especiales, codigo_acceso")
    .eq("codigo_acceso", code)
    .single();
}
