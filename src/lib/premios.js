export const PREMIOS_DEFAULT = [
  {
    id: "premio_pin_anime",
    titulo: "Pin o sticker de anime a elección",
    estrellas: 50,
    icono: "📍",
    descripcion: "Elegís un pin, llavero o sticker de tu anime favorito (Demon Slayer, Haikyuu, Maomao, etc.)."
  },
  {
    id: "premio_helado",
    titulo: "Salida a merendar o helado a elección",
    estrellas: 50,
    icono: "🍦",
    descripcion: "Paseo a la heladería o merienda rica con los gustos que más quieras."
  },
  {
    id: "premio_mcdonalds",
    titulo: "Salida al McDonald's (Combo favorito)",
    estrellas: 100,
    icono: "🍔",
    descripcion: "Almuerzo o cena en McDonald's para disfrutar tu combo y hamburguesa favorita."
  },
  {
    id: "premio_manga",
    titulo: "Tomo de manga a elección",
    estrellas: 150,
    icono: "📚",
    descripcion: "Un tomo nuevo del manga que estés leyendo para sumar a tu biblioteca."
  },
  {
    id: "premio_efectivo",
    titulo: "$10.000 pesos en efectivo para lo que quieras",
    estrellas: 200,
    icono: "💵",
    descripcion: "Tu propio dinero para ahorrar, comprar cosas en una salida o gastar en lo que elijas libremente."
  },
  {
    id: "premio_shopping",
    titulo: "Salida al Shopping: McDonald's + Cine + Manga",
    estrellas: 250,
    icono: "🛍️",
    descripcion: "Tarde libre completa para pasear por el shopping, comer en McDonald's, ver una película y elegir tu manga favorito."
  }
];

export const INSIGNIAS_ANIME = [
  {
    id: "insignia_maomao",
    personaje: "Maomao",
    anime: "Los Diarios de la Boticaria",
    titulo: "Curiosidad de Boticaria",
    icono: "🧪",
    descripcion: "Por explorar con atención y descubrir cómo funcionan las ideas paso a paso.",
    condicion: "explorador"
  },
  {
    id: "insignia_hinata",
    personaje: "Hinata",
    anime: "Haikyuu!!",
    titulo: "Remate con Determinación",
    icono: "🏐",
    descripcion: "Por no bajar los brazos y completar tus retos del día con energía.",
    condicion: "misiones"
  },
  {
    id: "insignia_tanjiro",
    personaje: "Tanjiro",
    anime: "Demon Slayer",
    titulo: "Paciencia y Valentía",
    icono: "⚔️",
    descripcion: "Por usar pistas inteligentemente para resolver un ejercicio difícil.",
    condicion: "ayuda_exitosa"
  },
  {
    id: "insignia_akaneko",
    personaje: "Akame",
    anime: "Ramen Akaneko",
    titulo: "Dedicación y Cuidado",
    icono: "🍜",
    descripcion: "Por practicar con constancia y cariño a lo largo de la semana.",
    condicion: "dias"
  },
  {
    id: "insignia_anya",
    personaje: "Anya",
    anime: "Spy x Family",
    titulo: "Misión Estelar",
    icono: "⭐",
    descripcion: "Por acumular más de 100 estrellas de puro esfuerzo y superación.",
    condicion: "estrellas_100"
  },
  {
    id: "insignia_division_maomao",
    personaje: "Maomao",
    anime: "Los Diarios de la Boticaria",
    titulo: "Sello de la Balanza Inversa",
    icono: "⚖️",
    descripcion: "Por dominar la división reconociendo la multiplicación que la resuelve sin dudar.",
    condicion: "division_maestra"
  },
  {
    id: "insignia_salvoconducto",
    personaje: "Maomao",
    anime: "Los Diarios de la Boticaria",
    titulo: "Salvoconducto Imperial al Shopping",
    icono: "📜",
    descripcion: "¡Misión cumplida! Pase oficial para la salida al shopping acordada con mamá y papá.",
    condicion: "salvoconducto_completado"
  }
];

export function getPremiosConfig(usuario) {
  const custom = usuario?.rasgos_especiales?.premios_config;
  if (Array.isArray(custom) && custom.length > 0) {
    return custom;
  }
  return PREMIOS_DEFAULT;
}

export function getCanjes(usuario) {
  return usuario?.rasgos_especiales?.canjes || [];
}

export function calcularBalanceEstrellas(usuario, estrellasTotales = 0) {
  const canjes = getCanjes(usuario);
  const gastadas = canjes.reduce((acc, c) => acc + (Number(c.estrellas) || 0), 0);
  const total = Math.max(0, Number(estrellasTotales) || Number(usuario?.rasgos_especiales?.estrellas_totales) || 0);
  const disponibles = Math.max(0, total - gastadas);
  return {
    estrellasTotales: total,
    estrellasGastadas: gastadas,
    estrellasDisponibles: disponibles,
    canjes,
    canjesPendientes: canjes.filter(c => c.estado === "pendiente"),
    canjesEntregados: canjes.filter(c => c.estado === "entregado")
  };
}
