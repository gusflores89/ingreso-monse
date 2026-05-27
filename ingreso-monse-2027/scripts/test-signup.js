const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Cargar .env.local
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
const supabase = createClient(url, key);

async function run() {
  console.log("=== PROBANDO CREAR USUARIO EN SUPABASE ===");
  
  const testData = {
    nombre: "Test Onboarding",
    email: "gus.flores89@gmail.com", // Email existente
    fecha_examen: "2026-12-01",
    nivel_inicial: "recien_empieza",
    estilo_aprendizaje: "visual_ejemplos",
    rasgos_especiales: { plan: "trial" },
    edad: 10,
    grado: "5to",
    codigo_acceso: "ONBOAR99",
  };

  const { data, error } = await supabase
    .from("usuarios")
    .insert(testData)
    .select()
    .single();

  if (error) {
    console.error("❌ ERROR DETECTADO AL INSERTAR:", error);
  } else {
    console.log("✅ ÉXITO:", data);
  }
}

run().catch(console.error);
