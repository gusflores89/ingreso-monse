const { sendWelcomeEmail } = require("../src/lib/email");
const fs = require("fs");
const path = require("path");

// Cargar .env.local
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trim = line.trim();
    if (!trim || trim.startsWith("#")) return;
    const eq = trim.indexOf("=");
    if (eq === -1) return;
    const key = trim.slice(0, eq).trim();
    const val = trim.slice(eq + 1).trim();
    process.env[key] = val;
  });
}

async function run() {
  console.log("=== PROBANDO ENVÍO DE EMAIL DE BIENVENIDA ===");
  console.log("API KEY:", process.env.RESEND_API_KEY ? "CONFIGURADA (empieza con " + process.env.RESEND_API_KEY.slice(0, 7) + ")" : "NO CONFIGURADA");
  
  const result = await sendWelcomeEmail({
    nombre: "Test Onboarding",
    email: "gus.flores89@gmail.com",
    codigo_acceso: "ONB123",
    plan: "trial",
  });

  console.log("Resultado del envío:", result);
}

run().catch(console.error);
