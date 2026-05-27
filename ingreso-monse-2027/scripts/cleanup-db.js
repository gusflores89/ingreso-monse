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

const EMAILS_A_CONSERVAR = [
  "abril.flores.gonzalez16@gmail.com",
  "gustavo_flores89@hotmail.com"
];

async function run() {
  console.log("=== LIMPIEZA DE BASE DE DATOS SUPABASE ===");
  console.log(`Conectando a: ${url}`);
  console.log(`Conservando únicamente los usuarios con emails: ${EMAILS_A_CONSERVAR.join(", ")}\n`);

  // 1. Obtener todos los usuarios de la base de datos
  const { data: usuarios, error: fetchError } = await supabase
    .from("usuarios")
    .select("id, nombre, email");

  if (fetchError) {
    console.error("Error al leer los usuarios de Supabase:", fetchError.message);
    return;
  }

  console.log(`Leídos ${usuarios.length} usuarios de la base de datos.`);

  // 2. Filtrar cuáles borrar
  const usuariosABorrar = usuarios.filter(
    (u) => !u.email || !EMAILS_A_CONSERVAR.includes(u.email.toLowerCase().trim())
  );

  if (usuariosABorrar.length === 0) {
    console.log("¡No hay usuarios para borrar! La base de datos ya está limpia.");
    return;
  }

  console.log(`Se procederá a borrar ${usuariosABorrar.length} usuarios (las relaciones asociadas se borrarán en cascada).`);
  usuariosABorrar.forEach((u) => {
    console.log(`  - Borrando: ${u.nombre} (${u.email || "sin email"}) [ID: ${u.id}]`);
  });

  // 3. Borrar los usuarios por su ID
  const idsABorrar = usuariosABorrar.map((u) => u.id);
  const { error: deleteError } = await supabase
    .from("usuarios")
    .delete()
    .in("id", idsABorrar);

  if (deleteError) {
    console.error("\n❌ Error durante el borrado:", deleteError.message);
    return;
  }

  console.log("\n✅ ¡Borrados realizados con éxito!");
  
  // 4. Mostrar estado final
  const { data: restantes, error: finalError } = await supabase
    .from("usuarios")
    .select("id, nombre, email");

  if (!finalError) {
    console.log(`\n👥 Usuarios restantes en DB (${restantes.length}):`);
    restantes.forEach((u) => {
      console.log(`  - ${u.nombre} (${u.email})`);
    });
  }
}

run().catch(console.error);
