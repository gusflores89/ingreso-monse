const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load env variables
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
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function run() {
  // Find Abril
  const { data: user, error: userError } = await supabase
    .from("usuarios")
    .select("id, nombre")
    .eq("codigo_acceso", "ABRIL")
    .single();

  if (userError || !user) {
    console.error("User ABRIL not found:", userError?.message);
    return;
  }

  console.log(`User: ${user.nombre} (${user.id})`);

  // Query specific session ID for CSZ spelling 2
  const { data: sessions, error: sessionsError } = await supabase
    .from("sesiones")
    .select("id, user_id, tema, tipo_pregunta, pregunta_generada, contexto_json, respuesta_usuario, es_correcta, retroalimentacion_ia, created_at")
    .eq("id", "5e7dfbfb-0ded-4f14-84a1-c31f618faf80");

  if (sessionsError) {
    console.error("Error fetching sessions:", sessionsError.message);
    return;
  }

  // Filter in Javascript
  const filtered = sessions;

  console.log(`Found ${filtered.length} matching sessions (out of ${sessions.length} total sessions checked).`);
  filtered.forEach((s, idx) => {
    console.log(`\n[${idx + 1}] ID: ${s.id} | Tema: ${s.tema} | Tipo: ${s.tipo_pregunta} | Creado: ${s.created_at}`);
    console.log(`Pregunta:\n${s.pregunta_generada}`);
    console.log(`Contexto JSON:\n${JSON.stringify(s.contexto_json, null, 2)}`);
  });
}

run().catch(console.error);
