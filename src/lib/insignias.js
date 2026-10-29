/**
 * El álbum no se desbloquea entero por una cuenta puntual.
 * Cada insignia usa la condición declarada en el catálogo.
 */
export function insigniaDesbloqueada(insignia, { estrellasTotales = 0, retosCompletados = 0 } = {}) {
  const estrellas = Number(estrellasTotales) || 0;
  const retos = Number(retosCompletados) || 0;
  switch (insignia?.condicion) {
    case "explorador":
      return true;
    case "estrellas_100":
      return estrellas >= 100;
    case "misiones":
      return retos >= 5;
    default:
      return false;
  }
}
