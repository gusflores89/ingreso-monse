export async function loadUser(supabase, userId) {
  const { data, error } = await supabase.from("usuarios")
    .select("id, nombre, email, edad, grado, fecha_examen, nivel_inicial, estilo_aprendizaje, rasgos_especiales, codigo_acceso")
    .eq("id", userId)
    .single();

  if (data) {
    data.avatar = data.rasgos_especiales?.avatar || "buho";
    data.nombre_tutor = data.rasgos_especiales?.nombre_tutor || "Buho";
    data.color_tema = data.rasgos_especiales?.color_tema || "#D85A30";
  }
  return { data, error };
}

export async function loadUserByCode(supabase, code) {
  const { data, error } = await supabase.from("usuarios")
    .select("id, nombre, email, edad, grado, fecha_examen, nivel_inicial, estilo_aprendizaje, rasgos_especiales, codigo_acceso")
    .eq("codigo_acceso", code)
    .single();

  if (data) {
    data.avatar = data.rasgos_especiales?.avatar || "buho";
    data.nombre_tutor = data.rasgos_especiales?.nombre_tutor || "Buho";
    data.color_tema = data.rasgos_especiales?.color_tema || "#D85A30";
  }
  return { data, error };
}

