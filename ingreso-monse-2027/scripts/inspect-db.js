const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Cargar .env.local manualmente para leer las variables
const envPath = path.join(__dirname, "../.env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const trim = line.trim();
  if (!trim || trim.startsWith("#")) return;
  const eq = trim.indexOf("=");
  if (eq === -1) return;
  const key = trim.slice(0, eq).trim();
  const val = trim.slice(eq + 1).trim();
  env[key] = val;
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_KEY;

if (!url || !key) {
  console.error("Faltan credenciales de Supabase en .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function run() {
  console.log("=== DIAGNÓSTICO DE BASE DE DATOS SUPABASE ===");
  console.log(`Conectando a: ${url}\n`);
  
  // 1. Obtener Usuarios
  const { data: users, error: usersError } = await supabase
    .from("usuarios")
    .select("id, nombre, email, rasgos_especiales, codigo_acceso, created_at");
    
  if (usersError) {
    console.error("Error al obtener usuarios:", usersError.message);
    return;
  }
  
  console.log(`👥 Usuarios Totales en DB: ${users.length}`);
  users.forEach((u) => {
    const plan = u.rasgos_especiales?.plan || "trial";
    console.log(`  - ${u.nombre} (${u.email || "sin email"}) | Código: ${u.codigo_acceso} | Plan: ${plan} | Creado: ${u.created_at}`);
  });

  // 2. Obtener total de sesiones
  const { count: sessionsCount, error: sessionsError } = await supabase
    .from("sesiones")
    .select("*", { count: "exact", head: true });

  if (sessionsError) {
    console.error("Error al obtener total de sesiones:", sessionsError.message);
  } else {
    console.log(`\n📝 Sesiones Realizadas en Total: ${sessionsCount}`);
  }

  // 3. Obtener alertas activas
  const { data: alerts, error: alertsError } = await supabase
    .from("alertas")
    .select("id, tipo, mensaje, resuelta")
    .eq("resuelta", false);

  if (alertsError) {
    console.error("Error al obtener alertas:", alertsError.message);
  } else {
    console.log(`\n⚠️ Alertas Activas en Total: ${alerts.length}`);
    alerts.forEach((a) => {
      console.log(`  - [${a.tipo}] ${a.mensaje}`);
    });
  }

  // 4. Obtener lecciones completadas
  const { count: lessonsCount, error: lessonsError } = await supabase
    .from("lecciones_completadas")
    .select("*", { count: "exact", head: true });

  if (lessonsError) {
    console.error("Error al obtener total de lecciones:", lessonsError.message);
  } else {
    console.log(`\n📚 Lecciones Completadas: ${lessonsCount}`);
  }
}

run().catch(console.error);
