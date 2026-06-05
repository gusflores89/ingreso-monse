export function buildAlumnoProfile(usuario = {}) {
  const rasgos = usuario.rasgos_especiales || {};
  const edad = usuario.edad || calcularEdadDesdeFecha(usuario.fecha_nacimiento) || inferirEdadDesdeExamen(usuario.fecha_examen);
  const necesidad =
    rasgos.dislexia ? "dislexia" : rasgos.tdah ? "tdah" : rasgos.necesidades_especiales || rasgos.necesidad || null;

  return {
    nombre: usuario.nombre || "el alumno",
    edad,
    grado: usuario.grado || null,
    estilo_aprendizaje: usuario.estilo_aprendizaje || "visual",
    necesidades_especiales: necesidad,
    detalle_necesidades: rasgos.detalle || rasgos.detalle_necesidades || "",
    avatar: usuario.avatar || "buho",
    nombre_tutor: usuario.nombre_tutor || "Buho",
    color_tema: usuario.color_tema || "#D85A30",
    modo_paciente: !!rasgos.modo_paciente,
  };
}

export function calcularEdadDesdeFecha(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  const nacimiento = new Date(`${fechaNacimiento}T12:00:00`);
  if (Number.isNaN(nacimiento.getTime())) return null;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad -= 1;
  return edad > 0 ? edad : null;
}

function inferirEdadDesdeExamen(fechaExamen) {
  if (!fechaExamen) return null;
  const examen = new Date(`${fechaExamen}T12:00:00`);
  if (Number.isNaN(examen.getTime())) return null;

  const anosHastaExamen = Math.max(0, examen.getFullYear() - new Date().getFullYear());
  return Math.max(8, 11 - anosHastaExamen);
}
